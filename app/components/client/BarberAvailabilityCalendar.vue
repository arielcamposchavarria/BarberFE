<template>
  <div class="space-y-4">
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="date">Fecha</label>
      <input id="date" v-model="selectedDate" type="date" :min="minDate" class="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
    </div>

    <div v-if="isLoading" class="text-slate-500">
      Buscando horarios...
    </div>
    <div v-else-if="!selectedDate" class="text-slate-500">
      Elige una fecha para ver los horarios disponibles.
    </div>
    <div v-else-if="slots.length === 0" class="text-slate-500">
      No hay horarios disponibles ese día.
    </div>
    <div v-else class="grid grid-cols-3 gap-2 sm:grid-cols-4">
      <button
        v-for="slot in slots"
        :key="slot.startMinutes"
        type="button"
        class="rounded-xl border px-2 py-1.5 text-sm font-medium transition"
        :class="slotClass(slot)"
        :disabled="!slot.available"
        @click="emit('select', { date: selectedDate, startMinutes: slot.startMinutes })"
      >
        {{ minutesToTime(slot.startMinutes) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slot } from '~/utils/availability'
import { minutesToTime, todayISODate } from '~/utils/datetime'

const props = defineProps<{
  slots: Slot[]
  isLoading?: boolean
  selectedStartMinutes?: number | null
}>()

const emit = defineEmits<{
  'update:date': [date: string]
  select: [data: { date: string, startMinutes: number }]
}>()

const minDate = todayISODate()
const selectedDate = ref('')

watch(selectedDate, value => emit('update:date', value))

function slotClass(slot: Slot) {
  if (!slot.available) return 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
  if (props.selectedStartMinutes === slot.startMinutes) return 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
  return 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
}
</script>
