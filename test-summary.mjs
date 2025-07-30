import fs from 'fs';
import { spawn } from 'child_process';

console.log('=== VEDA Content Editor v0.1.16 - Final Summary ===\n');

// 1. Check build output
console.log('1. Build Analysis:');
const esmContent = fs.readFileSync('./dist/index.esm.js', 'utf-8');
console.log(`   - Build size: ${esmContent.length.toLocaleString()} characters`);
console.log(`   - Build lines: ${esmContent.split('\n').length.toLocaleString()} lines`);

// Check for inline helpers (prototype chain error)
const inlineHelpers = [
  '_inheritsLoose',
  '_inherits(',
  '_createClass(',
  '_classCallCheck('
];

let helperCount = 0;
inlineHelpers.forEach(helper => {
  const count = (esmContent.match(new RegExp(helper.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count > 0) {
    console.log(`   - Found ${count} instances of ${helper}`);
    helperCount += count;
  }
});

console.log(`\n   ${helperCount > 0 ? '❌' : '✅'} Prototype chain error: ${helperCount > 0 ? 'STILL PRESENT' : 'Fixed'}`);

// Check for problematic imports
const hasAcornImport = esmContent.includes("from 'acorn-jsx'") || esmContent.includes('from "acorn-jsx"');
console.log(`   ${hasAcornImport ? '❌' : '✅'} ESM import error (acorn-jsx): ${hasAcornImport ? 'STILL PRESENT' : 'Fixed'}`);

// Check CommonJS interop
const hasCommonJSFix = esmContent.includes('_teamimpact_veda_ui');
console.log(`   ${hasCommonJSFix ? '✅' : '❌'} CommonJS interop applied: ${hasCommonJSFix ? 'Yes' : 'No'}`);

// 2. Demo app test
console.log('\n2. Demo App Test:');
console.log('   Starting Vite server...');

const vite = spawn('npm', ['run', 'dev'], {
  cwd: './demo-app',
  stdio: ['ignore', 'pipe', 'pipe']
});

let serverReady = false;
let runtimeErrors = [];

vite.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('ready in') && !serverReady) {
    serverReady = true;
    
    // Wait a bit then make a request
    setTimeout(async () => {
      try {
        // Import http dynamically
        const http = await import('http');
        
        http.default.get('http://localhost:3000/', (res) => {
          console.log(`   - Server response: ${res.statusCode}`);
          
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            const hasAppTitle = body.includes('VEDA Content Editor Demo');
            console.log(`   - Demo app HTML: ${hasAppTitle ? '✅ Loaded' : '❌ Not found'}`);
            
            // Final summary
            console.log('\n=== FINAL RESULTS ===');
            console.log('Build Issues:');
            if (helperCount > 0) {
              console.log('❌ Prototype chain error: NOT FIXED');
              console.log('   - Babel runtime transform not working on bundled code');
              console.log('   - Will cause "Cannot read properties of undefined (reading \'prototype\')"');
            }
            
            if (!hasAcornImport) {
              console.log('✅ ESM import error: FIXED (acorn-jsx bundled)');
            }
            
            if (runtimeErrors.length > 0) {
              console.log('\nRuntime Issues:');
              runtimeErrors.forEach(err => console.log('❌', err));
            }
            
            console.log('\n=== CONCLUSION ===');
            if (helperCount > 0 || runtimeErrors.length > 0) {
              console.log('❌ Version 0.1.16 still has critical errors that prevent it from working.');
              console.log('The prototype chain error remains unfixed.');
            } else {
              console.log('✅ Version 0.1.16 appears to be working!');
            }
            
            vite.kill();
            process.exit(helperCount > 0 || runtimeErrors.length > 0 ? 1 : 0);
          });
        }).on('error', (err) => {
          console.error('Request error:', err);
          vite.kill();
          process.exit(1);
        });
      } catch (err) {
        console.error('Error:', err);
        vite.kill();
        process.exit(1);
      }
    }, 3000);
  }
});

vite.stderr.on('data', (data) => {
  const error = data.toString();
  
  if (error.includes('does not provide an export named')) {
    runtimeErrors.push('ESM import error detected at runtime');
  }
  if (error.includes('Cannot read properties of undefined')) {
    runtimeErrors.push('Prototype chain error detected at runtime');
  }
});

// Timeout
setTimeout(() => {
  console.log('Test timed out');
  vite.kill();
  process.exit(1);
}, 20000);