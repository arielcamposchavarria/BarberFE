import type { AccountStatus, Client } from '~/types'

export interface ClientRepository {
  list(): Promise<Client[]>
  getById(id: string): Promise<Client | null>
  getByUserId(userId: string): Promise<Client | null>
  create(data: Omit<Client, 'id'>): Promise<Client>
  update(id: string, data: Partial<Omit<Client, 'id'>>): Promise<Client>
  setStatus(id: string, status: AccountStatus): Promise<void>
}
