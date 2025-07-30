import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-css-only';
import postcss from 'rollup-plugin-postcss';
// Removed unused alias plugin
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
      compact: false,
      generatedCode: {
        constBindings: true,
      },
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      compact: false,
      generatedCode: {
        constBindings: true,
      },
    },
  ],
  plugins: [
    peerDepsExternal(),
    // Remove alias plugin for acorn-jsx - let commonjs handle it
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
      preferBuiltins: false,
      browser: true,
      dedupe: ['react', 'react-dom', 'styled-components'],
      mainFields: ['module', 'main', 'browser'],
      modulesOnly: false,
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'preferred',
      transformMixedEsModules: true,
      esmExternals: false,
      defaultIsModuleExports: true,
      // Handle packages that don't export properly
      namedExports: {
        'acorn-jsx': ['default'],
        'micromark-extension-mdx-jsx': ['mdxJsx'],
        'mdast-util-mdx-jsx': ['mdxJsxFromMarkdown', 'mdxJsxToMarkdown']
      },
      ignoreDynamicRequires: true,
    }),
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: 'dist',
      jsx: 'react-jsx',
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelrc: true,
      configFile: true,
    }),
    json(),
    postcss({
      extract: 'styles.css',
      minimize: false,
      sourceMap: true,
      use: ['sass'],
      extensions: ['.css', '.scss', '.sass'],
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'os',
    /@babel\/runtime/,
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
};