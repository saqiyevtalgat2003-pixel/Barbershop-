import React, { useState } from 'react'
import { getBookingsForContact, cancelBooking } from '../lib/bookingsStore'

const STATUS_LABELS = {
  payment_pending: { label: 'Төлемді күтуде', color: 'text-muted' },
  paid_unconfirmed: { label: 'Растауды күтуде', color: 'text-brass' },
  confirmed: { label: 'Расталды', color: 'text-green-400' },
  cancelled: { label: 'Болдырылмады', color: 'text-pole' },
}

export default function MyBookings() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState(null)

  function handleSearch(e) {
    e.preventDefault()
    setBookings(getBookingsForContact({ phone, email }))
  }

  function handleCancel(id) {
    cancelBooking(id)
    setBookings(getBookingsForContact({ phone, email }))
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-cream mb-2">Менің брондарым</h1>
      <p className="text-muted mb-8">Брондарыңды көру үшін телефон немесе email енгіз.</p>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 bg-panel border border-line text-cream px-4 py-3"
        />
        <input
          placeholder="Email (міндетті емес)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-panel border border-line text-cream px-4 py-3"
        />
        <button className="bg-brass text-ink font-display tracking-widest2 uppercase text-sm px-6 py-3">
          Іздеу
        </button>
      </form>

      {bookings && bookings.length === 0 && (
        <p className="text-muted">Бұл контакт бойынша брон табылмады.</p>
      )}

      <div className="space-y-4">
        {bookings?.map((b) => {
          const status = STATUS_LABELS[b.status] || STATUS_LABELS.payment_pending
          const isUpcoming = new Date(`${b.date}T${b.time}`) >= new Date()
          return (
            <div key={b.id} className="bg-panel border border-line p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display text-lg text-cream">{b.serviceName}</p>
                <span className={`font-display text-sm ${status.color}`}>{status.label}</span>
              </div>
              <p className="text-muted text-sm">Барбер: {b.barberName}</p>
              <p className="text-muted text-sm">
                {b.date} · {b.time}
              </p>
              <p className="text-muted text-sm mb-3">
                Алдын ала төлем: {b.prepayAmount.toLocaleString()} ₸
              </p>
              {isUpcoming && b.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(b.id)}
                  className="text-pole text-sm font-display tracking-widest2 uppercase hover:text-cream transition-colors"
                >
                  Брондауды болдырмау
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
