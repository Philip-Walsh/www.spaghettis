const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/failing-tests/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'components/**/*.{js,jsx}',
        'app/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/coverage/**',
        '!**/.next/**'
    ],
    coverageThreshold: {
        global: {
            branches: 5,
            functions: 8,
            lines: 7,
            statements: 7
        }
    },
    coverageReporters: ['text', 'lcov', 'html']
};

module.exports = createJestConfig(customJestConfig);
