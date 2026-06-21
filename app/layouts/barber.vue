<template>
  <div class="flex min-h-screen bg-slate-50">
    <AppSidebar
      brand="BarberFE"
      role-label="Barbero"
      accent="emerald"
      :items="items"
      :open="sidebarOpen"
      @logout="handleLogout"
      @close="sidebarOpen = false"
    />
    <main class="flex-1 overflow-y-auto p-4 sm:p-8">
      <div class="mx-auto max-w-6xl">
        <div class="mb-4 md:hidden">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm"
            aria-label="Abrir menú"
            @click="sidebarOpen = true"
          >
            <Bars3Icon class="h-5 w-5" />
          </button>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon, CalendarDaysIcon, ClockIcon, SparklesIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import type { SidebarItem } from '~/types/sidebar'

const items: SidebarItem[] = [
  { to: '/barber/profile', label: 'Perfil', icon: UserCircleIcon },
  { to: '/barber/services', label: 'Servicios', icon: SparklesIcon },
  { to: '/barber/schedule', label: 'Horario', icon: ClockIcon },
  { to: '/barber/agenda', label: 'Agenda', icon: CalendarDaysIcon }
]

const { logout } = useAuth()
const router = useRouter()
const sidebarOpen = ref(false)

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
