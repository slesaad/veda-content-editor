import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-css-only';
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
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false,
      browser: true,
      dedupe: ['react', 'react-dom', 'styled-components'],
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto',
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
      presets: [
        ['@babel/preset-env', { 
          targets: { esmodules: true },
          bugfixes: true,
          modules: false
        }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: true
        }]
      ]
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
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
};