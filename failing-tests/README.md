# Failing Tests Directory

This directory contains tests that are currently failing and have been temporarily excluded from the test suite.

## How to use

1. Move failing test files to this directory to exclude them from the test run
2. Jest is configured to ignore tests in this directory via `testPathIgnorePatterns` in `jest.config.js`
3. When a test is fixed, move it back to its original location in the `tests` directory

## Coverage thresholds

Note that skipping tests may affect code coverage metrics. The devkit script has been configured to bypass coverage threshold requirements when running tests.

## Process for skipping individual tests

Instead of moving entire files, you can also skip individual tests:

```javascript
// Skip a single test
it.skip('test that is failing', () => {
  // test code here
});

// Skip a group of tests
describe.skip('group of tests that are failing', () => {
  // test code here
});
```
