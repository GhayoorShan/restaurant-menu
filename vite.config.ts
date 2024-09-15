import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configDefaults } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/restaurant-menu/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "My PWA",
        short_name: "PWA",
        start_url: "/restaurant-menu/",
        scope: "/restaurant-menu/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/restaurant-menu/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/restaurant-menu/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
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
      plugins: [visualizer({ open: false })],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
