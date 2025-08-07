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

export type SerializedMapEditorNode = SerializedLexicalNode & {
  type: "map-editor-node";
  version: 1;
};

export type SerializedMapContextNode = SerializedLexicalNode & {
  type: "map-context-node";
  version: 1;
};
export class MapEditorNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "map-editor-node";
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: MapEditorNode): MapEditorNode {
    return new MapEditorNode(node.__key);
  }

  static importJSON(serializedNode: SerializedMapEditorNode): MapEditorNode {
    return new MapEditorNode();
  }

  exportJSON(): SerializedMapEditorNode {
    return {
      type: "map-editor-node",
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
        Map Block Placeholder
      </div>
    );
  }
}

export class MapContextNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "map-context-node";
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: MapContextNode): MapContextNode {
    return new MapContextNode(node.__key);
  }

  static importJSON(serializedNode: SerializedMapContextNode): MapContextNode {
    return new MapContextNode();
  }

  exportJSON(): SerializedMapContextNode {
    return {
      type: "map-context-node",
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
        Map Block Placeholder
      </div>
    );
  }
}
