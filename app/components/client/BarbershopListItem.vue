<template>
  <NuxtLink :to="`/client/barbershops/${barbershop.id}`" class="block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md">
    <h3 class="font-semibold text-slate-900">
      {{ barbershop.name }}
    </h3>
    <p class="text-sm text-slate-500">
      {{ barbershop.address }}
    </p>
    <p v-if="distanceKm !== null && distanceKm !== undefined" class="mt-1 text-xs text-slate-400">
      {{ distanceKm.toFixed(1) }} km
    </p>
    <p v-if="barbershop.description" class="mt-2 text-sm text-slate-600">
      {{ barbershop.description }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Barbershop } from '~/types'

defineProps<{
  barbershop: Barbershop
  distanceKm?: number | null
}>()
</script>
