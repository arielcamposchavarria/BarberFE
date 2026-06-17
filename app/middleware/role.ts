export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  const requiredRole = to.meta.role
  if (!requiredRole) return

  const { role } = useAuth()
  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  if (!role.value || !allowedRoles.includes(role.value)) {
    return navigateTo('/login')
  }
})
