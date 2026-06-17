<template>
  <div class="flex min-h-screen bg-slate-50">
    <AppSidebar brand="BarberFE" role-label="Cliente" accent="sky" :items="items" @logout="handleLogout" />
    <main class="flex-1 overflow-y-auto p-8">
      <div class="mx-auto max-w-6xl">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BuildingStorefrontIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import type { SidebarItem } from '~/types/sidebar'

const items: SidebarItem[] = [
  { to: '/client/barbershops', label: 'Barberías', icon: BuildingStorefrontIcon },
  { to: '/client/appointments', label: 'Mis citas', icon: CalendarDaysIcon }
]

const { logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
