import type { Service } from '~/types'

export interface ServiceRepository {
  listByBarber(barberId: string): Promise<Service[]>
  getById(id: string): Promise<Service | null>
  create(data: Omit<Service, 'id'>): Promise<Service>
  update(id: string, data: Partial<Omit<Service, 'id'>>): Promise<Service>
  remove(id: string): Promise<void>
}
