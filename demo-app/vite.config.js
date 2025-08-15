import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config(); // load .env into process.env

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  define: {
    global: "globalThis",
    "process.env": JSON.stringify(process.env), // inline as a plain object
  },
  resolve: {
    alias: {
      buffer: "buffer",
      process: "process/browser",
      stream: "stream-browserify",
      string_decoder: "string_decoder",
      events: "events",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["node_modules/@uswds/uswds/packages"],
      },
    },
  },
  optimizeDeps: {
    include: [
      "@teamimpact/veda-ui",
      "buffer",
      "process",
      "events",
      "stream-browserify",
      "string_decoder",
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          buffer: "Buffer",
          process: "process",
        },
      },
    },
  },
});
