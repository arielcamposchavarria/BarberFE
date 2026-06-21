<template>
  <div class="flex min-h-screen bg-slate-50">
    <AppSidebar
      v-if="isAuthenticated"
      brand="BarberFE"
      role-label="Cliente"
      accent="sky"
      :items="items"
      :open="sidebarOpen"
      @logout="handleLogout"
      @close="sidebarOpen = false"
    />
    <main class="flex-1 overflow-y-auto p-4 sm:p-8">
      <div class="mx-auto max-w-6xl">
        <div v-if="isAuthenticated" class="mb-4 md:hidden">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm"
            aria-label="Abrir menú"
            @click="sidebarOpen = true"
          >
            <Bars3Icon class="h-5 w-5" />
          </button>
        </div>
        <div v-if="!isAuthenticated" class="mb-6 flex items-center justify-between">
          <p class="text-lg font-semibold tracking-tight text-slate-900">
            BarberFE
          </p>
          <NuxtLink
            to="/login"
            class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-500"
          >
            Iniciar sesión
          </NuxtLink>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon, BuildingStorefrontIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import type { SidebarItem } from '~/types/sidebar'

const items: SidebarItem[] = [
  { to: '/client/barbershops', label: 'Barberías', icon: BuildingStorefrontIcon },
  { to: '/client/appointments', label: 'Mis citas', icon: CalendarDaysIcon }
]

const { logout, isAuthenticated } = useAuth()
const router = useRouter()
const sidebarOpen = ref(false)

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
