// config/repositories.js

export default {
  backend: {
    repositories: [
      "mi-policy-service",
      "mi-notification-service",
      "mi-payment-service",
      "pr-notification-test"
    ],
    leads: [
      "prakhar@nagarro.com",
      "prakharkumarindiranagar.kvg@gmail.com"
    ],
    teamsWebhook: "BACKEND_WEBHOOK"
  },

  frontend: {
    repositories: [
      "insurance-ui",
      "admin-ui"
    ],
    leads: [
      "prakhar@nagarro.com",
      "prakharkumarindiranagar.kvg@gmail.com"
    ],
    teamsWebhook: "FRONTEND_WEBHOOK"
  }
};
