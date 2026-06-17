import type { AccountStatus, Barber } from '~/types'

export interface BarberRepository {
  listByBarbershop(barbershopId: string): Promise<Barber[]>
  getById(id: string): Promise<Barber | null>
  getByUserId(userId: string): Promise<Barber | null>
  create(data: Omit<Barber, 'id'>): Promise<Barber>
  update(id: string, data: Partial<Omit<Barber, 'id'>>): Promise<Barber>
  setStatus(id: string, status: AccountStatus): Promise<void>
}
