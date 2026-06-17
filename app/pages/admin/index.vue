<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'role', role: 'admin' })

await navigateTo('/admin/barbershops')
</script>
