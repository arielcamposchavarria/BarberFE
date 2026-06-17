import type { Service } from '~/types'

export const seedServices: Service[] = [
  { id: 'svc-1', barberId: 'barber-1', name: 'Corte clásico', priceCents: 800000, durationMinutes: 30, imageUrl: 'https://picsum.photos/seed/svc-1/400/300', active: true },
  { id: 'svc-2', barberId: 'barber-1', name: 'Corte + barba', priceCents: 1200000, durationMinutes: 45, imageUrl: 'https://picsum.photos/seed/svc-2/400/300', active: true },
  { id: 'svc-3', barberId: 'barber-2', name: 'Corte fade', priceCents: 900000, durationMinutes: 40, imageUrl: 'https://picsum.photos/seed/svc-3/400/300', active: true },
  { id: 'svc-4', barberId: 'barber-3', name: 'Corte moderno', priceCents: 1000000, durationMinutes: 35, imageUrl: 'https://picsum.photos/seed/svc-4/400/300', active: true },
  { id: 'svc-5', barberId: 'barber-3', name: 'Afeitado', priceCents: 600000, durationMinutes: 20, imageUrl: 'https://picsum.photos/seed/svc-5/400/300', active: true }
]
