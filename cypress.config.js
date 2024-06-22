const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false, // Desactivar archivo de soporte
  },

  video: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
