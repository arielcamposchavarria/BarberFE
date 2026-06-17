<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
      Mi agenda
    </h1>
    <div v-if="appointmentsStore.isLoading" class="text-slate-500">
      Cargando...
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <AppointmentRequestCard
        v-for="appointment in sortedAppointments"
        :key="appointment.id"
        :appointment="appointment"
        :client-name="clientName(appointment.clientId)"
        :service-name="serviceName(appointment.serviceId)"
        @accept="handleAccept"
        @reject="handleReject"
        @complete="handleComplete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'barber', middleware: 'role', role: 'barber' })

const { user } = useAuth()
const barbersStore = useBarbersStore()
const appointmentsStore = useAppointmentsStore()
const clientsStore = useClientsStore()
const servicesStore = useServicesStore()

onMounted(async () => {
  if (!user.value) return
  if (!barbersStore.currentBarber) {
    await barbersStore.fetchCurrentByUserId(user.value.id)
  }
  if (barbersStore.currentBarber) {
    await Promise.all([
      appointmentsStore.fetchForBarber(barbersStore.currentBarber.id),
      servicesStore.fetchByBarber(barbersStore.currentBarber.id),
      clientsStore.fetchAll()
    ])
  }
})

const sortedAppointments = computed(() => [...appointmentsStore.items].sort((a, b) => a.date.localeCompare(b.date) || a.startMinutes - b.startMinutes))

function clientName(clientId: string) {
  return clientsStore.items.find(client => client.id === clientId)?.name ?? 'Cliente'
}

function serviceName(serviceId: string) {
  return servicesStore.items.find(service => service.id === serviceId)?.name ?? 'Servicio'
}

async function handleAccept(id: string) {
  await appointmentsStore.accept(id)
}

async function handleReject(id: string, message: string) {
  await appointmentsStore.reject(id, message)
}

async function handleComplete(id: string) {
  await appointmentsStore.complete(id)
}
</script>
