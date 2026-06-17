import type { BarberRepository } from './barber.repository'
import { seedBarbers } from '~/data/seed-barbers'
import { delay, generateId } from './shared'

const barbers = [...seedBarbers]

export const barberRepositoryMock: BarberRepository = {
  async listByBarbershop(barbershopId) {
    await delay()
    return barbers.filter(barber => barber.barbershopId === barbershopId)
  },

  async getById(id) {
    await delay()
    return barbers.find(barber => barber.id === id) ?? null
  },

  async getByUserId(userId) {
    await delay()
    return barbers.find(barber => barber.userId === userId) ?? null
  },

  async create(data) {
    await delay()
    const barber = { ...data, id: generateId('barber') }
    barbers.push(barber)
    return barber
  },

  async update(id, data) {
    await delay()
    const index = barbers.findIndex(candidate => candidate.id === id)
    const current = barbers[index]
    if (!current) throw new Error(`Barber ${id} not found`)
    const updated = { ...current, ...data }
    barbers[index] = updated
    return updated
  },

  async setStatus(id, status) {
    await delay()
    const barber = barbers.find(candidate => candidate.id === id)
    if (barber) barber.status = status
  }
}
