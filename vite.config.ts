import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configDefaults } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test functions like `describe`, `it`, and `expect`
    environment: "jsdom", // Set the test environment to jsdom
    setupFiles: "./src/setupTests.ts", // Path to setup file
    include: ["src/**/*.test.tsx"],
  },
  build: {
    minify: "terser", // Vite's built-in Terser minification
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
      plugins: [visualizer({ open: true })],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
