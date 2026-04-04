const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Specifies a setup file to run after the test environment is set up but before tests are executed.
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // Set up the test environment to jsdom, which simulates a browser environment for testing React components.
    testEnvironment: 'jest-environment-jsdom',
    // Use ts-jest preset for handling TypeScript files in Jest.
    preset: 'ts-jest',
    // Enables detailed test results in the console.
    verbose: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)