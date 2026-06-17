import type { ClientRepository } from './client.repository'
import { seedClients } from '~/data/seed-clients'
import { delay, generateId } from './shared'

const clients = [...seedClients]

export const clientRepositoryMock: ClientRepository = {
  async list() {
    await delay()
    return [...clients]
  },

  async getById(id) {
    await delay()
    return clients.find(client => client.id === id) ?? null
  },

  async getByUserId(userId) {
    await delay()
    return clients.find(client => client.userId === userId) ?? null
  },

  async create(data) {
    await delay()
    const client = { ...data, id: generateId('client') }
    clients.push(client)
    return client
  },

  async update(id, data) {
    await delay()
    const index = clients.findIndex(candidate => candidate.id === id)
    const current = clients[index]
    if (!current) throw new Error(`Client ${id} not found`)
    const updated = { ...current, ...data }
    clients[index] = updated
    return updated
  },

  async setStatus(id, status) {
    await delay()
    const client = clients.find(candidate => candidate.id === id)
    if (client) client.status = status
  }
}
