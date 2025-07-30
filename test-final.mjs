import fs from 'fs';

console.log('=== VEDA Content Editor v0.1.16 - Final Test ===\n');

const esmContent = fs.readFileSync('./dist/index.esm.js', 'utf-8');

// Test 1: Check for the two critical errors
console.log('1. Checking for Critical Errors:');

// Prototype chain error
const hasInlineHelpers = esmContent.includes('function _inheritsLoose') || 
                        esmContent.includes('function _inherits(');
console.log(`   ${hasInlineHelpers ? '❌' : '✅'} Prototype chain error: ${hasInlineHelpers ? 'STILL PRESENT' : 'Fixed'}`);

if (hasInlineHelpers) {
    const helperCount = (esmContent.match(/_inheritsLoose|_inherits\(/g) || []).length;
    console.log(`      Found ${helperCount} instances of inline Babel helpers`);
}

// ESM import error
const hasAcornImport = esmContent.includes("from 'acorn-jsx'") || 
                      esmContent.includes('from "acorn-jsx"');
console.log(`   ${hasAcornImport ? '❌' : '✅'} ESM import error: ${hasAcornImport ? 'STILL PRESENT' : 'Fixed'}`);

// Test 2: Check what WAS fixed
console.log('\n2. What HAS been fixed:');

const hasMdxEditorBundled = !esmContent.includes("from '@mdxeditor");
console.log(`   ✅ MDXEditor bundled: ${hasMdxEditorBundled}`);

const hasNodeModulesImports = esmContent.includes('../../node_modules');
console.log(`   ✅ No node_modules imports: ${!hasNodeModulesImports}`);

const hasCommonJSFix = esmContent.includes('_teamimpact_veda_ui');
console.log(`   ✅ CommonJS interop fixed: ${hasCommonJSFix}`);

// Test 3: Summary
console.log('\n3. Summary:');
if (hasInlineHelpers) {
    console.log('   ❌ The prototype chain error is NOT fixed');
    console.log('   - Babel runtime transform is not working on bundled code');
    console.log('   - This will cause "Cannot read properties of undefined" in Vite');
}

if (!hasAcornImport) {
    console.log('   ✅ The acorn-jsx ESM import error IS fixed');
}

console.log('\n=== Conclusion ===');
if (hasInlineHelpers) {
    console.log('❌ Version 0.1.16 still has the critical prototype chain error.');
    console.log('The build will fail in Vite with the same error as before.');
} else {
    console.log('✅ Version 0.1.16 is ready for demo!');
}