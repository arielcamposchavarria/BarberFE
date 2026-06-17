<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
      Mis citas
    </h1>
    <div v-if="isLoading" class="text-slate-500">
      Cargando...
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <AppointmentStatusCard
        v-for="appointment in sortedAppointments"
        :key="appointment.id"
        :appointment="appointment"
        :barber-name="barberNames[appointment.barberId] ?? 'Barbero'"
        :service-name="serviceNames[appointment.serviceId] ?? 'Servicio'"
        :review="reviews[appointment.id] ?? null"
        @review="handleReview(appointment, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Appointment, Review } from '~/types'
import { getBarberById } from '~/services/barber.service'
import { getServiceById } from '~/services/service.service'
import { getReviewForAppointment, submitReview } from '~/services/review.service'

definePageMeta({ layout: 'client', middleware: 'role', role: 'client' })

const { user } = useAuth()
const clientsStore = useClientsStore()
const appointmentsStore = useAppointmentsStore()

const isLoading = ref(true)
const barberNames = ref<Record<string, string>>({})
const serviceNames = ref<Record<string, string>>({})
const reviews = ref<Record<string, Review>>({})

const sortedAppointments = computed(() => [...appointmentsStore.items].sort((a, b) => b.date.localeCompare(a.date) || b.startMinutes - a.startMinutes))

onMounted(async () => {
  if (!user.value) {
    isLoading.value = false
    return
  }
  if (!clientsStore.currentClient) {
    await clientsStore.fetchCurrentByUserId(user.value.id)
  }
  if (!clientsStore.currentClient) {
    isLoading.value = false
    return
  }

  await appointmentsStore.fetchForClient(clientsStore.currentClient.id)

  const barberIds = [...new Set(appointmentsStore.items.map(appointment => appointment.barberId))]
  const serviceIds = [...new Set(appointmentsStore.items.map(appointment => appointment.serviceId))]
  const completedAppointments = appointmentsStore.items.filter(appointment => appointment.status === 'completed')

  const [barbers, services, reviewResults] = await Promise.all([
    Promise.all(barberIds.map(id => getBarberById(id))),
    Promise.all(serviceIds.map(id => getServiceById(id))),
    Promise.all(completedAppointments.map(appointment => getReviewForAppointment(appointment.id)))
  ])

  for (const barber of barbers) {
    if (barber) barberNames.value[barber.id] = barber.displayName
  }
  for (const service of services) {
    if (service) serviceNames.value[service.id] = service.name
  }
  completedAppointments.forEach((appointment, index) => {
    const review = reviewResults[index]
    if (review) reviews.value[appointment.id] = review
  })

  isLoading.value = false
})

async function handleReview(appointment: Appointment, data: { rating: number, comment?: string }) {
  if (!clientsStore.currentClient) return
  const review = await submitReview({
    appointmentId: appointment.id,
    clientId: clientsStore.currentClient.id,
    barberId: appointment.barberId,
    rating: data.rating as Review['rating'],
    comment: data.comment
  })
  reviews.value[appointment.id] = review
}
</script>
