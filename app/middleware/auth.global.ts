/**
 * This prototype has no real server session, so the login guard only runs
 * client-side — enforcing it during SSR would redirect before the client
 * has a chance to hydrate the session from localStorage.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return
  if (to.path === '/login' || to.path === '/register') return

  const { isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
