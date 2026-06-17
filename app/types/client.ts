import type { AccountStatus } from './role'

export interface Client {
  id: string
  userId: string
  name: string
  phone?: string
  status: AccountStatus
}
