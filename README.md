# @slesaad/veda-content-editor

A content editor component for VEDA projects.

## Installation

```bash
npm install @slesaad/veda-content-editor
```

## Usage

```jsx
import VEDAContentEditor from '@slesaad/veda-content-editor';
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

## License

MIT
