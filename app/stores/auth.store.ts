import { defineStore } from 'pinia'
import type { User } from '~/types'
import { login as loginService } from '~/services/auth.service'

export const AUTH_SESSION_STORAGE_KEY = 'barberfe.session'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),

  getters: {
    isAuthenticated: state => state.user !== null,
    role: state => state.user?.role ?? null
  },

  actions: {
    async login(username: string, password: string) {
      const user = await loginService(username, password)
      this.user = user
      if (import.meta.client) {
        localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(user))
      }
      return user
    },

    logout() {
      this.user = null
      if (import.meta.client) {
        localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
      }
    },

    hydrate(user: User) {
      this.user = user
    }
  }
})
