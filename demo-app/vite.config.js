import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      // Allow serving files from one level up to the project root,
      // which is where the veda-content-editor package is located.
      allow: [".."],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Make sure this port matches your library's dev server
        changeOrigin: true,
      },
    },
    resolve: {
      alias: {
        // Ensure both the demo app and the library use the same instance of React
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        "styled-components": path.resolve(
          __dirname,
          "node_modules/styled-components"
        ),
      },
    },
  },
});
