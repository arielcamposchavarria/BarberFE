<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="name">Nombre</label>
      <input id="name" v-model="form.name" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="price">Precio (₡)</label>
        <input id="price" v-model.number="form.price" type="number" min="0" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700" for="duration">Duración (min)</label>
        <input id="duration" v-model.number="form.duration" type="number" min="1" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" required>
      </div>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-700" for="imageUrl">URL de imagen</label>
      <input id="imageUrl" v-model="form.imageUrl" type="text" class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
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
import type { Service } from '~/types'

const props = defineProps<{
  initial?: Service
  isSubmitting?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  submit: [data: { name: string, priceCents: number, durationMinutes: number, imageUrl?: string }]
  cancel: []
}>()

const form = reactive({
  name: props.initial?.name ?? '',
  price: props.initial ? props.initial.priceCents / 100 : 0,
  duration: props.initial?.durationMinutes ?? 30,
  imageUrl: props.initial?.imageUrl ?? ''
})

function handleSubmit() {
  emit('submit', {
    name: form.name,
    priceCents: Math.round(form.price * 100),
    durationMinutes: form.duration,
    imageUrl: form.imageUrl || undefined
  })
}
</script>
