import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test functions like `describe`, `it`, and `expect`
    environment: "jsdom", // Set the test environment to jsdom
    setupFiles: "./src/setupTests.ts", // Path to setup file
    include: ["src/**/*.test.tsx"],
  },
});
