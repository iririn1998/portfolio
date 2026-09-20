import { defineConfig } from "eslint/config";
import exportScope from "eslint-plugin-export-scope";

// General JavaScript/TypeScript rules are handled by Oxlint.
export default defineConfig({
  files: ["src/**/*.{ts,tsx}"],
  extends: [exportScope.configs.flatConfigRecommended as never],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
