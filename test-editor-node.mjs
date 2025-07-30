import React from 'react';
import { renderToString } from 'react-dom/server';

console.log('Testing VEDA Content Editor instantiation...\n');

try {
    // Import the built module
    const { VEDAContentEditor } = await import('./dist/index.esm.js');
    
    console.log('✅ Module imported successfully');
    console.log('VEDAContentEditor type:', typeof VEDAContentEditor);
    
    // Try to create an element
    const element = React.createElement(VEDAContentEditor, {
        initialContent: '# Test',
        onChange: () => {},
        allAvailableDatasets: []
    });
    
    console.log('✅ React element created successfully');
    
    // Try to render to string (basic instantiation test)
    try {
        const html = renderToString(element);
        console.log('✅ Component rendered to string (length:', html.length, 'chars)');
        console.log('\n🎉 VEDAContentEditor is working and can be instantiated!');
    } catch (renderError) {
        console.error('❌ Render error:', renderError.message);
        console.log('\nThe component imports correctly but has runtime issues.');
    }
    
} catch (error) {
    console.error('❌ Import/instantiation error:', error.message);
    console.error('\nStack trace:', error.stack);
}