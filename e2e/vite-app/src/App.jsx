import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DevseedUiThemeProvider, theme } from '@devseed-ui/theme-provider';
import { VEDAContentEditor } from '@slesaad/veda-content-editor';

export default function App() {
  const [content, setContent] = useState('# Hello World');
  return (
    <BrowserRouter>
      <DevseedUiThemeProvider theme={theme.main}>
        <div style={{ height: '100vh', overflow: 'auto' }}>
          <VEDAContentEditor
            initialContent={content}
            onChange={setContent}
            allAvailableDatasets={[]}
          />
        </div>
      </DevseedUiThemeProvider>
    </BrowserRouter>
  );
} 