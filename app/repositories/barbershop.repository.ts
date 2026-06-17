import type { Barbershop } from '~/types'

export interface BarbershopRepository {
  list(): Promise<Barbershop[]>
  getById(id: string): Promise<Barbershop | null>
  create(data: Omit<Barbershop, 'id' | 'createdAt'>): Promise<Barbershop>
  update(id: string, data: Partial<Omit<Barbershop, 'id'>>): Promise<Barbershop>
  setStatus(id: string, status: Barbershop['status']): Promise<void>
}
