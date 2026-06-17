<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <NuxtLink to="/admin/barbershops" class="text-sm text-slate-500 hover:underline">
          ← Barberías
        </NuxtLink>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
          Barberos de {{ barbershop?.name }}
        </h1>
      </div>
      <AppButton @click="isModalOpen = true">
        Agregar barbero
      </AppButton>
    </div>

    <div v-if="barbersStore.isLoading" class="text-slate-500">
      Cargando...
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <div v-for="barber in barbersStore.items" :key="barber.id" class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-slate-900">{{ barber.displayName }}</h3>
            <p class="text-sm text-slate-500">{{ barber.phone }}</p>
          </div>
          <StatusBadge :status="barber.status" />
        </div>
        <p v-if="barber.bio" class="mt-2 text-sm text-slate-600">
          {{ barber.bio }}
        </p>
        <div class="mt-4">
          <AppButton
            :variant="barber.status === 'active' ? 'danger' : 'primary'"
            @click="barbersStore.setStatus(barber.id, barber.status === 'active' ? 'inactive' : 'active')"
          >
            {{ barber.status === 'active' ? 'Desactivar' : 'Activar' }}
          </AppButton>
        </div>
      </div>
    </div>

    <AppModal :open="isModalOpen" title="Agregar barbero" @close="isModalOpen = false">
      <BarberCreateForm :is-submitting="isSubmitting" :error-message="formError" @submit="handleCreate" @cancel="isModalOpen = false" />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'role', role: 'admin' })

const route = useRoute()
const barbershopId = route.params.id as string

const barbershopsStore = useBarbershopsStore()
const barbersStore = useBarbersStore()

const isModalOpen = ref(false)
const isSubmitting = ref(false)
const formError = ref('')

const barbershop = computed(() => barbershopsStore.items.find(shop => shop.id === barbershopId))

onMounted(async () => {
  if (barbershopsStore.items.length === 0) {
    await barbershopsStore.fetchAll()
  }
  await barbersStore.fetchByBarbershop(barbershopId)
})

async function handleCreate(data: { displayName: string, username: string, password: string, phone?: string, bio?: string }) {
  formError.value = ''
  isSubmitting.value = true
  try {
    await barbersStore.create({ ...data, barbershopId })
    isModalOpen.value = false
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'No se pudo crear el barbero'
  } finally {
    isSubmitting.value = false
  }
}
</script>
