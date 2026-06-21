<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
    <div class="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
      <div>
        <p class="font-semibold text-slate-900">
          {{ clientName }}
        </p>
        <p class="text-sm text-slate-500">
          {{ serviceName }} · {{ appointment.date }} {{ minutesToTime(appointment.startMinutes) }}
        </p>
      </div>
      <StatusBadge :status="appointment.status" />
    </div>

    <p v-if="appointment.rejectionMessage" class="mt-2 text-sm text-red-600">
      Motivo: {{ appointment.rejectionMessage }}
    </p>

    <div v-if="appointment.status === 'pending'" class="mt-4 space-y-2">
      <textarea v-model="rejectionMessage" rows="2" placeholder="Motivo si rechazas (requerido para rechazar)" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>
      <div class="flex flex-wrap gap-2">
        <AppButton @click="handleAccept">
          Aceptar
        </AppButton>
        <AppButton variant="danger" @click="handleReject">
          Rechazar
        </AppButton>
      </div>
    </div>

    <div v-else-if="appointment.status === 'accepted'" class="mt-4">
      <AppButton @click="emit('complete', appointment.id)">
        Marcar como completada
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Appointment } from '~/types'
import { minutesToTime } from '~/utils/datetime'

const props = defineProps<{
  appointment: Appointment
  clientName: string
  serviceName: string
}>()

const emit = defineEmits<{
  accept: [id: string]
  reject: [id: string, message: string]
  complete: [id: string]
}>()

const rejectionMessage = ref('')
const errorMessage = ref('')

function handleAccept() {
  errorMessage.value = ''
  emit('accept', props.appointment.id)
}

function handleReject() {
  if (!rejectionMessage.value.trim()) {
    errorMessage.value = 'Debes indicar un motivo para rechazar'
    return
  }
  errorMessage.value = ''
  emit('reject', props.appointment.id, rejectionMessage.value.trim())
}
</script>
