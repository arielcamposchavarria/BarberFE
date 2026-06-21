<template>
  <div>
    <h1 class="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
      Barberías
    </h1>

    <BarbershopFilters
      :search-query="searchQuery"
      :view-mode="viewMode"
      @update:search-query="searchQuery = $event"
      @update:view-mode="viewMode = $event"
      @use-location="requestUserLocation"
    />

    <div v-if="barbershopsStore.isLoading" class="mt-6 text-slate-500">
      Cargando...
    </div>

    <div v-else-if="viewMode === 'list'" class="mt-6 grid gap-4 sm:grid-cols-2">
      <BarbershopListItem v-for="shop in filtered" :key="shop.id" :barbershop="shop" :distance-km="distanceToShop(shop)" />
    </div>

    <div v-else class="mt-6">
      <AppMap :markers="mapMarkers" @marker-click="goToShop" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'client', public: true })

const barbershopsStore = useBarbershopsStore()
const router = useRouter()

const viewMode = ref<'list' | 'map'>('list')

onMounted(() => {
  barbershopsStore.fetchAll()
})

const { searchQuery, requestUserLocation, filtered, distanceToShop } = useGeolocationFilter(computed(() => barbershopsStore.items))

const mapMarkers = computed(() => filtered.value.map(shop => ({ id: shop.id, coordinates: shop.coordinates, label: shop.name })))

function goToShop(id: string) {
  router.push(`/client/barbershops/${id}`)
}
</script>
