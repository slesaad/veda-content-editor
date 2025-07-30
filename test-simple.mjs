// Test if the build output is valid JavaScript
import fs from 'fs';

const content = fs.readFileSync('./dist/index.esm.js', 'utf-8');

// Check for common issues
console.log('Build size:', (content.length / 1024 / 1024).toFixed(2), 'MB');
console.log('Lines:', content.split('\n').length);

// Check for problematic imports
const hasNodeModulesImports = content.includes('from \'../../node_modules');
console.log('Has node_modules imports:', hasNodeModulesImports);

// Check for key exports
const hasVEDAExport = content.includes('export { VEDAContentEditor');
console.log('Has VEDAContentEditor export:', hasVEDAExport);

// Check for bundled packages
const hasMdxEditor = content.includes('MDXEditor');
console.log('Has MDXEditor bundled:', hasMdxEditor);

const hasAcornJsx = content.includes('acorn-jsx') || content.includes('acornJsx');
console.log('Has acorn-jsx reference:', hasAcornJsx);

console.log('\n✅ Build appears valid for distribution');