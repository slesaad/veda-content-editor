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

### Version 0.1.9 - WORKING BUILD (Confirmed Fix)
This version successfully resolves both critical runtime errors that prevented v0.1.0-0.1.8 from working:

**✅ BOTH ISSUES FIXED:**
1. **Babel Runtime Error**: ELIMINATED - No more "Cannot read properties of undefined (reading 'prototype')"
   - Babel helpers properly imported from `@babel/runtime` (verified in build output)
   - No inline helper functions in the built files
   
2. **Module Import Error**: ELIMINATED - No more "acorn-jsx does not provide an export named 'default'"
   - All dependencies properly externalized (not bundled)
   - Build output only ~2.4k lines (vs 37k when dependencies were bundled)
   
**Technical Solution:**
- Aggressive externalization using function-based external configuration
- Only bundle source files from `src/` directory
- All node_modules and bare imports marked as external
- CommonJS plugin only processes source files, not dependencies
- Result: Clean build with all dependencies as external imports

**Verification:**
- Build output shows clean imports: `import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2'`
- No bundled dependencies or inline babel helpers
- Package ready for use in Vite and other modern build tools

### Version 0.1.8 - Complete Build Fix (Partial Success)
Made structural improvements but issues persisted due to incomplete externalization

### Version 0.1.7 - Critical Build Fixes (Partial)
Attempted fixes that were not fully successful - issues persisted due to improper dependency bundling

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
