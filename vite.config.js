import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      plugins: [react()],
      lib: {
        entry: resolve(__dirname, "src/lib/index.ts"),
        name: "VEDAContentEditor",
        fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "focus-trap-react",
          "styled-components",
          /^@devseed-ui\/.*/,
          /^@teamimpact\/.*/,
        ],
        output: {
          exports: "named",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJSXRuntime",
            "styled-components": "styled",
            "focus-trap-react": "FocusTrapReact",
          },
        },
      },
      sourcemap: true,
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: "legacy",
          includePaths: [
            "node_modules/@uswds/uswds/packages", 
            "node_modules/@mdxeditor/editor/style.css", 
            'node_modules/@uswds/uswds',
         'node_modules/@uswds/uswds/dist',
         'node_modules/@uswds/uswds/packages',,
          ],
        },
      },
    },
    optimizeDeps: {
      include: [
        "buffer",
        "process",
        "stream-browserify",
        "util",
        "@codesandbox",
        "@radix-ui",
      ],
      force: true,
      esbuildOptions: {
        define: {
          global: "globalThis",
          Buffer: "Buffer",
        },
      },
    },
  };
});
