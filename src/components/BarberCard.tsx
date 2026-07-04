import React from 'react'
import { Link } from 'react-router-dom'

export default function BarberCard({ barber }) {
  return (
    <div className="bg-panel border border-line rounded-sm overflow-hidden group">
      <div className="h-56 overflow-hidden">
        <img
          src={barber.photo}
          alt={barber.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-xl text-cream">{barber.name}</h3>
          <span className="text-brass text-sm font-display">★ {barber.rating}</span>
        </div>
        <p className="text-muted text-sm mb-4">{barber.specialty}</p>
        <Link
          to={`/booking?barberId=${barber.id}`}
          className="inline-block font-display text-sm tracking-widest2 uppercase text-brass border-b border-brass/40 hover:border-brass transition-colors"
        >
          Брондау →
        </Link>
      </div>
    </div>
  )
}
