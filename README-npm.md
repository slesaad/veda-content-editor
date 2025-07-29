# @veda/content-editor

A React-based MDX editor component for the VEDA platform.

## Installation

```bash
npm install @veda/content-editor
```

## Usage

```jsx
import React, { useState } from 'react';
import { VEDAContentEditor } from '@veda/content-editor';
import '@veda/content-editor/dist/styles.css'; // Import the styles

function App() {
  const [content, setContent] = useState('# Hello World\n\nStart editing!');

  const handleChange = (newContent) => {
    console.log('Content changed:', newContent);
    setContent(newContent);
  };

  return (
    <div style={{ height: '100vh' }}>
      <VEDAContentEditor
        initialContent={content}
        onChange={handleChange}
        allAvailableDatasets={[]} // Optional: provide available datasets
      />
    </div>
  );
}

export default App;
```

## Props

- `initialContent` (string): Initial MDX content to display in the editor
- `onChange` (function): Callback function called when content changes
- `allAvailableDatasets` (array): Optional array of available datasets for map components
- `className` (string): Optional CSS class name for styling

## Features

- MDX editing with live preview
- Support for custom components (Maps, Charts, etc.)
- Markdown shortcuts and toolbar
- Code syntax highlighting
- Image support
- Link management

## Development

To build the library:

```bash
npm run build:lib
```

## License

MIT