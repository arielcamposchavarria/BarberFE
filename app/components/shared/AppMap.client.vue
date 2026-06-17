<template>
  <div ref="mapContainer" class="h-96 w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm" />
</template>

<script setup lang="ts">
import type { Map as LeafletMap, LayerGroup } from 'leaflet'
import type { Coordinates } from '~/types'

export interface MapMarker {
  id: string
  coordinates: Coordinates
  label: string
}

const props = defineProps<{
  markers: MapMarker[]
  center?: Coordinates
  zoom?: number
}>()

const emit = defineEmits<{
  'marker-click': [id: string]
}>()

const mapContainer = ref<HTMLElement | null>(null)
let mapInstance: LeafletMap | null = null
let markerLayer: LayerGroup | null = null

async function renderMarkers() {
  if (!mapInstance) return
  const leaflet = await import('leaflet')

  if (markerLayer) {
    markerLayer.clearLayers()
  } else {
    markerLayer = leaflet.layerGroup().addTo(mapInstance)
  }

  for (const marker of props.markers) {
    const leafletMarker = leaflet.marker([marker.coordinates.lat, marker.coordinates.lng]).bindPopup(marker.label)
    leafletMarker.on('click', () => emit('marker-click', marker.id))
    leafletMarker.addTo(markerLayer)
  }
}

onMounted(async () => {
  if (!mapContainer.value) return
  const leaflet = await import('leaflet')

  const center = props.center ?? props.markers[0]?.coordinates ?? { lat: 9.9281, lng: -84.0907 }
  mapInstance = leaflet.map(mapContainer.value).setView([center.lat, center.lng], props.zoom ?? 13)
  leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance)

  await renderMarkers()
})

watch(() => props.markers, renderMarkers)

onBeforeUnmount(() => {
  mapInstance?.remove()
  mapInstance = null
  markerLayer = null
})
</script>
