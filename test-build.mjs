import { VEDAContentEditor } from './dist/index.esm.js';

console.log('Testing v0.1.12 build...');
console.log('VEDAContentEditor type:', typeof VEDAContentEditor);
console.log('VEDAContentEditor is function?', typeof VEDAContentEditor === 'function');

// Check if we can import without errors
try {
  if (VEDAContentEditor) {
    console.log('✅ VEDAContentEditor exported successfully');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}

// Test dynamic import
import('./dist/index.esm.js').then(module => {
  console.log('Dynamic import successful');
  console.log('Exports:', Object.keys(module));
}).catch(err => {
  console.error('Dynamic import failed:', err);
});