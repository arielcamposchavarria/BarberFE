import type { Barber } from '~/types'

export const seedBarbers: Barber[] = [
  {
    id: 'barber-1',
    userId: 'user-barber-1',
    barbershopId: 'bs-1',
    displayName: 'Carlos Ramírez',
    bio: 'Especialista en cortes clásicos y afeitado con navaja.',
    avatarUrl: 'https://i.pravatar.cc/150?u=barber-1',
    phone: '8888-1111',
    status: 'active'
  },
  {
    id: 'barber-2',
    userId: 'user-barber-2',
    barbershopId: 'bs-1',
    displayName: 'Luis Fernández',
    bio: 'Diez años de experiencia en fades y diseño.',
    avatarUrl: 'https://i.pravatar.cc/150?u=barber-2',
    phone: '8888-2222',
    status: 'active'
  },
  {
    id: 'barber-3',
    userId: 'user-barber-3',
    barbershopId: 'bs-2',
    displayName: 'Andrés Solano',
    bio: 'Cortes modernos y barbas de autor.',
    avatarUrl: 'https://i.pravatar.cc/150?u=barber-3',
    phone: '8888-3333',
    status: 'active'
  }
]
