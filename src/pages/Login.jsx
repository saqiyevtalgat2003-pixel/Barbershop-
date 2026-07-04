import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    login({ name, phone, email })
    navigate('/my-bookings')
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-4xl text-cream mb-2">Кіру</h1>
      <p className="text-muted mb-8">
        Әзірге қарапайым тіркелу. Кейін Supabase Auth арқылы толық қауіпсіз кіру қосылады.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Аты-жөні"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-panel border border-line text-cream px-4 py-3"
        />
        <input
          required
          placeholder="Телефон"
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
        <button className="w-full bg-brass text-ink font-display tracking-widest2 uppercase text-sm px-8 py-4 hover:bg-cream transition-colors">
          Кіру
        </button>
      </form>
    </div>
  )
}
