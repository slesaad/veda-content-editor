import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  define: {
    global: "globalThis",
    "process.env": {},
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
