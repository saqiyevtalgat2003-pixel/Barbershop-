import React, { createContext, useContext, useEffect, useState } from 'react'
import { registerUser, verifyLogin, updateUser } from './usersStore'

const AuthContext = createContext(null)
const SESSION_KEY = 'barbershop_session_user_id'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedId = localStorage.getItem(SESSION_KEY)
    if (savedId) {
      const raw = localStorage.getItem('barbershop_users')
      const users = raw ? JSON.parse(raw) : []
      const found = users.find((u) => u.id === savedId)
      if (found) setUser(found)
    }
    setReady(true)
  }, [])

  function persistSession(u) {
    localStorage.setItem(SESSION_KEY, u.id)
    setUser(u)
  }

  // Тіркелу — аты-жөні, телефон, email, құпия сөз бәрі міндетті
  function register({ fullName, phone, email, password }) {
    const newUser = registerUser({ fullName, phone, email, password })
    persistSession(newUser)
    return newUser
  }

  // Кіру — телефон немесе email + құпия сөз арқылы
  function login({ login, password }) {
    const found = verifyLogin({ login, password })
    persistSession(found)
    return found
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  function updateProfile(patch) {
    const updated = updateUser(user.id, patch)
    setUser(updated)
    return updated
  }

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
