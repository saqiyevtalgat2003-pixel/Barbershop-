// Клиенттік демо-қойма. Кейін мұның орнына Supabase Auth
// (supabase.auth.signUp / signInWithPassword) қосылады —
// .env файлында VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY дайын тұр.

const USERS_KEY = 'barbershop_users'

function getAllUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveAllUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function normalizePhone(phone) {
  return (phone || '').replace(/\D/g, '')
}

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase()
}

// Өте қарапайым, тек демо мақсатына арналған "хэш" (нақты жоба үшін
// бэкенд/Supabase Auth арқылы қауіпсіз хэштеу қажет).
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return String(hash)
}

export function findUserByLogin(login) {
  const users = getAllUsers()
  const normPhone = normalizePhone(login)
  const normEmail = normalizeEmail(login)
  return users.find(
    (u) => (normPhone && u.phone === normPhone) || (normEmail && u.email === normEmail)
  )
}

export function registerUser({ fullName, phone, email, password }) {
  const normPhone = normalizePhone(phone)
  const normEmail = normalizeEmail(email)

  if (!fullName?.trim()) throw new Error('NAME_REQUIRED')
  if (!normPhone || normPhone.length < 10) throw new Error('PHONE_INVALID')
  if (!normEmail || !normEmail.includes('@')) throw new Error('EMAIL_INVALID')
  if (!password || password.length < 6) throw new Error('PASSWORD_TOO_SHORT')

  const users = getAllUsers()
  const exists = users.some((u) => u.phone === normPhone || u.email === normEmail)
  if (exists) throw new Error('USER_EXISTS')

  const newUser = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    phone: normPhone,
    email: normEmail,
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveAllUsers(users)
  return newUser
}

export function verifyLogin({ login, password }) {
  const user = findUserByLogin(login)
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.passwordHash !== simpleHash(password)) throw new Error('WRONG_PASSWORD')
  return user
}

export function updateUser(userId, patch) {
  const users = getAllUsers()
  const updated = users.map((u) => (u.id === userId ? { ...u, ...patch } : u))
  saveAllUsers(updated)
  return updated.find((u) => u.id === userId)
}
