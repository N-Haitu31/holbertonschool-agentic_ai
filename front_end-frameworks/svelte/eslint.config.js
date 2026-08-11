import js from "@eslint/js";
import globals from "globals";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  ...svelte.configs["flat/recommended"],
]);
