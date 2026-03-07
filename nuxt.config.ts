// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],

  
  css: ['~/assets/css/main.css'],

  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
  },

  runtimeConfig: {
    oauth: {
    github: {
        clientId: '',
        clientSecret: ''
      }
    }
  },


});
