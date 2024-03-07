// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  nitro: {
    runtimeConfig: {
      postgresConnectionString: process.env.CONNECTION_STRING,
      replicate: process.env.REPLICATE_API_TOKEN
    },
    moduleSideEffects: ['lucia/polyfill/node']
  }
})