<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
        Mis servicios
      </h1>
      <AppButton @click="openCreateModal">
        Nuevo servicio
      </AppButton>
    </div>

    <div v-if="servicesStore.isLoading" class="text-slate-500">
      Cargando...
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-3">
      <ServiceCard
        v-for="service in servicesStore.items"
        :key="service.id"
        :service="service"
        @edit="openEditModal(service)"
        @remove="servicesStore.remove(service.id)"
      />
    </div>

    <AppModal :open="isModalOpen" :title="editingService ? 'Editar servicio' : 'Nuevo servicio'" @close="isModalOpen = false">
      <ServiceForm :initial="editingService ?? undefined" :is-submitting="isSubmitting" :error-message="formError" @submit="handleSubmit" @cancel="isModalOpen = false" />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types'

definePageMeta({ layout: 'barber', middleware: 'role', role: 'barber' })

const { user } = useAuth()
const barbersStore = useBarbersStore()
const servicesStore = useServicesStore()

const isModalOpen = ref(false)
const editingService = ref<Service | null>(null)
const isSubmitting = ref(false)
const formError = ref('')

onMounted(async () => {
  if (!user.value) return
  if (!barbersStore.currentBarber) {
    await barbersStore.fetchCurrentByUserId(user.value.id)
  }
  if (barbersStore.currentBarber) {
    await servicesStore.fetchByBarber(barbersStore.currentBarber.id)
  }
})

function openCreateModal() {
  editingService.value = null
  formError.value = ''
  isModalOpen.value = true
}

function openEditModal(service: Service) {
  editingService.value = service
  formError.value = ''
  isModalOpen.value = true
}

async function handleSubmit(data: { name: string, priceCents: number, durationMinutes: number, imageUrl?: string }) {
  if (!barbersStore.currentBarber) return
  formError.value = ''
  isSubmitting.value = true
  try {
    if (editingService.value) {
      await servicesStore.update(editingService.value.id, data)
    } else {
      await servicesStore.create({ ...data, barberId: barbersStore.currentBarber.id })
    }
    isModalOpen.value = false
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'No se pudo guardar'
  } finally {
    isSubmitting.value = false
  }
}
</script>
