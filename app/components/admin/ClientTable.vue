<template>
  <div class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/50">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-slate-100 text-slate-500">
          <th class="px-5 py-3 font-medium">Nombre</th>
          <th class="px-5 py-3 font-medium">Teléfono</th>
          <th class="px-5 py-3 font-medium">Estado</th>
          <th class="px-5 py-3" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
          <td class="px-5 py-3 font-medium text-slate-900">{{ client.name }}</td>
          <td class="px-5 py-3 text-slate-600">{{ client.phone ?? '—' }}</td>
          <td class="px-5 py-3">
            <StatusBadge :status="client.status" />
          </td>
          <td class="px-5 py-3 text-right">
            <AppButton :variant="client.status === 'active' ? 'danger' : 'primary'" @click="emit('toggle-status', client.id)">
              {{ client.status === 'active' ? 'Desactivar' : 'Activar' }}
            </AppButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Client } from '~/types'

defineProps<{
  clients: Client[]
}>()

const emit = defineEmits<{
  'toggle-status': [id: string]
}>()
</script>
