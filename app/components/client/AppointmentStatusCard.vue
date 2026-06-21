<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
    <div class="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
      <div>
        <p class="font-semibold text-slate-900">
          {{ barberName }}
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

    <div v-if="appointment.status === 'completed'" class="mt-4">
      <ReviewForm v-if="!review" @submit="emit('review', $event)" />
      <div v-else class="flex items-center gap-2 text-sm text-slate-600">
        <StarRating :model-value="review.rating" readonly />
        <span v-if="review.comment">{{ review.comment }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Appointment, Review } from '~/types'
import { minutesToTime } from '~/utils/datetime'

defineProps<{
  appointment: Appointment
  barberName: string
  serviceName: string
  review?: Review | null
}>()

const emit = defineEmits<{
  review: [data: { rating: number, comment?: string }]
}>()
</script>
