const STORAGE_KEY = 'barbershop_bookings'

export function getAllBookings() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveAll(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

// Ереже: бір телефон немесе email бойынша тек 1 активті (болмаған) брон болуы мүмкін
export function hasActiveBooking({ phone, email }) {
  const bookings = getAllBookings()
  const now = new Date()
  return bookings.some((b) => {
    const isSameContact = b.phone === phone || (email && b.email === email)
    const bookingDateTime = new Date(`${b.date}T${b.time}`)
    const isUpcoming = bookingDateTime >= now
    const isNotCancelled = b.status !== 'cancelled'
    return isSameContact && isUpcoming && isNotCancelled
  })
}

export function createBooking(booking) {
  if (hasActiveBooking(booking)) {
    throw new Error('DUPLICATE_ACTIVE_BOOKING')
  }
  const bookings = getAllBookings()
  const newBooking = {
    id: crypto.randomUUID(),
    status: 'payment_pending', // payment_pending -> paid_unconfirmed -> confirmed / cancelled
    createdAt: new Date().toISOString(),
    ...booking,
  }
  bookings.push(newBooking)
  saveAll(bookings)
  return newBooking
}

export function markAsPaidByClient(bookingId) {
  const bookings = getAllBookings()
  const updated = bookings.map((b) =>
    b.id === bookingId ? { ...b, status: 'paid_unconfirmed' } : b
  )
  saveAll(updated)
}

export function cancelBooking(bookingId) {
  const bookings = getAllBookings()
  const updated = bookings.map((b) =>
    b.id === bookingId ? { ...b, status: 'cancelled' } : b
  )
  saveAll(updated)
}

export function getBookingsForContact({ phone, email }) {
  return getAllBookings().filter(
    (b) => b.phone === phone || (email && b.email === email)
  )
}
