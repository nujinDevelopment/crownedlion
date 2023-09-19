// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './app',
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-lucide-icons'
  ],
  autoImports: [
    ['defineStore', 'definePiniaStore'],
  ],
  pwa: {
    /* your pwa options */
  }
})
