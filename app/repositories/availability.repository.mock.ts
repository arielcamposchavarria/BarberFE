import type { AvailabilityRepository } from './availability.repository'
import { seedAvailabilityExceptions, seedWeeklyAvailability } from '~/data/seed-availability'
import { delay, generateId } from './shared'

let weeklyRules = [...seedWeeklyAvailability]
const exceptions = [...seedAvailabilityExceptions]

export const availabilityRepositoryMock: AvailabilityRepository = {
  async listWeeklyRules(barberId) {
    await delay()
    return weeklyRules.filter(rule => rule.barberId === barberId)
  },

  async setWeeklyRules(barberId, rules) {
    await delay()
    weeklyRules = weeklyRules.filter(rule => rule.barberId !== barberId)
    const created = rules.map(rule => ({ ...rule, id: generateId('rule'), barberId }))
    weeklyRules.push(...created)
    return created
  },

  async listExceptions(barberId) {
    await delay()
    return exceptions.filter(exception => exception.barberId === barberId)
  },

  async addException(data) {
    await delay()
    const exception = { ...data, id: generateId('exc') }
    exceptions.push(exception)
    return exception
  },

  async removeException(id) {
    await delay()
    const index = exceptions.findIndex(exception => exception.id === id)
    if (index !== -1) exceptions.splice(index, 1)
  }
}
