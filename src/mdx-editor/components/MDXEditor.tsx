import React, { useEffect, useRef, useState } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  toolbarPlugin,
  frontmatterPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  CodeToggle,
  jsxPlugin,
  InsertImage,
  imagePlugin,
  ListsToggle,
  linkPlugin,
  MDXEditor,
  directivesPlugin,
  linkDialogPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import { reserializedMdxContent } from "../utils/reserializeMDast";

import "@mdxeditor/editor/style.css";
import "./mdxeditor-overrides.scss";

import {
  InsertMapButton,
  InsertLineGraph,
  InsertTwoColumnButton,
  InsertSectionBreak,
} from "./ToolbarComponents";
import {
  jsxComponentDescriptors,
  CalloutDirectiveDescriptor,
} from "./ComponentDescriptors";
import { visit } from "unist-util-visit";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxJsx } from "micromark-extension-mdx-jsx";
import { mdxJsxFromMarkdown } from "mdast-util-mdx-jsx";
import { EditorState } from "@codemirror/state";

interface MDXEditorWrapperProps {
  markdown: string;
  onChange: (content: string) => void;
}

export function MDXEditorEnhanced({ markdown, onChange, previewMDAST }: any) {
  const editorRef = useRef(null);
  const [mdast, setMdast] = useState<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Check if editor is ready after mount
  useEffect(() => {
    const checkEditor = () => {
      if (editorRef.current) {
        setIsEditorReady(true);
      } else {
        // Retry after a short delay
        setTimeout(checkEditor, 100);
      }
    };

    checkEditor();
  }, []);

  const analyzeMdast = () => {
    try {
      const markdown =
        editorRef.current && (editorRef.current as any).getMarkdown();

      if (markdown) {
        const tree = fromMarkdown(markdown, {
          extensions: [mdxJsx()],
          mdastExtensions: [mdxJsxFromMarkdown()],
        });
        //mdxJsxFromMarkdown converts all contents of TwoCOlumn to 'code' blocks
        //Below re parses it and converts back to accepted MDX values.
        visit(tree, "mdxJsxFlowElement", (node) => {
          if (
            ["RightColumn", "LeftColumn"].includes(node.name as string) &&
            node.children.length > 0
          ) {
            // The round-trip of getMarkdown() -> fromMarkdown() can cause the rich content of the columns
            // to be stringified into a single text/code node. We need to re-parse that content.
            const innerMarkdown = (node.children[0] as any)?.value;
            // Only re-parse if innerMarkdown is a string. It can be undefined if the child is not a text/code node.
            if (typeof innerMarkdown === "string") {
              (node as any).children = fromMarkdown(innerMarkdown, {
                extensions: [mdxJsx()],
                mdastExtensions: [mdxJsxFromMarkdown()],
              }).children as any[];
            }
          }
        });
        setMdast(tree);

        previewMDAST(reserializedMdxContent(tree));
      }
    } catch (error) {
      console.error("Error analyzing MDAST:", error);
      alert("Error analyzing MDAST: " + (error as Error).message);
    }
  };

  return (
    <div className="h-[600px] border rounded-lg overflow-hidden">
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        onChange={(e) => {
          analyzeMdast();
          return onChange(e);
        }}
        contentEditableClassName="prose prose-lg max-w-none min-h-[500px] outline-none px-4 py-2"
        plugins={[
          // scrollytellingButtonPlugin(), // Temporarily disable custom plugin
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin(),
          frontmatterPlugin(),
          imagePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          jsxPlugin({
            jsxComponentDescriptors,
          }),
          directivesPlugin({
            directiveDescriptors: [CalloutDirectiveDescriptor],
          }),
          diffSourcePlugin({
            viewMode: 'rich-text',
            codeMirrorExtensions: [EditorState.readOnly.of(true)],
            diffMarkdown: '',
            readOnlyDiff: false,
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <div className="grid-column">
                    <div className="grid-row border-bottom-1px padding-y-1">
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <ListsToggle />
                      <BlockTypeSelect />
                      <CreateLink />
                      <CodeToggle />
                      <InsertImage />
                    </div>
                    <div className="grid-row padding-y-1">
                      <InsertMapButton />
                      <InsertLineGraph />
                      <InsertTwoColumnButton />
                      <InsertSectionBreak />
                    </div>
                  </div>
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
        className="w-full h-full"
      />
    </div>
  );
}
