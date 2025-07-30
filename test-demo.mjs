import { spawn } from 'child_process';
import http from 'http';

console.log('Starting Vite dev server...');

// Start vite in the background
const vite = spawn('npm', ['run', 'dev'], {
  cwd: './demo-app',
  stdio: ['ignore', 'pipe', 'pipe']
});

let serverStarted = false;
let errors = [];

vite.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('Vite output:', output);
  
  if (output.includes('ready in') && !serverStarted) {
    serverStarted = true;
    console.log('\nServer started! Making request to http://localhost:3000...\n');
    
    // Give it a moment to fully start
    setTimeout(() => {
      http.get('http://localhost:3000', (res) => {
        let html = '';
        res.on('data', (chunk) => html += chunk);
        res.on('end', () => {
          console.log('=== HTML Response ===');
          console.log('Status:', res.statusCode);
          console.log('HTML Length:', html.length);
          
          // Check if it's the demo app
          if (html.includes('VEDA Content Editor Demo')) {
            console.log('✅ Demo app HTML loaded successfully!');
          } else {
            console.log('❌ Demo app HTML not found');
          }
          
          console.log('\n=== Checking for errors in console ===');
          if (errors.length > 0) {
            console.log('❌ Errors detected:');
            errors.forEach(err => console.log('  -', err));
          } else {
            console.log('✅ No errors detected in server output');
          }
          
          // Kill the server
          vite.kill();
          process.exit(errors.length > 0 ? 1 : 0);
        });
      }).on('error', (err) => {
        console.error('Request error:', err);
        vite.kill();
        process.exit(1);
      });
    }, 2000);
  }
});

vite.stderr.on('data', (data) => {
  const error = data.toString();
  console.error('Vite error:', error);
  errors.push(error);
  
  // Check for our specific errors
  if (error.includes('Cannot read properties of undefined') || 
      error.includes('reading \'prototype\'')) {
    console.log('❌ PROTOTYPE CHAIN ERROR DETECTED!');
  }
  
  if (error.includes('does not provide an export named')) {
    console.log('❌ ESM IMPORT ERROR DETECTED!');
  }
});

// Timeout after 30 seconds
setTimeout(() => {
  console.log('Timeout reached, killing server...');
  vite.kill();
  process.exit(1);
}, 30000);