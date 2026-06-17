<template>
  <aside class="flex h-screen w-64 shrink-0 flex-col bg-slate-900 text-slate-100">
    <div class="flex items-center gap-3 px-6 py-6">
      <div class="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-white" :class="accentBg">
        {{ brandInitial }}
      </div>
      <div>
        <p class="text-sm font-semibold leading-tight">
          {{ brand }}
        </p>
        <p class="text-xs text-slate-400">
          {{ roleLabel }}
        </p>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-3">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
        :class="isActive(item.to) ? `${accentBg} text-white shadow-sm` : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'"
      >
        <component :is="item.icon" class="h-5 w-5" />
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="px-3 pb-6">
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-white"
        @click="emit('logout')"
      >
        <ArrowLeftOnRectangleIcon class="h-5 w-5" />
        Salir
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'
import type { SidebarItem } from '~/types/sidebar'

const props = defineProps<{
  brand: string
  roleLabel: string
  items: SidebarItem[]
  accent?: 'indigo' | 'emerald' | 'sky'
}>()

const emit = defineEmits<{
  logout: []
}>()

const route = useRoute()

const accentMap = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-600',
  sky: 'bg-sky-600'
} satisfies Record<string, string>

const accentBg = computed(() => accentMap[props.accent ?? 'indigo'])
const brandInitial = computed(() => props.brand.charAt(0))

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>
