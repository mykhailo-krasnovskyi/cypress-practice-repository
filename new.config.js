const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://wikipedia.org",
        video: true,
        screenshotOnRunFailure: false,
        chromeWebSecurity: false
    },

});
