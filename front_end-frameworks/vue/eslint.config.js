import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginVue.configs["flat/essential"],
  {
    rules: {
      "vue/multi-word-component-names": ["error", {
        ignores: ["Header", "Footer", "Hero", "About", "Contact", "Features", "Insights", "Brand", "Button"],
      }],
    },
  },
]);
