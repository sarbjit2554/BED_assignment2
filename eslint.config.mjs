import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginSecurity from "eslint-plugin-security"; // Security plugin

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {globals: globals.browser}},
  {files: ["jest.config.js"], languageOptions: {globals: {module: "readonly"}}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginSecurity.configs.recommended, // Add security rules
  {
    rules: {
      "no-process-env": "off", // Allow usage of process.env
      "security/detect-object-injection": "warn", // Warn about object injection risks
    },
  },
];
