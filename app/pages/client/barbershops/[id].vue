<template>
  <div v-if="barbershop">
    <NuxtLink to="/client/barbershops" class="text-sm text-slate-500 hover:underline">
      ← Barberías
    </NuxtLink>
    <h1 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
      {{ barbershop.name }}
    </h1>
    <p class="text-sm text-slate-500">
      {{ barbershop.address }}
    </p>
    <p v-if="barbershop.description" class="mt-2 text-sm text-slate-600">
      {{ barbershop.description }}
    </p>

    <h2 class="mt-8 mb-4 text-xl font-semibold">
      Barberos
    </h2>
    <div v-if="barbersStore.isLoading" class="text-slate-500">
      Cargando...
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="barber in activeBarbers"
        :key="barber.id"
        :to="`/client/barbers/${barber.id}`"
        class="block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center gap-3">
          <img v-if="barber.avatarUrl" :src="barber.avatarUrl" :alt="barber.displayName" class="h-12 w-12 rounded-full object-cover">
          <div>
            <p class="font-semibold text-slate-900">
              {{ barber.displayName }}
            </p>
            <p v-if="barber.bio" class="text-sm text-slate-500">
              {{ barber.bio }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'client', public: true })

const route = useRoute()
const barbershopId = route.params.id as string

const barbershopsStore = useBarbershopsStore()
const barbersStore = useBarbersStore()

const barbershop = computed(() => barbershopsStore.items.find(shop => shop.id === barbershopId))
const activeBarbers = computed(() => barbersStore.items.filter(barber => barber.status === 'active'))

onMounted(async () => {
  if (barbershopsStore.items.length === 0) {
    await barbershopsStore.fetchAll()
  }
  await barbersStore.fetchByBarbershop(barbershopId)
})
</script>
