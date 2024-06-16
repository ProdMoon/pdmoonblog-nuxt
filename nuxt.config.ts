// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  app: {
    head: {
      title: 'PDMoonBlog',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      htmlAttrs: {
        lang: 'ko',
      },
    },
  },
  googleFonts: {
    families: {
      Ubuntu: true,
      'Gowun Batang': true,
    },
  },
});
