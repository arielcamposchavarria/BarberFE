<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
    <input
      :value="searchQuery"
      type="text"
      placeholder="Buscar por nombre o dirección..."
      class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:min-w-[200px] sm:flex-1"
      @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
    >
    <AppButton variant="secondary" class="w-full sm:w-auto" @click="emit('use-location')">
      Ordenar por cercanía
    </AppButton>
    <div class="flex overflow-hidden rounded-xl border border-slate-200 bg-white p-1">
      <button
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
        :class="viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'"
        @click="emit('update:viewMode', 'list')"
      >
        Lista
      </button>
      <button
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
        :class="viewMode === 'map' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'"
        @click="emit('update:viewMode', 'map')"
      >
        Mapa
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
  viewMode: 'list' | 'map'
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:viewMode': [value: 'list' | 'map']
  'use-location': []
}>()
</script>
