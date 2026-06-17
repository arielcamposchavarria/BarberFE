<template>
  <div class="space-y-6">
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="service">Servicio</label>
      <select id="service" v-model="selectedServiceId" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
        <option v-for="service in services" :key="service.id" :value="service.id">
          {{ service.name }} · {{ formatPriceCents(service.priceCents) }} · {{ service.durationMinutes }} min
        </option>
      </select>
    </div>

    <BarberAvailabilityCalendar
      :slots="slots"
      :is-loading="isLoadingSlots"
      :selected-start-minutes="selectedStartMinutes"
      @update:date="handleDateChange"
      @select="handleSelectSlot"
    />

    <p v-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <AppButton :disabled="!canSubmit || isSubmitting" @click="handleSubmit">
      {{ isSubmitting ? 'Solicitando...' : 'Solicitar cita' }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types'
import type { Slot } from '~/utils/availability'
import { formatPriceCents } from '~/utils/money'

const props = defineProps<{
  services: Service[]
  slots: Slot[]
  isLoadingSlots?: boolean
  isSubmitting?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  'service-change': [serviceId: string]
  'date-change': [date: string]
  submit: [data: { serviceId: string, date: string, startMinutes: number }]
}>()

const selectedServiceId = ref(props.services[0]?.id ?? '')
const selectedDate = ref('')
const selectedStartMinutes = ref<number | null>(null)

watch(selectedServiceId, (value) => {
  selectedStartMinutes.value = null
  emit('service-change', value)
})

function handleDateChange(date: string) {
  selectedDate.value = date
  selectedStartMinutes.value = null
  emit('date-change', date)
}

function handleSelectSlot(data: { date: string, startMinutes: number }) {
  selectedDate.value = data.date
  selectedStartMinutes.value = data.startMinutes
}

const canSubmit = computed(() => !!selectedServiceId.value && !!selectedDate.value && selectedStartMinutes.value !== null)

function handleSubmit() {
  if (!canSubmit.value || selectedStartMinutes.value === null) return
  emit('submit', { serviceId: selectedServiceId.value, date: selectedDate.value, startMinutes: selectedStartMinutes.value })
}
</script>
