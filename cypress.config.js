const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth :1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://qaplayground.dev/apps/tags-input-box/',
    supportFile: false,
    specPattern: 'cypress/e2e/*.{cy.js,js,jsx,ts,tsx}'
  },
})
