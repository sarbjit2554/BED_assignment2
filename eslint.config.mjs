import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {globals: globals.browser}},
  {files: ["jest.config.js"], languageOptions: {globals: {module: "readonly"}}}, // Add this to handle Jest's CommonJS module
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
