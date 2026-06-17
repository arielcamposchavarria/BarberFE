import type { AuthRepository } from './auth.repository'
import { seedUsers } from '~/data/seed-users'
import { delay, generateId } from './shared'

const users = [...seedUsers]

export const authRepositoryMock: AuthRepository = {
  async findByUsername(username) {
    await delay()
    return users.find(user => user.username === username) ?? null
  },

  async create(data) {
    await delay()
    const user = { ...data, id: generateId('user') }
    users.push(user)
    return user
  },

  async updateStatus(userId, status) {
    await delay()
    const user = users.find(candidate => candidate.id === userId)
    if (user) user.status = status
  }
}
