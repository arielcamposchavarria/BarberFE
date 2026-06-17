import type { Barbershop } from '~/types'

export const seedBarbershops: Barbershop[] = [
  {
    id: 'bs-1',
    name: 'Barbería El Clásico',
    address: 'Avenida Central, San José',
    coordinates: { lat: 9.9325, lng: -84.0795 },
    phone: '2222-1111',
    description: 'Cortes tradicionales y afeitado a la antigua.',
    status: 'active',
    createdAt: '2026-01-10'
  },
  {
    id: 'bs-2',
    name: 'Barbería Estilo Urbano',
    address: 'Barrio Escalante, San José',
    coordinates: { lat: 9.9389, lng: -84.0627 },
    phone: '2222-2222',
    description: 'Cortes modernos, fades y diseño de barba.',
    status: 'active',
    createdAt: '2026-02-05'
  }
]
