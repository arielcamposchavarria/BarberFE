<template>
  <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" :class="colorClass">
    <span class="h-1.5 w-1.5 rounded-full" :class="dotClass" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: 'active' | 'inactive' | 'pending' | 'accepted' | 'rejected' | 'completed'
}>()

const labels: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending: 'Pendiente',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
  completed: 'Completada'
}

const colors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-200 text-slate-600',
  pending: 'bg-amber-100 text-amber-800',
  accepted: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-sky-100 text-sky-800'
}

const dots: Record<string, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-slate-400',
  pending: 'bg-amber-500',
  accepted: 'bg-emerald-500',
  rejected: 'bg-red-500',
  completed: 'bg-sky-500'
}

const label = computed(() => labels[props.status] ?? props.status)
const colorClass = computed(() => colors[props.status] ?? 'bg-slate-100 text-slate-700')
const dotClass = computed(() => dots[props.status] ?? 'bg-slate-400')
</script>
