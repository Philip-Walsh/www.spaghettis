# 🍜 Cypress Setup Verification

## ✅ Cypress Installation Complete

Cypress has been successfully added to your Spaghetti's Ramen testing suite alongside Playwright and Cucumber!

## 🔧 Configuration Summary

### Dynamic URL Detection

Cypress now automatically detects the correct URL from:

1. `BASE_URL` (manual override)
2. `DEPLOY_PRIME_URL` (Netlify primary)
3. `DEPLOY_URL` (Netlify fallback)
4. `GITHUB_PR_NUMBER` (constructs preview URL)
5. Development/Production fallbacks

### Test Structure

```
cypress/
├── e2e/
│   ├── navigation.cy.js          # Cypress test suite
│   ├── navigation.feature        # Cucumber BDD scenarios
│   └── navigation/
│       └── steps.js              # Cucumber step definitions
├── support/
│   ├── e2e.js                    # Global E2E configuration
│   └── commands.js               # Custom Cypress commands
└── fixtures/                     # Test data (empty for now)
```

## 🚀 Available Commands

### Local Testing

```bash
# Open Cypress Test Runner (interactive)
npm run test:cypress:open

# Run Cypress tests (headless)
npm run test:cypress

# Run only navigation tests
npm run test:cypress:navigation

# Wait for deploy then test
npm run test:cypress:wait
```

### Environment-Specific Testing

```bash
# Test against specific URL
BASE_URL=https://deploy-preview-6--spaghettis.netlify.app npm run test:cypress

# Test with PR number (auto-constructs URL)
GITHUB_PR_NUMBER=6 npm run test:cypress

# Test in development mode
NODE_ENV=development npm run test:cypress
```

## 🧪 Test Coverage

### Cypress Test Suite (`navigation.cy.js`)

- ✅ **Top Navigation**: Menu consistency, theme toggle, mobile navigation
- ✅ **Step Navigation**: Ramen builder step progression and state
- ✅ **Selection Persistence**: Maintains selections across navigation
- ✅ **Performance Testing**: Navigation timing validation
- ✅ **Accessibility**: Keyboard navigation and ARIA compliance
- ✅ **Edge Cases**: Direct URLs, browser navigation, error handling

### Cucumber BDD Tests (`navigation.feature`)

- ✅ **Gherkin Scenarios**: Human-readable test scenarios
- ✅ **Step Definitions**: Reusable test steps
- ✅ **Tagged Execution**: `@Navigation`, `@StepNavigation`, `@Performance`

## 🎯 Custom Cypress Commands

Your custom commands make testing easier:

```javascript
// Navigation commands
cy.navigateToRamenBuilder();
cy.navigateToStep('protein');

// Selection commands
cy.selectNoodleBase('Forbidden Ramen');
cy.selectProtein('Tofu');
cy.selectBroth('Miso');

// Verification commands
cy.verifyStepActive('Choose Your Base');
cy.verifyOptionSelected('Tofu');
cy.verifyTotalPriceUpdated();

// Advanced testing
cy.testThemeToggle();
cy.testMobileNavigation();
cy.measureNavigationTime('protein', 'sauceBroth');
cy.checkAccessibility();
```

## 🔄 CI/CD Integration

The GitHub Actions workflow now runs:

1. **Playwright E2E Tests** (existing)
2. **Cucumber BDD Tests** (enhanced)
3. **Cypress E2E Tests** (new!)

All three test suites automatically:

- Wait for Netlify deploy preview
- Detect the correct URL dynamically
- Run against the live deploy preview
- Upload test results as artifacts

## 🌐 URL Detection Examples

```bash
# Production
https://spaghettis.netlify.app

# Deploy Preview (PR #6)
https://deploy-preview-6--spaghettis.netlify.app

# Development
http://localhost:3000

# Custom
https://custom-staging.netlify.app
```

## 🚦 Verification Commands

Test your setup:

```bash
# Verify Cypress installation
npx cypress verify

# Check configuration
npx cypress info

# Test dynamic URL detection
GITHUB_PR_NUMBER=6 node -e "console.log(require('./cypress.config.js').e2e.baseUrl)"

# Run a quick test (if deploy is available)
npm run test:cypress:navigation
```

## 🎉 Benefits

1. **Three Testing Options**: Choose between Playwright, Cucumber, or Cypress based on your needs
2. **Consistent Navigation Testing**: All tools test the same navigation functionality
3. **Dynamic URL Detection**: No manual URL updates needed
4. **CI/CD Ready**: Automatic testing against deploy previews
5. **Developer Friendly**: Interactive test runner with Cypress GUI
6. **BDD Support**: Human-readable test scenarios with Cucumber integration

## 📊 Testing Strategy

| Tool           | Best For                | UI       | Debugging    | Speed  |
| -------------- | ----------------------- | -------- | ------------ | ------ |
| **Playwright** | Cross-browser testing   | Terminal | Trace viewer | Fast   |
| **Cucumber**   | BDD scenarios           | Terminal | Console logs | Medium |
| **Cypress**    | Interactive development | GUI      | Time travel  | Medium |

## 🔧 Troubleshooting

### Common Issues:

1. **No browsers detected**: Install a browser or use `--browser electron`
2. **Timeout errors**: Increase timeouts in `cypress.config.js`
3. **URL not reachable**: Verify deploy preview is ready with `npm run test:cypress:wait`

### Debug Mode:

```bash
# Open Cypress with debug info
DEBUG=cypress:* npm run test:cypress:open
```

## ✨ Next Steps

Your navigation testing is now fully set up! You can:

1. Run interactive tests: `npm run test:cypress:open`
2. Add more test scenarios to `cypress/e2e/navigation.cy.js`
3. Create additional Cucumber features in `cypress/e2e/`
4. Use custom commands to build more complex test flows

The navigation testing is now comprehensive and ready for production use! 🍜✨
