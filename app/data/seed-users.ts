import type { User } from '~/types'

/** Mock-plaintext passwords — prototype only, never do this against a real backend. */
export const seedUsers: User[] = [
  { id: 'user-admin-1', username: 'admin', password: 'admin123', role: 'admin', status: 'active', linkedProfileId: 'admin-1' },
  { id: 'user-barber-1', username: 'carlos.ramirez', password: 'barber123', role: 'barber', status: 'active', linkedProfileId: 'barber-1' },
  { id: 'user-barber-2', username: 'luis.fernandez', password: 'barber123', role: 'barber', status: 'active', linkedProfileId: 'barber-2' },
  { id: 'user-barber-3', username: 'andres.solano', password: 'barber123', role: 'barber', status: 'active', linkedProfileId: 'barber-3' },
  { id: 'user-client-1', username: 'maria.jimenez', password: 'client123', role: 'client', status: 'active', linkedProfileId: 'client-1' },
  { id: 'user-client-2', username: 'jose.vargas', password: 'client123', role: 'client', status: 'active', linkedProfileId: 'client-2' }
]
