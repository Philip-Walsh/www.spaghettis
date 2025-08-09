# Testing Strategy

## Test Levels

### Unit Tests (`tests/unit/`)
- **Focus**: Pure functions, utilities, hooks
- **Tools**: Jest + ts-jest
- **Environment**: Node.js
- **Run**: `npm run test:unit`

### Component Tests (`tests/components/`)
- **Focus**: React components in isolation
- **Tools**: React Testing Library + Jest
- **Mocking**: MSW for network, identity-obj-proxy for CSS
- **Environment**: jsdom
- **Run**: `npm run test:component`

### Integration Tests (`tests/integration/`)
- **Focus**: API routes, server actions, database interactions
- **Tools**: Jest + MSW + SQLite in-memory
- **Environment**: Node.js
- **Run**: `npm run test:integration`

### Contract Tests (`tests/contract/`)
- **Focus**: API contracts between services
- **Tools**: Pact (pact-js)
- **Environment**: Node.js
- **Run**: `npm run test:contract`

### E2E Tests (`tests/e2e/`)
- **Focus**: Full user workflows
- **Tools**: Playwright + Cucumber.js (BDD)
- **Features**: Gherkin scenarios, Page Objects
- **Run**: `npm run test:e2e`

## Running Tests

```bash
# All tests
npm test

# Specific test levels
npm run test:unit
npm run test:component
npm run test:integration
npm run test:contract
npm run test:e2e

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# E2E with UI
npm run test:e2e:ui
```

## Test Structure

```
tests/
├── unit/           # Pure functions, hooks
├── components/     # React components
├── integration/    # API routes, DB
├── contract/       # API contracts
└── e2e/           # End-to-end
    ├── features/   # Gherkin files
    ├── steps/      # Step definitions
    └── pages/      # Page objects
```