<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Barberías</h1>
      <AppButton @click="openCreateModal">
        Nueva barbería
      </AppButton>
    </div>

    <div v-if="store.isLoading" class="text-slate-500">
      Cargando...
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <BarbershopCard
        v-for="shop in store.items"
        :key="shop.id"
        :barbershop="shop"
        @edit="openEditModal(shop)"
        @toggle-status="store.toggleStatus(shop.id)"
      />
    </div>

    <AppModal :open="isModalOpen" :title="editingShop ? 'Editar barbería' : 'Nueva barbería'" @close="closeModal">
      <BarbershopForm
        :initial="editingShop ?? undefined"
        :is-submitting="isSubmitting"
        :error-message="formError"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { Barbershop } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'role', role: 'admin' })

const store = useBarbershopsStore()

const isModalOpen = ref(false)
const editingShop = ref<Barbershop | null>(null)
const isSubmitting = ref(false)
const formError = ref('')

onMounted(() => {
  store.fetchAll()
})

function openCreateModal() {
  editingShop.value = null
  formError.value = ''
  isModalOpen.value = true
}

function openEditModal(shop: Barbershop) {
  editingShop.value = shop
  formError.value = ''
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

async function handleSubmit(data: { name: string, address: string, coordinates: { lat: number, lng: number }, phone?: string, description?: string }) {
  formError.value = ''
  isSubmitting.value = true
  try {
    if (editingShop.value) {
      await store.update(editingShop.value.id, data)
    } else {
      await store.create(data)
    }
    closeModal()
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'No se pudo guardar'
  } finally {
    isSubmitting.value = false
  }
}
</script>
