module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*test.ts'],  
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],  // Ignore compiled files
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
