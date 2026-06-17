import type { AccountStatus, Role } from './role'

/** Auth identity only — profile data lives in Barber/Client/Admin records. */
export interface User {
  id: string
  username: string
  /** Mock-plaintext for this prototype; a real backend would never expose/store this. */
  password: string
  role: Role
  status: AccountStatus
  linkedProfileId: string
}
