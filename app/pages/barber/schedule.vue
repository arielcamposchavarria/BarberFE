<template>
  <div class="space-y-10">
    <div>
      <h1 class="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
        Horario semanal
      </h1>
      <WeeklyScheduleEditor
        v-if="!scheduleStore.isLoading"
        :rules="scheduleStore.weeklyRules"
        :is-submitting="isSavingRules"
        :error-message="rulesError"
        @save="handleSaveRules"
      />
    </div>

    <div>
      <h2 class="mb-4 text-xl font-semibold">
        Excepciones
      </h2>
      <ExceptionList :exceptions="scheduleStore.exceptions" @add="handleAddException" @remove="scheduleStore.removeException" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeeklyAvailabilityRule } from '~/types'

definePageMeta({ layout: 'barber', middleware: 'role', role: 'barber' })

const { user } = useAuth()
const barbersStore = useBarbersStore()
const scheduleStore = useScheduleStore()

const isSavingRules = ref(false)
const rulesError = ref('')

onMounted(async () => {
  if (!user.value) return
  if (!barbersStore.currentBarber) {
    await barbersStore.fetchCurrentByUserId(user.value.id)
  }
  if (barbersStore.currentBarber) {
    await scheduleStore.fetchByBarber(barbersStore.currentBarber.id)
  }
})

async function handleSaveRules(rules: Array<Omit<WeeklyAvailabilityRule, 'id' | 'barberId'>>) {
  if (!barbersStore.currentBarber) return
  rulesError.value = ''
  isSavingRules.value = true
  try {
    await scheduleStore.saveWeeklyRules(barbersStore.currentBarber.id, rules)
  } catch (error) {
    rulesError.value = error instanceof Error ? error.message : 'No se pudo guardar el horario'
  } finally {
    isSavingRules.value = false
  }
}

function handleAddException(data: { date: string, kind: 'full-day-block' | 'partial-block', startMinutes?: number, endMinutes?: number }) {
  if (!barbersStore.currentBarber) return
  scheduleStore.addException({ ...data, barberId: barbersStore.currentBarber.id })
}
</script>
