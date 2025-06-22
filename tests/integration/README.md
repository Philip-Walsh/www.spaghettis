# Integration Tests

This directory contains integration tests for the database functionality and menu system.

## Test Files

### `menu-api.test.js`

Tests the API endpoints for menu operations:

- `GET /api/menu` - Public menu data endpoint
- `GET /api/menu/admin` - Admin data endpoint
- `POST /api/menu/admin` - Create new menu items
- `PUT /api/menu/admin/[id]` - Update menu items
- `DELETE /api/menu/admin/[id]` - Soft delete menu items

**Key Test Cases:**

- Successful API responses
- Error handling for database failures
- Proper HTTP status codes
- Data validation

### `menuService.test.js`

Tests the database service layer:

- `MenuService.getCategories()` - Fetch menu categories
- `MenuService.getItemsByCategory()` - Fetch items by category
- `MenuService.getMenuOptions()` - Get complete menu structure
- `MenuService.addItem()` - Create new menu items
- `MenuService.updateItem()` - Update existing items
- `MenuService.deleteItem()` - Soft delete items

**Key Test Cases:**

- Database query execution
- Data transformation (decimal to number conversion)
- Error handling
- Empty result handling

### `components.test.jsx`

Tests React components with database integration:

- `RamenBuilder` component with database data
- `Cart` component with database data
- Loading states
- Error states
- Data consistency

**Key Test Cases:**

- Component rendering with database data
- Loading and error state handling
- User interactions (option selection)
- Price calculations with database prices

### `utils.test.js`

Tests utility functions for menu data fetching:

- `getMenuOptions()` - Fetch menu data with fallback
- `getStepOptions()` - Get specific step options
- Error handling and fallback mechanisms

**Key Test Cases:**

- Successful API calls
- Network error handling
- Fallback to static data
- Data structure validation

### `e2e.test.js`

End-to-end tests simulating complete user flows:

- Complete ramen building process
- Cart integration
- Error recovery scenarios
- Data consistency across components

**Key Test Cases:**

- Full user journey from selection to cart
- Price calculation accuracy
- Error recovery and fallback
- Cross-component data consistency

## Running Tests

### Run All Integration Tests

```bash
npm run test:integration
```

### Run Integration Tests in Watch Mode

```bash
npm run test:integration:watch
```

### Run Specific Test File

```bash
npm test -- tests/integration/menu-api.test.js
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## Test Data

The tests use mock data that mirrors the structure of the actual database schema:

```javascript
const mockMenuOptions = {
  noodleBase: {
    label: 'Choose Your Noodle Base',
    key: 'noodleBase',
    multi: false,
    choices: [
      {
        id: 1,
        name: 'Forbidden Ramen',
        price: 0,
        icon: '🥷🍜',
        description: 'Firm wheat noodles...',
        tags: ['vegetarian'],
        defaults: {},
        isActive: true,
        sortOrder: 0
      }
    ]
  }
  // ... other categories
};
```

## Mocking Strategy

### Database Layer

- Mock the `db` object from `db/index.ts`
- Mock `MenuService` methods for API tests
- Simulate database errors and edge cases

### API Layer

- Mock `fetch` for utility function tests
- Mock `NextRequest` for API route tests
- Test error responses and status codes

### React Components

- Mock `useMenuData` hook
- Test loading, error, and success states
- Verify component behavior with database data

## Test Coverage

The integration tests cover:

- ✅ **API Endpoints** - All CRUD operations
- ✅ **Database Service** - All service methods
- ✅ **React Components** - Loading, error, and success states
- ✅ **Utility Functions** - Data fetching and fallback
- ✅ **End-to-End Flows** - Complete user journeys
- ✅ **Error Handling** - Network, database, and validation errors
- ✅ **Data Consistency** - Cross-component data integrity

## Best Practices

1. **Isolation**: Each test is independent and doesn't rely on other tests
2. **Mocking**: External dependencies are properly mocked
3. **Error Scenarios**: Both success and failure cases are tested
4. **Data Validation**: Test data structure and content
5. **User Flows**: Test complete user journeys, not just individual functions

## Debugging

To debug failing tests:

1. Run tests in watch mode: `npm run test:integration:watch`
2. Use `console.log` in test files (will show in test output)
3. Check mock implementations for correctness
4. Verify test data matches expected structure
5. Use Jest's `--verbose` flag for more detailed output

## Adding New Tests

When adding new integration tests:

1. Follow the existing naming convention: `*.test.js` or `*.test.jsx`
2. Use descriptive test names that explain the scenario
3. Mock external dependencies appropriately
4. Test both success and error cases
5. Update this README if adding new test categories
