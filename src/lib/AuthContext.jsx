import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('barbershop_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  // Мок логин — кейін Supabase Auth-пен ауыстырасың (supabase.auth.signInWithPassword)
  function login({ name, phone, email }) {
    const newUser = { name, phone, email }
    localStorage.setItem('barbershop_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  function logout() {
    localStorage.removeItem('barbershop_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
