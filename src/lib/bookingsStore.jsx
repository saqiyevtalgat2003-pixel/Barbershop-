import { PAYMENT_WINDOW_MINUTES } from '../data/mockData'

const STORAGE_KEY = 'barbershop_bookings'

// payment_pending -> paid_unconfirmed -> confirmed
//                \-> expired (5 минут ішінде чек салынбаса)
// кез келген кезеңде -> cancelled (клиент өзі болдырмаса)

function readRaw() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveAll(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

// payment_pending күйінде мерзімі өткен брондарды автоматты түрде "expired" етеді
function expireStale(bookings) {
  const now = Date.now()
  let changed = false
  const updated = bookings.map((b) => {
    if (b.status === 'payment_pending' && b.deadline && new Date(b.deadline).getTime() < now) {
      changed = true
      return { ...b, status: 'expired' }
    }
    return b
  })
  if (changed) saveAll(updated)
  return updated
}

export function getAllBookings() {
  return expireStale(readRaw())
}

const BLOCKING_STATUSES = ['payment_pending', 'paid_unconfirmed', 'confirmed']

// Ереже: бір пайдаланушының (userId) тек 1 активті (болмаған) броны болуы мүмкін
export function hasActiveBooking(userId) {
  const bookings = getAllBookings()
  const now = new Date()
  return bookings.some((b) => {
    if (b.userId !== userId) return false
    const bookingDateTime = new Date(`${b.date}T${b.time}`)
    const isUpcoming = bookingDateTime >= now
    return isUpcoming && BLOCKING_STATUSES.includes(b.status)
  })
}

export function createBooking(booking) {
  if (hasActiveBooking(booking.userId)) {
    throw new Error('DUPLICATE_ACTIVE_BOOKING')
  }
  const bookings = getAllBookings()
  const createdAt = new Date()
  const deadline = new Date(createdAt.getTime() + PAYMENT_WINDOW_MINUTES * 60 * 1000)
  const newBooking = {
    id: crypto.randomUUID(),
    status: 'payment_pending',
    createdAt: createdAt.toISOString(),
    deadline: deadline.toISOString(),
    receiptPhoto: null,
    ...booking,
  }
  bookings.push(newBooking)
  saveAll(bookings)
  return newBooking
}

// Чек фотосын салу — тек осыдан кейін бронь "растауды күтуде" болады
export function submitReceipt(bookingId, receiptPhotoDataUrl) {
  const bookings = getAllBookings()
  const target = bookings.find((b) => b.id === bookingId)
  if (!target) throw new Error('BOOKING_NOT_FOUND')
  if (target.status !== 'payment_pending') throw new Error('BOOKING_NOT_PAYABLE')
  if (new Date(target.deadline).getTime() < Date.now()) throw new Error('PAYMENT_WINDOW_EXPIRED')

  const updated = bookings.map((b) =>
    b.id === bookingId
      ? { ...b, status: 'paid_unconfirmed', receiptPhoto: receiptPhotoDataUrl, paidAt: new Date().toISOString() }
      : b
  )
  saveAll(updated)
  return updated.find((b) => b.id === bookingId)
}

export function cancelBooking(bookingId) {
  const bookings = getAllBookings()
  const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
  saveAll(updated)
}

export function getBookingsForUser(userId) {
  return getAllBookings()
    .filter((b) => b.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getBookingById(bookingId) {
  return getAllBookings().find((b) => b.id === bookingId) || null
}
