module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["<rootDir>/tests/setupEnv.js"], // Correct file path
};
