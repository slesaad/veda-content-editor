// app/editor/page.tsx with source view tab
import React, {
  useState,
  useCallback,
  Suspense,
  useRef,
  useEffect,
} from "react";
import Providers from "./mdx-editor/others/providers";
import '@trussworks/react-uswds/lib/uswds.css';
import '@mdxeditor/editor/style.css';

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LegacyGlobalStyles } from "@teamimpact/veda-ui";
import { MDXEditorEnhanced } from "./mdx-editor/components/MDXEditor";
import { SimpleMDXPreview } from "./mdx-editor/components/MDXPreview";
import '@teamimpact/veda-ui/lib/main.css';

// Use a st    // src/main.js or src/main.ts

const EDITOR_KEY = "stable-mdx-editor-instance";
// const MDXEditorEnhanced = React.lazy(() =>
//   import("./mdx-editor/components/MDXEditor").then((module) => ({
//     default: module.MDXEditorEnhanced,
//   }))
// );
// const SimpleMDXPreview = React.lazy(() =>
//   import("./mdx-editor/components/MDXPreview").then((module) => ({
//     default: module.SimpleMDXPreview,
//   }))
// );

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
  const [selectedTab, setSelectedTab] = useState(0);
  const [editorMounted, setEditorMounted] = useState(false);
  const editorContainerRef = useRef(null);
  const handleContentChange = useCallback(
    (content: string) => {
      setMdxContent(content);
      if (onChange) {
        onChange(content);
      }
    },
    [onChange]
  );
  // Set editor as mounted once it's loaded
  useEffect(() => {
    setEditorMounted(true);
  }, []);

  // This function handles tab switching
  const handleTabChange = (index: number) => {
    setSelectedTab(index);

    // If switching to preview or source, hide editor
    if ((index === 1 || index === 2) && editorContainerRef.current) {
      const container = editorContainerRef.current as HTMLElement;
      container.style.visibility = "hidden";
      container.style.position = "absolute";
      container.style.pointerEvents = "none";
    } else if (index === 0 && editorContainerRef.current) {
      // If switching to editor, restore visibility
      const container = editorContainerRef.current as HTMLElement;
      container.style.visibility = "visible";
      container.style.position = "static";
      container.style.pointerEvents = "auto";
    }
  };

  return (
    <Providers datasets={allAvailableDatasets} vedaConfig={vedaConfig}>
    <div className="container mx-auto p-4 max-w-5xl min-h-screen bg-gray-50">
      {/* Custom Tab Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabChange(0)}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === 0
              ? "bg-blue-600 text-blue"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => handleTabChange(1)}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === 1
              ? "bg-blue-600 text-blue"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => handleTabChange(2)}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === 2
              ? "bg-blue-600 text-blue"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Source
        </button>
      </div>

      {/* Content Panel */}
      <div className="border rounded-lg bg-white shadow-lg h-[600px] overflow-hidden relative">
        {/* Editor Container - Always mounted but can be visually hidden */}
        <div
          ref={editorContainerRef}
          className={`h-full w-full ${selectedTab === 0 ? "" : "sr-only"}`}
          style={{
            visibility: selectedTab === 0 ? "visible" : "hidden",
            position: selectedTab === 0 ? "static" : "absolute",
          }}
        >
          {editorMounted && (
            <Suspense
              fallback={
                <div className="h-full flex items-center justify-center">
                  Loading editor...
                </div>
              }
            >
              <LexicalComposer initialConfig={initialConfig}>
                {/* THROWS ERROR */}
                 <MDXEditorEnhanced
                  key={EDITOR_KEY}
                  markdown={mdxContent}
                  onChange={handleContentChange}
                  editorMounted={editorMounted}
                  previewMDAST={setReserializedMdxContent}
                /> 
              </LexicalComposer>
            </Suspense>
          )}
        </div>

        {/* Preview Panel - Only mounted when active */}
        {selectedTab === 1 && (
          <div className="h-full w-full">
            <div className="prose max-w-none p-6 h-full overflow-auto">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    Loading MDX preview...
                  </div>
                }
              >
                {/* THROWS ERROR */}
                <SimpleMDXPreview source={reserializedMdxContent} vedaConfig={vedaConfig} />
              </Suspense>
            </div>
          </div>
        )}

        {/* Source View - Only mounted when active */}
        {selectedTab === 2 && (
          <div className="h-full w-full">
            <div className="p-4 h-full overflow-auto">
              <div className="bg-white-50 rounded-lg border border-gray-300 p-4 h-full font-mono text-sm overflow-auto">
                <pre className="whitespace-pre-wrap break-words">
                  {reserializedMdxContent}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </Providers>
  );
  // return<div>CAN YOU SEE ME TEST 3</div>
}

export { VEDAContentEditor };
