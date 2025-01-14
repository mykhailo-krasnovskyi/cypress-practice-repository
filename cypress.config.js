const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl: `https://guest:welcome2qauto@qauto.forstudy.space`,
    video: true,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    env: {
      USERNAME: 'guest',
      PASSWORD: 'welcome2qauto',
    },
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    defaultBrowser: 'chrome'
  },

});
