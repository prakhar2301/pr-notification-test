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
      "prakhar.kumar@company.com",
      "sandhya@company.com",
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
      "frontendlead@company.com",
      "prakharkumarindiranagar.kvg@gmail.com"
    ],
    teamsWebhook: "FRONTEND_WEBHOOK"
  }
};
