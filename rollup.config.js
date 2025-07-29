import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package-lib.json', 'utf-8'));

export default {
  input: 'src/lib/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false,
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: 'dist',
      jsx: 'react-jsx',
    }),
    json(),
    css({ output: 'styles.css' }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
};