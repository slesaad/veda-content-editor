import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package-lib.json', 'utf-8'));

export default {
  input: 'src/lib/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      interop: 'auto',
      exports: 'named',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    // Automatically externalize peer dependencies
    peerDepsExternal(),
    
    // Resolve node modules - but ONLY for our source code
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false,
      browser: true,
      // Only resolve files in src directory, not node_modules
      resolveOnly: [
        /^(?!.*node_modules)/
      ]
    }),
    
    // Convert CommonJS modules
    commonjs({
      // Only transform our source files, not dependencies
      include: ['src/**/*'],
      exclude: ['node_modules/**'],
      requireReturnsDefault: 'preferred',
      transformMixedEsModules: true,
      defaultIsModuleExports: true,
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
      // Only process our source files
      include: ['src/**/*']
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
  
  // This is the critical part - mark EVERYTHING from node_modules as external
  external: (id, parent, isResolved) => {
    // Never externalize our source files
    if (id.startsWith('./src') || id.startsWith('src/') || id.includes('/src/')) {
      return false;
    }
    
    // Always externalize node built-ins
    if (id.startsWith('node:') || ['fs', 'path', 'os', 'url', 'util', 'stream', 'buffer'].includes(id)) {
      return true;
    }
    
    // Always externalize anything from node_modules
    if (id.includes('node_modules')) {
      return true;
    }
    
    // Always externalize bare module specifiers (no relative path)
    if (!id.startsWith('.') && !id.startsWith('/')) {
      return true;
    }
    
    // Externalize specific problematic packages even if accessed via relative paths
    const problematicPackages = [
      '@babel/runtime',
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@mdx-js',
      '@mdxeditor',
      'micromark',
      'mdast',
      'acorn',
      'acorn-jsx',
      '@lexical',
      '@teamimpact',
      '@trussworks',
      '@devseed-ui',
      '@heroicons',
      'next-mdx-remote',
      'sugar-high',
      'gray-matter',
      'styled-components',
      'jotai'
    ];
    
    if (problematicPackages.some(pkg => id.includes(pkg))) {
      return true;
    }
    
    return false;
  },
};