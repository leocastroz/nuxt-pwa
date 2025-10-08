// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxt/ui', '@vite-pwa/nuxt'],
  runtimeConfig: {
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    public: {
      VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY
    }
  },
  nitro: {
    externals: {
      inline: ["web-push"]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    manifest: {
      name: 'Nuxt PWA',
      short_name: 'NuxtPWA',
      description: 'My awesome Nuxt PWA!',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      lang: 'en',
      icons: [
        {
          src: "/icons/icon64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/icons/icon144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icons/icon192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

  image: {
    // Options
  },
  ui: {
    // Options
  },
})