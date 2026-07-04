export const barbers = [
  {
    id: 'b1',
    name: 'Асхат Жаников',
    specialty: 'Классикалық шаш алу, сақал дизайны',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=600&q=80',
    workDays: ['Дс', 'Сс', 'Ср', 'Бс', 'Жм'],
  },
  {
    id: 'b2',
    name: 'Дәурен Қалиев',
    specialty: 'Фейд, түс беру',
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f3d13b6b8?w=600&q=80',
    workDays: ['Сс', 'Ср', 'Бс', 'Жм', 'Сн'],
  },
  {
    id: 'b3',
    name: 'Ерлан Мұратов',
    specialty: 'Балаларға арналған шаш алу',
    rating: 5.0,
    photo: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
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
        (b) =>
          b.date === dateStr &&
          b.barberId === barberId &&
          b.time === time &&
          b.status !== 'cancelled' &&
          b.status !== 'expired'
      )
      slots.push({ time, taken })
    }
  }
  return slots
}

// Алдын ала төлем қабылданатын Kaspi деректемелері
export const KASPI_PHONE_NUMBER = '+7 (700) 000-00-00'
export const KASPI_RECIPIENT_NAME = 'Асхат Ж. (BARBER№ ЖШС)'

// Брон жасалғаннан кейін чек салуға берілетін уақыт
export const PAYMENT_WINDOW_MINUTES = 5

export const GALLERY_IMAGES = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&q=80', caption: 'Классикалық фейд' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&q=80', caption: 'Сақал дизайны' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&q=80', caption: 'Балалар шаш алу' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=700&q=80', caption: 'Барбершоп интерьері' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=700&q=80', caption: 'Классикалық қырыну' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=700&q=80', caption: 'Шебер жұмыста' },
]

export const FAQ_ITEMS = [
  {
    q: 'Брондау үшін тіркелу міндетті ме?',
    a: 'Иә. Кезекті нақты сақтау және орынды сен үшін ұстап тұру үшін алдымен аты-жөніңді, телефоныңды, email және құпия сөзіңді көрсетіп тіркелуің керек.',
  },
  {
    q: 'Алдын ала төлем неге міндетті?',
    a: 'Барбер уақытын нақты сен үшін бос қалдырады. Сондықтан қызмет құнының 50%-ын алдын ала төлеу арқылы брон расталады. Бұл — бос орындардың бекерге қалуын болдырмайды.',
  },
  {
    q: 'Төлемді қалай растаймын?',
    a: 'Брон жасалғаннан кейін 5 минут ішінде көрсетілген Kaspi нөміріне соманы аударып, төлем чегінің фотосын экранға жүктеуің керек. Чек тек фото түрінде қабылданады.',
  },
  {
    q: '5 минут ішінде үлгермесем не болады?',
    a: 'Уақыт аяқталса, брон автоматты түрде жойылады да, сол уақыт слоты басқа клиентке босайды. Қайта брондау үшін процесті қайта бастауға болады.',
  },
  {
    q: 'Брондауды болдырмауға бола ма?',
    a: 'Иә, "Менің брондарым" бетінен келу уақытына дейін брондауды болдырмауға болады.',
  },
]
