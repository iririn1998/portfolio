import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
  },
});
