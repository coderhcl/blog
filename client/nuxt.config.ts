import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/reset.css'],
  meta: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/md-editor-v3@1.7.2/lib/style.css',
      },
    ],
  },
  buildModules: ['@pinia/nuxt'],
})
