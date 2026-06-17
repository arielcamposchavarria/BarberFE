// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['leaflet/dist/leaflet.css'],
  components: [
    { path: '~/components/shared', pathPrefix: false },
    { path: '~/components/admin', pathPrefix: false },
    { path: '~/components/barber', pathPrefix: false },
    { path: '~/components/client', pathPrefix: false }
  ]
})
