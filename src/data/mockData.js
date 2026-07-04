export const barbers = [
  {
    id: 'b1',
    name: 'Асхат Жаников',
    specialty: 'Классикалық шаш алу, сақал дизайны',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=400&q=80',
    workDays: ['Дс', 'Сс', 'Ср', 'Бс', 'Жм'],
  },
  {
    id: 'b2',
    name: 'Дәурен Қалиев',
    specialty: 'Фейд, түс беру',
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f3d13b6b8?w=400&q=80',
    workDays: ['Сс', 'Ср', 'Бс', 'Жм', 'Сн'],
  },
  {
    id: 'b3',
    name: 'Ерлан Мұратов',
    specialty: 'Балаларға арналған шаш алу',
    rating: 5.0,
    photo: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
    workDays: ['Дс', 'Ср', 'Бс', 'Жм', 'Сб'],
  },
]

export const services = [
  { id: 's1', name: 'Шаш алу', price: 4000, durationMin: 40 },
  { id: 's2', name: 'Сақал дизайны', price: 2500, durationMin: 25 },
  { id: 's3', name: 'Шаш алу + сақал', price: 6000, durationMin: 60 },
  { id: 's4', name: 'Балаларға шаш алу', price: 3000, durationMin: 30 },
]

// 09:00 - 20:00 аралығында, 30 минут қадаммен бос уақыттар (демо мақсатында)
export function generateTimeSlots(dateStr, barberId, existingBookings = []) {
  const slots = []
  for (let hour = 9; hour < 20; hour++) {
    for (const minute of [0, 30]) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      const taken = existingBookings.some(
        (b) => b.date === dateStr && b.barberId === barberId && b.time === time
      )
      slots.push({ time, taken })
    }
  }
  return slots
}

export const KASPI_PHONE_NUMBER = '+7 (700) 000-00-00'
