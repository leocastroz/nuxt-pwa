// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxt/ui', '@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'Nuxt PWA',
      short_name: 'NuxtPWA',
      description: 'My awesome Nuxt PWA!',
      theme_color: '#ffffff',
      lang: 'en',
      icons: [
        {
          src: "icons/icon64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ]
    },
    workbox: {
      navigateFallback: '/',
      // cleanupOutdatedCaches: true,
      // runtimeCaching: [
      //   {
      //     urlPattern: 'https://my-cdn.com/.*',
      //     handler: 'CacheFirst',
      //     options: {
      //       cacheName: 'my-cache',
      //       expiration: {
      //         maxEntries: 10,
      //         maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
      //       },
      //     },
      //   },
      // ],
    },
  },
  // devOptions: {
  //   enabled: true,
  //   type: 'module',
  // },
  image: {
    // Options
  },
  ui: {
    // Options
  },
})