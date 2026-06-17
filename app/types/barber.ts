import type { AccountStatus } from './role'

export interface Barber {
  id: string
  userId: string
  barbershopId: string
  displayName: string
  bio?: string
  avatarUrl?: string
  phone?: string
  /** Controlled by admin; the barber can still edit their own profile fields while active or inactive. */
  status: AccountStatus
}
