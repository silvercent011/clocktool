// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@sidebase/nuxt-auth", "@nuxt/devtools", "nuxt-quasar-ui"],
  quasar: {
    extras: {
      fontIcons: ["fontawesome-v6"],
    },
  },
  routeRules: {
    "/*": { cors: true },
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET,
    },
    atlassian: {
      clientId: process.env.NUXT_ATLASSIAN_CLIENT_ID,
      clientSecret: process.env.NUXT_ATLASSIAN_CLIENT_SECRET,
    },
    public: {
      jiraSubdomain: process.env.NUXT_ATLASSIAN_JIRA_SUBDOMAIN,
      jiraApiToken: process.env.NUXT_ATLASSIAN_JIRA_API_TOKEN,
      clockworkApiToken: process.env.NUXT_CLOCKWORK_API_TOKEN,
    },
  },
  auth: {
    baseURL: process.env.NUXT_NEXTAUTH_URL,
  },

  nitro: {
    storage: {
      data: {
        driver: "vercelKV",
        url: process.env.NUXT_KV_REST_API_URL,
        token: process.env.NUXT_KV_REST_API_TOKEN,
      },
    },
  },
});
