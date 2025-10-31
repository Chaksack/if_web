import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // ...
  components: {
    dirs: [
      // Default top-level components directory
      { path: '~/components', extensions: ['vue'] },
      // App-scoped components directory
      { path: '~/app/components', extensions: ['vue'] },
    ],
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },
})