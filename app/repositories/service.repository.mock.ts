import type { ServiceRepository } from './service.repository'
import { seedServices } from '~/data/seed-services'
import { delay, generateId } from './shared'

const services = [...seedServices]

export const serviceRepositoryMock: ServiceRepository = {
  async listByBarber(barberId) {
    await delay()
    return services.filter(service => service.barberId === barberId)
  },

  async getById(id) {
    await delay()
    return services.find(service => service.id === id) ?? null
  },

  async create(data) {
    await delay()
    const service = { ...data, id: generateId('svc') }
    services.push(service)
    return service
  },

  async update(id, data) {
    await delay()
    const index = services.findIndex(candidate => candidate.id === id)
    const current = services[index]
    if (!current) throw new Error(`Service ${id} not found`)
    const updated = { ...current, ...data }
    services[index] = updated
    return updated
  },

  async remove(id) {
    await delay()
    const index = services.findIndex(service => service.id === id)
    if (index !== -1) services.splice(index, 1)
  }
}
