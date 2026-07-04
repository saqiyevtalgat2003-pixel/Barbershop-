import React from 'react'
import { Link } from 'react-router-dom'
import PoleDivider from '../components/PoleDivider'
import { barbers, services } from '../data/mockData'
import BarberCard from '../components/BarberCard'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p className="font-display tracking-widest2 uppercase text-brass text-sm mb-4">
          Дәстүрлі шеберлік · Заманауи брондау
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-cream max-w-3xl">
          Жақсы шаш алу — <span className="text-brass">кезекте тұрмай</span> басталады
        </h1>
        <p className="text-muted text-lg max-w-xl mt-6">
          Барберіңді таңда, уақытыңды белгіле, орныңды 50% алдын ала төлеммен бекіт.
          Қалғанын шеберге қалдыр.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/booking"
            className="bg-brass text-ink font-display tracking-widest2 uppercase text-sm px-8 py-4 hover:bg-cream transition-colors"
          >
            Қазір брондау
          </Link>
          <Link
            to="/barbers"
            className="border border-line text-cream font-display tracking-widest2 uppercase text-sm px-8 py-4 hover:border-brass transition-colors"
          >
            Барберлер
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <PoleDivider />
      </div>

      {/* Barbers preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl text-cream">Біздің шеберлер</h2>
          <Link to="/barbers" className="text-brass text-sm font-display tracking-widest2 uppercase">
            Барлығы →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbers.map((b) => (
            <BarberCard key={b.id} barber={b} />
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-cream mb-8">Қызметтер мен бағалар</h2>
        <div className="border border-line divide-y divide-line">
          {services.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="font-display text-lg text-cream">{s.name}</p>
                <p className="text-muted text-sm">{s.durationMin} минут</p>
              </div>
              <p className="font-display text-xl text-brass">{s.price.toLocaleString()} ₸</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
