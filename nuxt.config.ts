// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@sidebase/nuxt-auth'],
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
  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'refresh',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        refresh: { path: '/refresh', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/getSession', method: 'get' },
      },
      token: { signInResponseTokenPointer: '/accessToken' },
      refreshToken: { signInResponseRefreshTokenPointer: '/refreshToken' },
      pages: {
        login: '/account/signin',
      },
    },
  },
});
