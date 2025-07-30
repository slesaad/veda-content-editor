import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package-lib.json', 'utf-8'));

// Get all dependencies and peer dependencies
const deps = Object.keys(packageJson.dependencies || {});
const peerDeps = Object.keys(packageJson.peerDependencies || {});

export default {
  input: 'src/lib/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      interop: 'auto',
      exports: 'named',
      // Don't bundle external dependencies
      paths: {
        'acorn-jsx': 'acorn-jsx'
      }
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      // Don't bundle external dependencies
      paths: {
        'acorn-jsx': 'acorn-jsx'
      }
    },
  ],
  plugins: [
    // Automatically externalize peer dependencies
    peerDepsExternal(),
    
    // Resolve node modules
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false,
      browser: true,
      // Don't bundle these - they should remain external
      resolveOnly: (module) => {
        // Don't resolve any npm packages - keep them external
        if (module.includes('node_modules')) return false;
        return true;
      }
    }),
    
    // Convert CommonJS modules
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'preferred',
      transformMixedEsModules: true,
      defaultIsModuleExports: true,
      // Important: don't transform modules that should stay external
      ignore: deps.concat(peerDeps)
    }),
    
    // Compile TypeScript
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: 'dist',
      jsx: 'react-jsx',
    }),
    
    // Transform with Babel using runtime helpers
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelrc: false,
      configFile: './babel.config.js',
    }),
    
    // Handle JSON imports
    json(),
    
    // Process CSS
    postcss({
      extract: 'styles.css',
      minimize: false,
      sourceMap: true,
      use: ['sass'],
      extensions: ['.css', '.scss', '.sass'],
    }),
  ],
  
  // Mark all dependencies as external
  external: [
    // React
    /^react($|\/)/,
    /^react-dom($|\/)/,
    
    // Node built-ins
    'os',
    'path',
    'fs',
    'url',
    
    // All runtime dependencies
    /@babel\/runtime/,
    
    // Mark each dependency as external with regex to catch sub-imports
    ...deps.map(dep => new RegExp(`^${dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|/)`)),
    ...peerDeps.map(dep => new RegExp(`^${dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|/)`))
  ],
};