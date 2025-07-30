import { VEDAContentEditor } from './dist/index.esm.js';

console.log('=== Direct Import Test ===');
console.log('VEDAContentEditor type:', typeof VEDAContentEditor);
console.log('VEDAContentEditor:', VEDAContentEditor);

// Check if it's a valid React component
if (VEDAContentEditor) {
  console.log('Is function?', typeof VEDAContentEditor === 'function');
  console.log('Has prototype?', VEDAContentEditor.prototype !== undefined);
  
  // Try to see its structure
  console.log('\nComponent keys:', Object.keys(VEDAContentEditor));
  console.log('Component name:', VEDAContentEditor.name || 'No name');
}

// Try to instantiate
try {
  console.log('\nTrying to create element...');
  const React = await import('react');
  const element = React.createElement(VEDAContentEditor, { value: 'test' });
  console.log('✅ Element created successfully!');
  console.log('Element type:', element.type);
} catch (err) {
  console.log('❌ Error creating element:', err.message);
  console.log('Stack:', err.stack);
}