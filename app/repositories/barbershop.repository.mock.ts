import type { BarbershopRepository } from './barbershop.repository'
import { seedBarbershops } from '~/data/seed-barbershops'
import { todayISODate } from '~/utils/datetime'
import { delay, generateId } from './shared'

const barbershops = [...seedBarbershops]

export const barbershopRepositoryMock: BarbershopRepository = {
  async list() {
    await delay()
    return [...barbershops]
  },

  async getById(id) {
    await delay()
    return barbershops.find(shop => shop.id === id) ?? null
  },

  async create(data) {
    await delay()
    const shop = { ...data, id: generateId('bs'), createdAt: todayISODate() }
    barbershops.push(shop)
    return shop
  },

  async update(id, data) {
    await delay()
    const index = barbershops.findIndex(candidate => candidate.id === id)
    const current = barbershops[index]
    if (!current) throw new Error(`Barbershop ${id} not found`)
    const updated = { ...current, ...data }
    barbershops[index] = updated
    return updated
  },

  async setStatus(id, status) {
    await delay()
    const shop = barbershops.find(candidate => candidate.id === id)
    if (shop) shop.status = status
  }
}
