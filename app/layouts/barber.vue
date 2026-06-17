<template>
  <div class="flex min-h-screen bg-slate-50">
    <AppSidebar brand="BarberFE" role-label="Barbero" accent="emerald" :items="items" @logout="handleLogout" />
    <main class="flex-1 overflow-y-auto p-8">
      <div class="mx-auto max-w-6xl">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon, ClockIcon, SparklesIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import type { SidebarItem } from '~/types/sidebar'

const items: SidebarItem[] = [
  { to: '/barber/profile', label: 'Perfil', icon: UserCircleIcon },
  { to: '/barber/services', label: 'Servicios', icon: SparklesIcon },
  { to: '/barber/schedule', label: 'Horario', icon: ClockIcon },
  { to: '/barber/agenda', label: 'Agenda', icon: CalendarDaysIcon }
]

const { logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
