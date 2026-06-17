import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { Barbershop, Coordinates } from '~/types'

function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const earthRadiusKm = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const h = sinDLat * sinDLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng
  return 2 * earthRadiusKm * Math.asin(Math.sqrt(h))
}

/** Text search over active barbershops, with an optional sort-by-distance once the browser shares its location. */
export function useGeolocationFilter(barbershops: Ref<Barbershop[]> | ComputedRef<Barbershop[]>) {
  const searchQuery = ref('')
  const userLocation = ref<Coordinates | null>(null)

  function requestUserLocation() {
    if (!import.meta.client || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = { lat: position.coords.latitude, lng: position.coords.longitude }
      },
      () => {
        userLocation.value = null
      }
    )
  }

  const filtered = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    let results = barbershops.value.filter(shop => shop.status === 'active')

    if (query) {
      results = results.filter(shop => shop.name.toLowerCase().includes(query) || shop.address.toLowerCase().includes(query))
    }

    if (userLocation.value) {
      const location = userLocation.value
      results = [...results].sort((a, b) => haversineDistanceKm(location, a.coordinates) - haversineDistanceKm(location, b.coordinates))
    }

    return results
  })

  function distanceToShop(shop: Barbershop): number | null {
    return userLocation.value ? haversineDistanceKm(userLocation.value, shop.coordinates) : null
  }

  return { searchQuery, userLocation, requestUserLocation, filtered, distanceToShop }
}
