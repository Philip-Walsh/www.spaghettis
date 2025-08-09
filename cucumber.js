module.exports = {
  default: {
    require: ['tests/e2e/steps/**/*.js'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    paths: ['tests/e2e/features/**/*.feature'],
    parallel: 2,
    worldParameters: {
      browser: 'chromium',
      headless: true
    }
  }
};