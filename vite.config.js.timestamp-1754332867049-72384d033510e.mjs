// vite.config.js
import { defineConfig, loadEnv } from "file:///Users/smalone/Documents/Projects/veda-content-editor/node_modules/vite/dist/node/index.js";
import react from "file:///Users/smalone/Documents/Projects/veda-content-editor/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
import dts from "file:///Users/smalone/Documents/Projects/veda-content-editor/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/smalone/Documents/Projects/veda-content-editor";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      plugins: [
        react()
      ],
      lib: {
        entry: resolve(__vite_injected_original_dirname, "src/lib/index.ts"),
        name: "VEDAContentEditor",
        fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
        formats: ["es", "cjs"]
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "node_modules",
          "focus-trap-react",
          "styled-components",
          "next/link",
          /^@devseed-ui\/.*/
        ],
        output: {
          exports: "named",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJSXRuntime",
            "styled-components": "styled",
            "focus-trap-react": "FocusTrapReact"
          }
        }
      },
      sourcemap: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "legacy",
          includePaths: [
            "node_modules/@uswds/uswds/packages, node_modules/@mdxeditor/editor/style.css"
          ]
        }
      }
    },
    resolve: {
      alias: {
        "@teamimpact/veda-ui": path.resolve(
          __vite_injected_original_dirname,
          "node_modules/@teamimpact/veda-ui/lib/main.js"
        )
      }
    }
    // define: {
    //   'process.env': JSON.stringify(env),
    //   global: 'globalThis',
    // },
    // optimizeDeps: {
    //       include: [
    //         'buffer', 
    //         'process', 
    //         'stream-browserify',
    //         'util',
    //       ],
    //       force: true,
    //       esbuildOptions: {
    //         define: {
    //           global: 'globalThis',
    //           Buffer: 'Buffer',
    //         },
    //       },
    //     },
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc21hbG9uZS9Eb2N1bWVudHMvUHJvamVjdHMvdmVkYS1jb250ZW50LWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NtYWxvbmUvRG9jdW1lbnRzL1Byb2plY3RzL3ZlZGEtY29udGVudC1lZGl0b3Ivdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NtYWxvbmUvRG9jdW1lbnRzL1Byb2plY3RzL3ZlZGEtY29udGVudC1lZGl0b3Ivdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuXG4gIHJldHVybiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgIF0sXG4gICAgICBsaWI6IHtcblxuICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbGliL2luZGV4LnRzJyksXG4gICAgICAgIG5hbWU6ICdWRURBQ29udGVudEVkaXRvcicsXG4gICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaW5kZXguJHtmb3JtYXQgPT09ICdlcycgPyAnbWpzJyA6ICdqcyd9YCxcbiAgICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICAgXCJyZWFjdFwiLFxuICAgICAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICAgIFwibm9kZV9tb2R1bGVzXCIsXG4gICAgICAgICAgXCJmb2N1cy10cmFwLXJlYWN0XCIsXG4gICAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiLFxuICAgICAgICAgIFwibmV4dC9saW5rXCIsXG4gICAgICAgICAgL15AZGV2c2VlZC11aVxcLy4qLyxcbiAgICAgICAgXSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcbiAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICByZWFjdDogXCJSZWFjdFwiLFxuICAgICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiOiBcIlJlYWN0SlNYUnVudGltZVwiLFxuICAgICAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiOiBcInN0eWxlZFwiLFxuICAgICAgICAgICAgXCJmb2N1cy10cmFwLXJlYWN0XCI6IFwiRm9jdXNUcmFwUmVhY3RcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICB9LFxuICBcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFwaTogXCJsZWdhY3lcIixcbiAgICAgICAgICBpbmNsdWRlUGF0aHM6IFtcbiAgICAgICAgICAgIFwibm9kZV9tb2R1bGVzL0B1c3dkcy91c3dkcy9wYWNrYWdlcywgbm9kZV9tb2R1bGVzL0BtZHhlZGl0b3IvZWRpdG9yL3N0eWxlLmNzc1wiLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0B0ZWFtaW1wYWN0L3ZlZGEtdWknOiBwYXRoLnJlc29sdmUoXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICdub2RlX21vZHVsZXMvQHRlYW1pbXBhY3QvdmVkYS11aS9saWIvbWFpbi5qcydcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgXG4gICAgLy8gZGVmaW5lOiB7XG4gICAgLy8gICAncHJvY2Vzcy5lbnYnOiBKU09OLnN0cmluZ2lmeShlbnYpLFxuICAgIC8vICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXG4gICAgLy8gfSxcbiAgICAvLyBvcHRpbWl6ZURlcHM6IHtcbiAgICAvLyAgICAgICBpbmNsdWRlOiBbXG4gICAgLy8gICAgICAgICAnYnVmZmVyJywgXG4gICAgLy8gICAgICAgICAncHJvY2VzcycsIFxuICAgIC8vICAgICAgICAgJ3N0cmVhbS1icm93c2VyaWZ5JyxcbiAgICAvLyAgICAgICAgICd1dGlsJyxcbiAgICAvLyAgICAgICBdLFxuICAgIC8vICAgICAgIGZvcmNlOiB0cnVlLFxuICAgIC8vICAgICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgLy8gICAgICAgICBkZWZpbmU6IHtcbiAgICAvLyAgICAgICAgICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXG4gICAgLy8gICAgICAgICAgIEJ1ZmZlcjogJ0J1ZmZlcicsXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIH0sXG4gIH07XG5cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxjQUFjLGVBQWU7QUFDdlgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFFaEIsT0FBTyxVQUFVO0FBTGpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBRUgsT0FBTyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQzVDLE1BQU07QUFBQSxRQUNOLFVBQVUsQ0FBQyxXQUFXLFNBQVMsV0FBVyxPQUFPLFFBQVEsSUFBSTtBQUFBLFFBQzdELFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUN2QjtBQUFBLE1BQ0EsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsYUFBYTtBQUFBLFlBQ2IscUJBQXFCO0FBQUEsWUFDckIscUJBQXFCO0FBQUEsWUFDckIsb0JBQW9CO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLEtBQUs7QUFBQSxVQUNMLGNBQWM7QUFBQSxZQUNaO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsdUJBQXVCLEtBQUs7QUFBQSxVQUMxQjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBcUJGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
