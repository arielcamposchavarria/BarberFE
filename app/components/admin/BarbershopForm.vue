<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="name">Nombre</label>
      <input id="name" v-model="form.name" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="address">Dirección</label>
      <input id="address" v-model="form.address" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="lat">Latitud</label>
        <input id="lat" v-model.number="form.lat" type="number" step="0.0001" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="lng">Longitud</label>
        <input id="lng" v-model.number="form.lng" type="number" step="0.0001" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="phone">Teléfono</label>
      <input id="phone" v-model="form.phone" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="description">Descripción</label>
      <textarea id="description" v-model="form.description" rows="3" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
    </div>

    <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

    <div class="flex justify-end gap-2">
      <AppButton variant="secondary" @click="emit('cancel')">
        Cancelar
      </AppButton>
      <AppButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
      </AppButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Barbershop } from '~/types'

const props = defineProps<{
  initial?: Barbershop
  isSubmitting?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  submit: [data: { name: string, address: string, coordinates: { lat: number, lng: number }, phone?: string, description?: string }]
  cancel: []
}>()

const form = reactive({
  name: props.initial?.name ?? '',
  address: props.initial?.address ?? '',
  lat: props.initial?.coordinates.lat ?? 9.9281,
  lng: props.initial?.coordinates.lng ?? -84.0907,
  phone: props.initial?.phone ?? '',
  description: props.initial?.description ?? ''
})

function handleSubmit() {
  emit('submit', {
    name: form.name,
    address: form.address,
    coordinates: { lat: form.lat, lng: form.lng },
    phone: form.phone || undefined,
    description: form.description || undefined
  })
}
</script>
