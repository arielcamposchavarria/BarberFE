import type { AccountStatus, User } from '~/types'

export interface AuthRepository {
  findByUsername(username: string): Promise<User | null>
  create(user: Omit<User, 'id'>): Promise<User>
  updateStatus(userId: string, status: AccountStatus): Promise<void>
}
