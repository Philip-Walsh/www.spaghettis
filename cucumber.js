// Dynamic base URL detection
function getBaseURL() {
  // Environment variable override (highest priority)
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  // Netlify environment variables
  if (process.env.DEPLOY_PRIME_URL) {
    return process.env.DEPLOY_PRIME_URL;
  }

  if (process.env.DEPLOY_URL) {
    return process.env.DEPLOY_URL;
  }

  // GitHub PR environment variables
  if (process.env.GITHUB_PR_NUMBER) {
    return `https://deploy-preview-${process.env.GITHUB_PR_NUMBER}--spaghettis.netlify.app`;
  }

  // Development fallback
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Production fallback
  return 'https://spaghettis.netlify.app';
}

const baseURL = getBaseURL();
const isCI = process.env.CI === 'true';
const isHeadless = isCI || process.env.HEADLESS !== 'false';

console.log(`🍜 Cucumber running against: ${baseURL}`);
console.log(`🤖 CI mode: ${isCI}, Headless: ${isHeadless}`);

module.exports = {
  default: {
    require: ['tests/e2e/steps/**/*.js'],
    format: [
      'progress',
      'json:test-reports/cucumber-report.json',
      'html:test-reports/cucumber-report.html'
    ],
    paths: ['tests/e2e/features/**/*.feature'],
    parallel: isCI ? 1 : 2,
    worldParameters: {
      browser: 'chromium',
      headless: isHeadless,
      baseURL: baseURL
    },
    tags: process.env.CUCUMBER_TAGS || '@Navigation or @RamenBuilder'
  },
  navigation: {
    require: ['tests/e2e/steps/**/*.js'],
    format: ['progress'],
    paths: ['tests/e2e/features/navigation.feature'],
    parallel: 1,
    worldParameters: {
      browser: 'chromium',
      headless: isHeadless,
      baseURL: baseURL
    },
    tags: '@Navigation'
  },
  ramenbuilder: {
    require: ['tests/e2e/steps/**/*.js'],
    format: ['progress'],
    paths: ['tests/e2e/features/ramen-builder.feature'],
    parallel: 1,
    worldParameters: {
      browser: 'chromium',
      headless: isHeadless,
      baseURL: baseURL
    },
    tags: '@RamenBuilder'
  }
};