<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
      Clientes
    </h1>
    <div v-if="store.isLoading" class="text-slate-500">
      Cargando...
    </div>
    <ClientTable v-else :clients="store.items" @toggle-status="handleToggle" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'role', role: 'admin' })

const store = useClientsStore()

onMounted(() => {
  store.fetchAll()
})

function handleToggle(id: string) {
  const client = store.items.find(candidate => candidate.id === id)
  if (!client) return
  store.setStatus(id, client.status === 'active' ? 'inactive' : 'active')
}
</script>
