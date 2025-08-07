import React, { Suspense, useState } from 'react'
import { VEDAContentEditor } from '@slesaad/veda-content-editor'
// import '@slesaad/veda-content-editor/dist/styles.css';
import '@mdxeditor/editor/style.css';


const initialContent = `# Hello from VEDA Editor

This is a test of the VEDA content editor.

## Features

- **Bold text**
- *Italic text*
- Code blocks
- Lists
- And more!

\`\`\`javascript
console.log('Hello, VEDA!')
\`\`\`
`

function App() {
  const [content, setContent] = useState(initialContent)
  const [error, setError] = useState(null)

  console.log('App component rendering...')
  // const VEDAContentEditor = React.lazy(() => import('@slesaad/veda-content-editor').then(module => ({ default: module.VEDAContentEditor })));



  try {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>VEDA Content Editor Demo</h1>

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '4px'
          }}>
            <strong>Error:</strong> {error.message}
            <pre style={{ fontSize: '12px', marginTop: '10px' }}>
              {error.stack}
            </pre>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <p>Testing VEDA Content Editor v0.1.16</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '4px', minHeight: '400px' }}>
          <VEDAContentEditor
            value={initialContent}
            onChange={(newContent) => {
              console.log('Content changed:', newContent)
              setContent(newContent)
            }}
            placeholder="Start typing..."
          />

        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Current Content:</h3>
          <pre style={{
            background: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {content}
          </pre>
        </div>
      </div>
    )
  } catch (err) {
    console.error('Error rendering editor:', err)
    setError(err)
    return (
      <div style={{ padding: '20px' }}>
        <h1>VEDA Content Editor Demo - Error</h1>
        <div style={{
          background: '#fee',
          border: '1px solid #fcc',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <strong>Runtime Error:</strong> {err.message}
          <pre style={{ fontSize: '12px', marginTop: '10px' }}>
            {err.stack}
          </pre>
        </div>
      </div>
    )
  }
}

export default App