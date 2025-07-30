import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';
import path from 'path';

const packageJson = JSON.parse(readFileSync('./package-lib.json', 'utf-8'));

// Custom plugin to fix imports
const fixImports = () => ({
  name: 'fix-imports',
  renderChunk(code) {
    // Fix CommonJS interop for problematic packages
    const commonjsPackages = ['@teamimpact/veda-ui', '@trussworks/react-uswds'];
    let fixed = code;
    
    commonjsPackages.forEach(pkg => {
      const escapedPkg = pkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      fixed = fixed.replace(
        new RegExp(`import \\{([^}]+)\\} from '${escapedPkg}'`, 'g'),
      (match, imports) => {
        // Handle import aliases like "Image as Image$1"
        const cleanedImports = imports.replace(/(\w+) as (\w+)/g, '$1');
        const aliasMapping = {};
        imports.match(/(\w+) as (\w+)/g)?.forEach(alias => {
          const [original, renamed] = alias.split(' as ');
          aliasMapping[original] = renamed;
        });
        
        // Build the destructuring with aliases
        const destructuring = imports.split(',').map(imp => {
          const trimmed = imp.trim();
          if (trimmed.includes(' as ')) {
            const [original, renamed] = trimmed.split(' as ').map(s => s.trim());
            return `${original}: ${renamed}`;
          }
          return trimmed;
        }).join(', ');
        
        const varName = pkg.replace(/[@/-]/g, '_');
        return `import ${varName} from '${pkg}';\nconst {${destructuring}} = ${varName}`;
      });
    });
    
    // Replace relative node_modules imports with proper module imports
    fixed = fixed.replace(
      /from ['"]\.\.\/\.\.\/node_modules\/(@mdxeditor\/editor\/dist\/[^'"]+)['"]/g,
      'from "$1"'
    );
    
    return fixed;
  }
});

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
    // Fix imports for CommonJS interop
    fixImports(),
    
    // Automatically externalize peer dependencies
    // DISABLED: We need to bundle some dependencies
    // peerDepsExternal(),
    
    // Resolve node modules for bundling
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false,
      browser: true,
      dedupe: ['react', 'react-dom'],
      // Force resolution of mdxeditor internal modules
      mainFields: ['module', 'main'],
    }),
    
    // Convert CommonJS modules
    commonjs({
      // Process CommonJS so ESM import errors (e.g. acorn-jsx) disappear
      // Include both our source and node_modules – then explicitly list
      // dynamic targets we know we need (acorn-jsx)
      include: [/node_modules/, 'src/**/*'],
      transformMixedEsModules: true,
      requireReturnsDefault: 'preferred',
      defaultIsModuleExports: true,
      dynamicRequireTargets: [
        'node_modules/acorn-jsx/**/*.js'
      ],
      // Handle CommonJS named exports for veda-ui
      namedExports: {
        '@teamimpact/veda-ui': ['ReactQueryProvider', 'VedaUIProvider', 'DevseedUiThemeProvider', 'MapBlock', 'LegacyGlobalStyles', 'Chapter', 'Image', 'Figure', 'Caption', 'Prose', 'Block']
      }
    }),
    
    // Compile TypeScript
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: 'dist',
      jsx: 'react-jsx',
    }),
    
    // Transform with Babel to use runtime helpers everywhere (including bundled node_modules)
    babel({
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // Don't exclude anything - process all code
      include: [
        'src/**/*',
        'node_modules/@mdxeditor/**/*',
        'node_modules/@mdx-js/**/*',
        'node_modules/acorn-jsx/**/*'
      ],
      babelrc: false,
      configFile: false,
      presets: [
        ['@babel/preset-env', {
          targets: { esmodules: true },
          modules: false
        }]
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
  
  // External only the absolute minimum - React and peer dependencies
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    '@babel/runtime',
    '@teamimpact/veda-ui',
    '@trussworks/react-uswds',
    '@devseed-ui/theme-provider',
    '@heroicons/react',
    'next-mdx-remote',
    'styled-components',
    'jotai',
    'react-router-dom'
  ],
};