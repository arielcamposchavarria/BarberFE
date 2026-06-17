<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="font-semibold text-slate-900">{{ barbershop.name }}</h3>
        <p class="text-sm text-slate-500">{{ barbershop.address }}</p>
      </div>
      <StatusBadge :status="barbershop.status" />
    </div>
    <p v-if="barbershop.description" class="mt-2 text-sm text-slate-600">
      {{ barbershop.description }}
    </p>
    <div class="mt-4 flex flex-wrap gap-2">
      <AppButton variant="secondary" @click="emit('edit')">
        Editar
      </AppButton>
      <AppButton :variant="barbershop.status === 'active' ? 'danger' : 'primary'" @click="emit('toggle-status')">
        {{ barbershop.status === 'active' ? 'Desactivar' : 'Activar' }}
      </AppButton>
      <NuxtLink :to="`/admin/barbershops/${barbershop.id}/barbers`">
        <AppButton variant="secondary">
          Barberos
        </AppButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Barbershop } from '~/types'

defineProps<{
  barbershop: Barbershop
}>()

const emit = defineEmits<{
  edit: []
  'toggle-status': []
}>()
</script>
