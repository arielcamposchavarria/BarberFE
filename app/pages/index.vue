<template>
  <div />
</template>

<script setup lang="ts">
const { role, isAuthenticated } = useAuth()

if (import.meta.client) {
  if (!isAuthenticated.value) {
    await navigateTo('/login')
  } else if (role.value === 'admin') {
    await navigateTo('/admin/barbershops')
  } else if (role.value === 'barber') {
    await navigateTo('/barber/profile')
  } else {
    await navigateTo('/client/barbershops')
  }
}
</script>
