<template>
  <div class="space-y-4">
    <div v-for="(row, index) in rows" :key="row.key" class="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div class="w-full sm:w-auto">
        <label class="mb-1 block text-xs font-medium text-slate-600">Día</label>
        <select v-model.number="row.dayOfWeek" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-auto">
          <option v-for="day in days" :key="day.value" :value="day.value">
            {{ day.label }}
          </option>
        </select>
      </div>
      <div class="w-full sm:w-auto">
        <label class="mb-1 block text-xs font-medium text-slate-600">Inicio</label>
        <input v-model="row.startTime" type="time" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-auto">
      </div>
      <div class="w-full sm:w-auto">
        <label class="mb-1 block text-xs font-medium text-slate-600">Fin</label>
        <input v-model="row.endTime" type="time" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-auto">
      </div>
      <AppButton variant="danger" class="w-full sm:w-auto" @click="removeRow(index)">
        Quitar
      </AppButton>
    </div>

    <AppButton variant="secondary" @click="addRow">
      Agregar horario
    </AppButton>

    <p v-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <div class="flex justify-end">
      <AppButton :disabled="isSubmitting" @click="handleSave">
        {{ isSubmitting ? 'Guardando...' : 'Guardar horario' }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeeklyAvailabilityRule } from '~/types'
import { minutesToTime, timeToMinutes } from '~/utils/datetime'

const props = defineProps<{
  rules: WeeklyAvailabilityRule[]
  isSubmitting?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  save: [rules: Array<Omit<WeeklyAvailabilityRule, 'id' | 'barberId'>>]
}>()

const days = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 0, label: 'Domingo' }
]

interface Row {
  key: number
  dayOfWeek: number
  startTime: string
  endTime: string
}

let keySeq = 0
function toRow(rule: WeeklyAvailabilityRule): Row {
  keySeq += 1
  return { key: keySeq, dayOfWeek: rule.dayOfWeek, startTime: minutesToTime(rule.startMinutes), endTime: minutesToTime(rule.endMinutes) }
}

const rows = ref<Row[]>(props.rules.map(toRow))

function addRow() {
  keySeq += 1
  rows.value.push({ key: keySeq, dayOfWeek: 1, startTime: '09:00', endTime: '13:00' })
}

function removeRow(index: number) {
  rows.value.splice(index, 1)
}

function handleSave() {
  emit('save', rows.value.map(row => ({
    dayOfWeek: row.dayOfWeek as WeeklyAvailabilityRule['dayOfWeek'],
    startMinutes: timeToMinutes(row.startTime),
    endMinutes: timeToMinutes(row.endTime)
  })))
}
</script>
