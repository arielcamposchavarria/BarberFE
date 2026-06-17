<template>
  <div class="space-y-3">
    <div v-for="exception in exceptions" :key="exception.id" class="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/50">
      <div class="text-sm">
        <span class="font-medium text-slate-900">{{ exception.date }}</span>
        <span class="ml-2 text-slate-500">
          {{ exception.kind === 'full-day-block'
            ? 'Día completo bloqueado'
            : `Bloqueado ${minutesToTime(exception.startMinutes ?? 0)} - ${minutesToTime(exception.endMinutes ?? 0)}` }}
        </span>
      </div>
      <AppButton variant="danger" @click="emit('remove', exception.id)">
        Quitar
      </AppButton>
    </div>

    <form class="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4" @submit.prevent="handleAdd">
      <div>
        <label class="mb-1 block text-xs font-medium text-slate-600">Fecha</label>
        <input v-model="form.date" type="date" class="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-slate-600">Tipo</label>
        <select v-model="form.kind" class="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
          <option value="full-day-block">Día completo</option>
          <option value="partial-block">Rango de horas</option>
        </select>
      </div>
      <template v-if="form.kind === 'partial-block'">
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Desde</label>
          <input v-model="form.startTime" type="time" class="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-600">Hasta</label>
          <input v-model="form.endTime" type="time" class="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
        </div>
      </template>
      <AppButton type="submit">
        Bloquear
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { AvailabilityException } from '~/types'
import { minutesToTime, timeToMinutes } from '~/utils/datetime'

defineProps<{
  exceptions: AvailabilityException[]
}>()

const emit = defineEmits<{
  add: [data: { date: string, kind: 'full-day-block' | 'partial-block', startMinutes?: number, endMinutes?: number }]
  remove: [id: string]
}>()

const form = reactive({
  date: '',
  kind: 'full-day-block' as 'full-day-block' | 'partial-block',
  startTime: '12:00',
  endTime: '13:00'
})

function handleAdd() {
  emit('add', {
    date: form.date,
    kind: form.kind,
    startMinutes: form.kind === 'partial-block' ? timeToMinutes(form.startTime) : undefined,
    endMinutes: form.kind === 'partial-block' ? timeToMinutes(form.endTime) : undefined
  })
  form.date = ''
}
</script>
