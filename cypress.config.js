const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

// Dynamic base URL detection (same logic as cucumber.js)
function getBaseURL() {
    if (process.env.BASE_URL) return process.env.BASE_URL;
    if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL;
    if (process.env.DEPLOY_URL) return process.env.DEPLOY_URL;
    if (process.env.GITHUB_PR_NUMBER) {
        return `https://deploy-preview-${process.env.GITHUB_PR_NUMBER}--spaghettis.netlify.app`;
    }
    if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
    return 'https://spaghettis.netlify.app';
}

const baseURL = getBaseURL();
console.log(`🍜 Cypress running against: ${baseURL}`);

module.exports = defineConfig({
    e2e: {
        baseUrl: baseURL,
        specPattern: 'cypress/e2e/**/*.{cy.js,feature}',
        supportFile: 'cypress/support/e2e.js',
        videosFolder: 'test-reports/cypress/videos',
        screenshotsFolder: 'test-reports/cypress/screenshots',
        video: true,
        screenshot: 'only-on-failure',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 10000,
        pageLoadTimeout: 30000,

        // Environment variables
        env: {
            baseURL: baseURL,
            GITHUB_PR_NUMBER: process.env.GITHUB_PR_NUMBER,
        },

        setupNodeEvents(on, config) {
            // Cucumber preprocessor
            on('file:preprocessor', cucumber());

            // Task for logging
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                },
                table(message) {
                    console.table(message);
                    return null;
                }
            });

            return config;
        },
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
        specPattern: 'cypress/component/**/*.cy.{js,jsx}',
        supportFile: 'cypress/support/component.js',
    },

    // Global configuration
    retries: {
        runMode: 2,
        openMode: 0
    },

    watchForFileChanges: false,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,

    // Reporter configuration
    reporter: 'spec'
});
