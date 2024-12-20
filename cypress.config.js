const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    video: true,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false
  },

});
