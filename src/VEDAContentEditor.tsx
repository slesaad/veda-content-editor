import React, {
  useState,
  useCallback,
  Suspense,
} from "react";
import Providers from "./mdx-editor/others/providers";
import '@trussworks/react-uswds/lib/uswds.css';
import '@mdxeditor/editor/style.css';

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MDXEditorEnhanced } from "./mdx-editor/components/MDXEditor";
import '@teamimpact/veda-ui/lib/main.css';

const EDITOR_KEY = "stable-mdx-editor-instance";

const initialContent = `# Welcome to the MDX Editor

This is a live editor where you can write and preview MDX content.

## Features

-   Live preview
-   Markdown formatting
-   Code blocks
-   Insert custom Map components

Try editing this content!
`;

export interface EditorPageProps {
  allAvailableDatasets?: any[];
  initialContent?: string;
  onChange?: (content: string) => void;
  className?: string;
  vedaConfig?: {
    envMapboxToken?: string;
    envApiStacEndpoint?: string;
    envApiRasterEndpoint?: string;
  };
}

export default function VEDAContentEditor({
  allAvailableDatasets,
  initialContent: customInitialContent,
  onChange,
  className,
  vedaConfig,
}: EditorPageProps) {
  const initialConfig = {
    namespace: "MyEditor", // Unique namespace for this editor instance
    onError: (error: Error) => {
      console.error("Lexical editor error:", error);
    },
    // ... other Lexical configuration options if needed
  };
  const [mdxContent, setMdxContent] = useState(
    customInitialContent || initialContent
  );
  const [reserializedMdxContent, setReserializedMdxContent] = useState(
    customInitialContent || initialContent
  );
  const handleContentChange = useCallback(
    (content: string) => {
      setMdxContent(content);
      if (onChange) {
        onChange(content);
      }
    },
    [onChange]
  );

  return (
    <Providers datasets={allAvailableDatasets} vedaConfig={vedaConfig}>
      <div className={`border rounded-lg bg-white shadow-lg h-[600px] overflow-hidden ${className || ''}`}>
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center">
              Loading editor...
            </div>
          }
        >
          <LexicalComposer initialConfig={initialConfig}>
            <MDXEditorEnhanced
              key={EDITOR_KEY}
              markdown={mdxContent}
              onChange={handleContentChange}
              previewMDAST={setReserializedMdxContent}
            /> 
          </LexicalComposer>
        </Suspense>
      </div>
    </Providers>
  );
}

export { VEDAContentEditor };
