import React from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/mockData'

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-cream mb-2">Қызметтер</h1>
      <p className="text-muted mb-10">Барлық қызмет 50% алдын ала төлеммен брондалады.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-panel border border-line p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-cream">{s.name}</h3>
              <span className="font-display text-brass text-lg">{s.price.toLocaleString()} ₸</span>
            </div>
            <p className="text-muted text-sm">{s.durationMin} минут · Алдын ала төлем: {(s.price / 2).toLocaleString()} ₸</p>
            <Link
              to={`/booking?serviceId=${s.id}`}
              className="mt-2 font-display text-sm tracking-widest2 uppercase text-brass border-b border-brass/40 w-fit hover:border-brass transition-colors"
            >
              Осы қызметпен брондау →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
