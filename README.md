# @slesaad/veda-content-editor

A content editor component for VEDA projects.

## Installation

```bash
npm install @slesaad/veda-content-editor
```

## Usage

```jsx
import { VEDAContentEditor } from '@slesaad/veda-content-editor';
import '@slesaad/veda-content-editor/dist/styles.css';

function App() {
  const handleChange = (content) => {
    console.log('Content changed:', content);
  };

  return (
    <VEDAContentEditor
      initialContent="# Hello World"
      onChange={handleChange}
      allAvailableDatasets={[]} // Pass your datasets here
    />
  );
}
```

## Important Notes

### Version 0.1.7 - Critical Build Fixes
This version fixes the critical runtime errors that made v0.1.0-0.1.6 unusable:

**Fixed Issues:**
1. **Babel Runtime Error**: Fixed "Cannot read properties of undefined (reading 'prototype')" by properly configuring Babel to use external runtime helpers instead of inline helpers
2. **Module Import Error**: Fixed "The requested module 'acorn-jsx' does not provide an export named 'default'" by correctly handling CommonJS modules in the build process

**Technical Changes:**
- Updated `.babelrc` with proper `@babel/plugin-transform-runtime` configuration
- Fixed `rollup.config.js` to handle CommonJS modules correctly with `requireReturnsDefault: 'preferred'`
- Ensured `@babel/runtime` is marked as external dependency to prevent bundling
- Removed problematic alias configuration for acorn-jsx
- The package is now fully functional and can be imported without errors

### Version 0.1.6
- Attempted to fix acorn-jsx issue but both errors persisted
- Added missing dependencies but build configuration was still incorrect

### Version 0.1.5
- Fixed babel class inheritance helpers issue (no more `__proto__` errors)
- Configured proper ESM output with babel runtime
- Removed dangerous eval() usage for security
- Added @babel/runtime as dependency
- All fixes from previous versions included

### Version 0.1.4
- Fixed CSS handling with PostCSS for better build system compatibility
- Corrected import syntax in documentation (named export)
- Added troubleshooting guide
- All fixes from previous versions included

### Version 0.1.3
- Enhanced build output formatting with explicit non-minification settings
- Improved code readability in bundled output
- All fixes from 0.1.2 included

### Version 0.1.2
- Fixed build configuration issues from 0.1.0
- Added proper babel transpilation for class inheritance
- Improved React version compatibility (supports React 16.8+, 17, and 18)
- Removed minification for easier debugging

### Peer Dependencies
This package requires:
- React (>=16.8.0 || ^17.0.0 || ^18.0.0)
- React DOM (>=16.8.0 || ^17.0.0 || ^18.0.0)

Some sub-dependencies may have stricter React version requirements, but the package should work with React 16.8+ and above.

## Props

- `initialContent` (string): Initial markdown content
- `onChange` (function): Callback when content changes
- `allAvailableDatasets` (array): Available datasets for the editor
- `className` (string): Additional CSS classes

## Development

To run the development server:

```bash
npm install
npm start
```

To build the library:

```bash
npm run build:lib
```

## Troubleshooting

### CSS Import Issues
Make sure to import the styles in your application:
```jsx
import '@slesaad/veda-content-editor/dist/styles.css';
```

### Build System Compatibility
If you're using Create React App, Vite, or Next.js, the package should work out of the box. For custom webpack configurations, you may need to ensure CSS imports from node_modules are properly handled.

### React Version Conflicts
While the package supports React 16.8+, some sub-dependencies may have stricter requirements. If you encounter version conflicts, try:
1. Using React 18 (recommended)
2. Adding resolutions/overrides in your package.json

## License

MIT
