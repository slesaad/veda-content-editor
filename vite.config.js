import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      plugins: [
        react(),
      ],
      lib: {

        entry: resolve(__dirname, 'src/lib/index.ts'),
        name: 'VEDAContentEditor',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "node_modules",
          "focus-trap-react",
          "styled-components",
          /^@devseed-ui\/.*/,
          /^@teamimpact\/.*/,

        ],
        output: {
          exports: 'named',
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
            "node_modules/@uswds/uswds/packages, node_modules/@mdxeditor/editor/style.css",
          ],
        },
      },
    },
    resolve: {
      alias: {
        // '@teamimpact/veda-ui': path.resolve(
        //   __dirname,
        //   'node_modules/@teamimpact/veda-ui/lib/main.js'
        // ),
        // '@"@devseed-ui/': path.resolve(
        //   __dirname,
        //   'node_modules/@teamimpact/veda-ui/lib/main.js'
        // ),
      },
    },
  
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