import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

const links = [
  { to: '/', label: 'Басты бет' },
  { to: '/barbers', label: 'Барберлер' },
  { to: '/services', label: 'Қызметтер' },
  { to: '/booking', label: 'Брондау' },
]

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-line bg-ink/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display text-2xl tracking-wide text-cream">
          BARBER<span className="text-brass">SHOP</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8 font-display text-sm tracking-widest2 uppercase">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-brass' : 'text-muted hover:text-cream'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 font-display text-sm tracking-widest2 uppercase">
          {user ? (
            <>
              <NavLink to="/my-bookings" className="text-muted hover:text-cream transition-colors">
                Менің брондарым
              </NavLink>
              <button onClick={logout} className="text-pole hover:text-cream transition-colors">
                Шығу
              </button>
            </>
          ) : (
            <NavLink to="/login" className="text-brass hover:text-cream transition-colors">
              Кіру
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
