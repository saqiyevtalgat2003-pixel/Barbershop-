import React, { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { barbers, services, generateTimeSlots, KASPI_PHONE_NUMBER } from '../data/mockData'
import { getAllBookings, createBooking, hasActiveBooking, markAsPaidByClient } from '../lib/bookingsStore'
import PoleDivider from '../components/PoleDivider'

const STEPS = ['barber', 'service', 'datetime', 'contact', 'payment']

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export default function Booking() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [barberId, setBarberId] = useState(params.get('barberId') || '')
  const [serviceId, setServiceId] = useState(params.get('serviceId') || '')
  const [date, setDate] = useState(todayStr())
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [booking, setBooking] = useState(null)

  const stepIndex = useMemo(() => {
    if (!barberId) return 0
    if (!serviceId) return 1
    if (!time) return 2
    if (!booking) return 3
    return 4
  }, [barberId, serviceId, time, booking])

  const selectedBarber = barbers.find((b) => b.id === barberId)
  const selectedService = services.find((s) => s.id === serviceId)
  const slots = useMemo(
    () => (barberId ? generateTimeSlots(date, barberId, getAllBookings()) : []),
    [barberId, date, booking]
  )
  const prepayAmount = selectedService ? Math.round(selectedService.price / 2) : 0

  function handleConfirmContact(e) {
    e.preventDefault()
    setError('')
    if (hasActiveBooking({ phone, email })) {
      setError(
        'Сізде әлі де болмаған активті брон бар. Бір телефон/email бойынша тек 1 брон рұқсат етіледі.'
      )
      return
    }
    try {
      const newBooking = createBooking({
        barberId,
        barberName: selectedBarber.name,
        serviceId,
        serviceName: selectedService.name,
        price: selectedService.price,
        prepayAmount,
        date,
        time,
        name,
        phone,
        email,
      })
      setBooking(newBooking)
    } catch (err) {
      setError('Брон жасау кезінде қате шықты. Қайталап көріңіз.')
    }
  }

  function handleMarkPaid() {
    markAsPaidByClient(booking.id)
    navigate('/my-bookings')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-cream mb-2">Брондау</h1>
      <p className="text-muted mb-8">5 қадам — 2 минут</p>

      {/* Step indicator */}
      <div className="flex gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${i <= stepIndex ? 'bg-brass' : 'bg-line'}`}
          />
        ))}
      </div>

      {/* Step 1: barber */}
      <section className="mb-10">
        <h2 className="font-display text-xl text-cream mb-4">1. Барберді таңда</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {barbers.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setBarberId(b.id)
                setTime('')
                setBooking(null)
              }}
              className={`text-left p-4 border transition-colors ${
                barberId === b.id ? 'border-brass bg-panel' : 'border-line bg-panel/40 hover:border-muted'
              }`}
            >
              <p className="font-display text-cream">{b.name}</p>
              <p className="text-muted text-xs mt-1">{b.specialty}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: service */}
      {barberId && (
        <section className="mb-10">
          <h2 className="font-display text-xl text-cream mb-4">2. Қызметті таңда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setServiceId(s.id)
                  setTime('')
                  setBooking(null)
                }}
                className={`text-left p-4 border flex items-center justify-between transition-colors ${
                  serviceId === s.id ? 'border-brass bg-panel' : 'border-line bg-panel/40 hover:border-muted'
                }`}
              >
                <span className="font-display text-cream">{s.name}</span>
                <span className="text-brass font-display">{s.price.toLocaleString()} ₸</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 3: date/time */}
      {barberId && serviceId && (
        <section className="mb-10">
          <h2 className="font-display text-xl text-cream mb-4">3. Күн мен уақыт</h2>
          <input
            type="date"
            value={date}
            min={todayStr()}
            onChange={(e) => {
              setDate(e.target.value)
              setTime('')
              setBooking(null)
            }}
            className="bg-panel border border-line text-cream px-4 py-2 mb-4 font-body"
          />
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map((slot) => (
              <button
                key={slot.time}
                disabled={slot.taken}
                onClick={() => setTime(slot.time)}
                className={`py-2 text-sm font-display border transition-colors ${
                  slot.taken
                    ? 'border-line text-muted/40 cursor-not-allowed line-through'
                    : time === slot.time
                    ? 'border-brass bg-brass text-ink'
                    : 'border-line text-cream hover:border-brass'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 4: contact */}
      {barberId && serviceId && time && !booking && (
        <section className="mb-10">
          <h2 className="font-display text-xl text-cream mb-4">4. Байланыс ақпараты</h2>
          <form onSubmit={handleConfirmContact} className="space-y-4">
            <input
              required
              placeholder="Аты-жөні"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-panel border border-line text-cream px-4 py-3"
            />
            <input
              required
              placeholder="Телефон (+7 7XX XXX XX XX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-panel border border-line text-cream px-4 py-3"
            />
            <input
              placeholder="Email (міндетті емес)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-panel border border-line text-cream px-4 py-3"
            />
            {error && <p className="text-pole text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-brass text-ink font-display tracking-widest2 uppercase text-sm px-8 py-4 hover:bg-cream transition-colors"
            >
              Брондауды растау
            </button>
          </form>
        </section>
      )}

      {/* Step 5: payment */}
      {booking && (
        <section className="border border-brass/40 bg-panel p-6">
          <h2 className="font-display text-xl text-cream mb-4">5. Алдын ала төлем</h2>
          <PoleDivider className="mb-6 max-w-xs" />
          <div className="space-y-2 text-sm text-muted mb-6">
            <p>Барбер: <span className="text-cream">{booking.barberName}</span></p>
            <p>Қызмет: <span className="text-cream">{booking.serviceName}</span></p>
            <p>Күні/уақыты: <span className="text-cream">{booking.date} · {booking.time}</span></p>
          </div>
          <div className="bg-ink border border-line p-5 mb-6">
            <p className="text-muted text-sm mb-1">Kaspi нөміріне аударыңыз:</p>
            <p className="font-display text-2xl text-brass mb-2">{KASPI_PHONE_NUMBER}</p>
            <p className="text-cream font-display text-lg">
              Сома: {booking.prepayAmount.toLocaleString()} ₸ (50%)
            </p>
          </div>
          <p className="text-muted text-xs mb-4">
            Аударым жасағаннан кейін төмендегі батырманы бас — брон "Растауды күтуде" статусына өтеді,
            админ төлемді растағаннан кейін орның бекітіледі.
          </p>
          <button
            onClick={handleMarkPaid}
            className="bg-brass text-ink font-display tracking-widest2 uppercase text-sm px-8 py-4 hover:bg-cream transition-colors"
          >
            Төледім
          </button>
        </section>
      )}
    </div>
  )
}
