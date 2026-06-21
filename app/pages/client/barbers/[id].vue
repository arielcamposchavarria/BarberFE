<template>
  <div v-if="barber">
    <NuxtLink :to="`/client/barbershops/${barber.barbershopId}`" class="text-sm text-slate-500 hover:underline">
      ← Volver
    </NuxtLink>
    <div class="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <img v-if="barber.avatarUrl" :src="barber.avatarUrl" :alt="barber.displayName" class="h-16 w-16 rounded-full object-cover">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
          {{ barber.displayName }}
        </h1>
        <p v-if="barber.bio" class="text-sm text-slate-500">
          {{ barber.bio }}
        </p>
        <p v-if="reviewsStore.averageRating !== null" class="text-sm text-amber-600">
          ★ {{ reviewsStore.averageRating.toFixed(1) }}
        </p>
      </div>
    </div>

    <h2 class="mt-8 mb-4 text-xl font-semibold">
      Reservar una cita
    </h2>
    <p v-if="!isAuthenticated" class="mb-4 text-sm text-slate-500">
      <NuxtLink :to="{ path: '/login', query: { redirect: route.fullPath } }" class="font-medium text-indigo-600 hover:text-indigo-500">
        Inicia sesión
      </NuxtLink>
      para poder solicitar la cita.
    </p>
    <p v-if="successMessage" class="mb-4 text-sm text-emerald-600">
      {{ successMessage }}
    </p>
    <BookingForm
      v-if="servicesStore.items.length > 0"
      :services="servicesStore.items"
      :slots="slots"
      :is-loading-slots="isLoadingSlots"
      :is-submitting="isSubmitting"
      :error-message="formError"
      @service-change="handleServiceChange"
      @date-change="handleDateChange"
      @submit="handleSubmit"
    />
    <p v-else class="text-slate-500">
      Este barbero no tiene servicios disponibles todavía.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Barber } from '~/types'
import type { Slot } from '~/utils/availability'
import { getBarberById } from '~/services/barber.service'
import { getSlotsForBarberOnDate } from '~/services/appointment.service'

definePageMeta({ layout: 'client', public: true })

const route = useRoute()
const router = useRouter()
const barberId = route.params.id as string

const { user, isAuthenticated } = useAuth()
const servicesStore = useServicesStore()
const appointmentsStore = useAppointmentsStore()
const clientsStore = useClientsStore()
const reviewsStore = useReviewsStore()

const barber = ref<Barber | null>(null)
const selectedServiceId = ref('')
const selectedDate = ref('')
const slots = ref<Slot[]>([])
const isLoadingSlots = ref(false)
const isSubmitting = ref(false)
const formError = ref('')
const successMessage = ref('')

onMounted(async () => {
  const [fetchedBarber] = await Promise.all([
    getBarberById(barberId),
    servicesStore.fetchByBarber(barberId),
    reviewsStore.fetchByBarber(barberId)
  ])
  barber.value = fetchedBarber
  selectedServiceId.value = servicesStore.items[0]?.id ?? ''
})

async function refreshSlots() {
  if (!selectedServiceId.value || !selectedDate.value) {
    slots.value = []
    return
  }
  const service = servicesStore.items.find(candidate => candidate.id === selectedServiceId.value)
  if (!service) return

  isLoadingSlots.value = true
  try {
    slots.value = await getSlotsForBarberOnDate(barberId, selectedDate.value, service.durationMinutes)
  } finally {
    isLoadingSlots.value = false
  }
}

function handleServiceChange(serviceId: string) {
  selectedServiceId.value = serviceId
  refreshSlots()
}

function handleDateChange(date: string) {
  selectedDate.value = date
  refreshSlots()
}

async function handleSubmit(data: { serviceId: string, date: string, startMinutes: number }) {
  if (!user.value) {
    await router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  formError.value = ''
  successMessage.value = ''
  isSubmitting.value = true
  try {
    if (!clientsStore.currentClient) {
      await clientsStore.fetchCurrentByUserId(user.value.id)
    }
    if (!clientsStore.currentClient) throw new Error('No se encontró tu perfil de cliente')

    await appointmentsStore.request({
      clientId: clientsStore.currentClient.id,
      barberId,
      serviceId: data.serviceId,
      date: data.date,
      startMinutes: data.startMinutes
    })
    successMessage.value = 'Solicitud enviada. Podrás ver el estado en "Mis citas".'
    await refreshSlots()
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'No se pudo solicitar la cita'
  } finally {
    isSubmitting.value = false
  }
}
</script>
