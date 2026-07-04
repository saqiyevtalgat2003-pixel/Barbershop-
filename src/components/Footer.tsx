import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display tracking-widest2 uppercase text-sm text-muted">
          BarberShop &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm text-muted">Алматы қ. · Күн сайын 09:00–20:00</p>
      </div>
    </footer>
  )
}
