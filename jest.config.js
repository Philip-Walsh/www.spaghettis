const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^data/(.*)$': '<rootDir>/data/$1',
    '^menuOptions$': '<rootDir>/data/menuOptions',
    '^utils/(.*)$': '<rootDir>/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/e2e/'],
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.{js,jsx,ts,tsx}'],
      testEnvironment: 'node',
    },
    {
      displayName: 'component',
      testMatch: ['<rootDir>/tests/components/**/*.test.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.{js,jsx,ts,tsx}'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.js'],
    },
    {
      displayName: 'contract',
      testMatch: ['<rootDir>/tests/contract/**/*.test.{js,jsx,ts,tsx}'],
      testEnvironment: 'node',
    },
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      lines: 60,
      branches: 40,
      functions: 60,
      statements: 60,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  maxWorkers: process.env.CI ? 1 : '50%',
};

module.exports = createJestConfig(customJestConfig);