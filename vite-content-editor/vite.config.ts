import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
// import { commonjs } from "@originjs/vite-plugin-commonjs";

// This is necessary to get the __dirname equivalent in an ESM context.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This forces all imports of 'react' and 'react-dom' to resolve to the
      // versions in your main project's node_modules folder.
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "@teamimpact": path.resolve(__dirname, "./node_modules/@teamimpact"),
    },
  },
  optimizeDeps: {
    include: [
      "@teamimpact/veda-ui",
      "lexical",
      "buffer",
      "process",
      "events",
      "stream-browserify",
      "string_decoder",
    ],
  },
});
