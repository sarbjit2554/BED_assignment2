// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    testMatch: ['**/test/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'], // Optional for setup
  };
  