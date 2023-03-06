const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth :1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://qaplayground.dev/apps/tags-input-box/',
    supportFile: false,
    specPattern: '/home/runner/work/Tags-input-tests/cypress/e2e/*.cy.{js,jsx,ts,tsx}'
  },
})
