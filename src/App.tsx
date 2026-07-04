import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Barbers from './pages/Barbers'
import Services from './pages/Services'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col font-body">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
