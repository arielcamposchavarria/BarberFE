<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50">
    <img v-if="service.imageUrl" :src="service.imageUrl" :alt="service.name" class="mb-3 h-32 w-full rounded-xl object-cover">
    <h3 class="font-semibold text-slate-900">
      {{ service.name }}
    </h3>
    <p class="text-sm text-slate-500">
      {{ formatPriceCents(service.priceCents) }} · {{ service.durationMinutes }} min
    </p>
    <div class="mt-3 flex gap-2">
      <AppButton variant="secondary" @click="emit('edit')">
        Editar
      </AppButton>
      <AppButton variant="danger" @click="emit('remove')">
        Eliminar
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types'
import { formatPriceCents } from '~/utils/money'

defineProps<{
  service: Service
}>()

const emit = defineEmits<{
  edit: []
  remove: []
}>()
</script>
