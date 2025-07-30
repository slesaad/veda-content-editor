import React from 'react';
import { renderToString } from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import { VEDAContentEditor } from '@slesaad/veda-content-editor';

console.log('Testing VEDA Content Editor v0.1.15...\n');

try {
    console.log('1. Import test:');
    console.log('   ✅ VEDAContentEditor imported successfully');
    console.log('   Type:', typeof VEDAContentEditor);
    
    console.log('\n2. Component creation test:');
    const element = React.createElement(
        BrowserRouter,
        {},
        React.createElement(VEDAContentEditor, {
            initialContent: '# Hello World',
            onChange: (content) => {},
            allAvailableDatasets: []
        })
    );
    console.log('   ✅ React element created successfully');
    
    console.log('\n3. Render test:');
    try {
        const html = renderToString(element);
        console.log('   ✅ Component rendered successfully!');
        console.log('   HTML length:', html.length, 'characters');
        console.log('   Contains MDX editor:', html.includes('mdx') || html.includes('editor'));
        
        console.log('\n🎉 SUCCESS: VEDAContentEditor is working properly!');
        console.log('The editor can be instantiated and rendered.');
        
    } catch (renderErr) {
        console.error('   ❌ Render failed:', renderErr.message);
        if (renderErr.stack) {
            console.error('\nStack trace:');
            console.error(renderErr.stack);
        }
    }
    
} catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
    }
}