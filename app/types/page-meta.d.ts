import type { Role } from './role'

declare module '#app' {
  interface PageMeta {
    role?: Role | Role[]
  }
}

export {}
