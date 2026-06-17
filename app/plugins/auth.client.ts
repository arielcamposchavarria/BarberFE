import { useAuthStore, AUTH_SESSION_STORAGE_KEY } from '~/stores/auth.store'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const raw = localStorage.getItem(AUTH_SESSION_STORAGE_KEY)
  if (!raw) return

  try {
    authStore.hydrate(JSON.parse(raw))
  } catch {
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
  }
})
