import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  plugins: [
    react(),
  ],
  server: {
    port: 3333,
    open: true
  },
  define: {
    'process.env': JSON.stringify(env),
    'process.env.NEXT_PUBLIC_MAPBOX_TOKEN': JSON.stringify(env.NEXT_PUBLIC_MAPBOX_TOKEN),
    'process.env.NEXT_PUBLIC_API_STAC_ENDPOINT': JSON.stringify(env.NEXT_PUBLIC_API_STAC_ENDPOINT),
    'process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT': JSON.stringify(env.NEXT_PUBLIC_API_RASTER_ENDPOINT),
    global: 'globalThis',
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: [
      '@teamimpact/veda-ui', 
      'buffer', 
      'process', 
      'stream-browserify',
    ],
    force: true,
    esbuildOptions: {
      define: {
        global: 'globalThis',
        Buffer: 'Buffer',
      },
    },
  },
  };
});