//app/components/mdx-plugins/nodes/MapEditorNode.tsx

import React from "react";
import {
  DecoratorNode,
  NodeKey,
  SerializedLexicalNode,
  DOMExportOutput,
  DOMConversionMap,
  EditorConfig,
} from "lexical";

export type SerializedChartEditorNode = SerializedLexicalNode & {
  type: "Chart-editor-node";
  version: 1;
};

export type SerializedChartContextNode = SerializedLexicalNode & {
  type: "Chart-context-node";
  version: 1;
};
export class ChartEditorNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "Chart-editor-node";
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: ChartEditorNode): ChartEditorNode {
    return new ChartEditorNode(node.__key);
  }

  static importJSON(serializedNode: SerializedChartEditorNode): ChartEditorNode {
    return new ChartEditorNode();
  }

  exportJSON(): SerializedChartEditorNode {
    return {
      type: "Chart-editor-node",
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    return document.createElement("div");
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }

  decorate(): JSX.Element {
    return (
      <div className="border rounded p-2 bg-purple-100">
        Chart Block Placeholder
      </div>
    );
  }
}

export class ChartContextNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "Chart-context-node";
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: ChartContextNode): ChartContextNode {
    return new ChartContextNode(node.__key);
  }

  static importJSON(serializedNode: SerializedChartContextNode): ChartContextNode {
    return new ChartContextNode();
  }

  exportJSON(): SerializedChartContextNode {
    return {
      type: "Chart-context-node",
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    return document.createElement("div");
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }

  decorate(): JSX.Element {
    return (
      <div className="border rounded p-2 bg-purple-100">
        Chart Block Placeholder
      </div>
    );
  }
}
