import React from 'react'
import { barbers } from '../data/mockData'
import BarberCard from '../components/BarberCard'

export default function Barbers() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-cream mb-2">Барберлер</h1>
      <p className="text-muted mb-10">Шеберіңді таңда, жұмыс күндерін тексер.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {barbers.map((b) => (
          <div key={b.id}>
            <BarberCard barber={b} />
            <p className="text-muted text-xs mt-2">
              Жұмыс күндері: {b.workDays.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
