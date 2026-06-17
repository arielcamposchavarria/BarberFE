import { computed } from 'vue'
import type { Role } from '~/types'
import { useAuthStore } from '~/stores/auth.store'

export function useAuth() {
  const authStore = useAuthStore()

  const user = computed(() => authStore.user)
  const role = computed(() => authStore.role)
  const isAuthenticated = computed(() => authStore.isAuthenticated)

  function hasRole(...roles: Role[]): boolean {
    return role.value !== null && roles.includes(role.value)
  }

  return {
    user,
    role,
    isAuthenticated,
    hasRole,
    login: authStore.login,
    logout: authStore.logout
  }
}
