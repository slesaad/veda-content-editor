//app/components/mdx-plugins/nodes/DummyButtonNode.tsx

import React from 'react'
import { DecoratorNode, NodeKey, SerializedLexicalNode, DOMExportOutput, DOMConversionMap, EditorConfig } from 'lexical'

export type SerializedDummyButtonNode = SerializedLexicalNode & {
  type: 'dummy-button-node';
  version: 1;
};

export class DummyButtonNode extends DecoratorNode<JSX.Element> {
  static getType(): string { 
    return 'dummy-button-node' 
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: DummyButtonNode): DummyButtonNode {
    return new DummyButtonNode(node.__key)
  }

  static importJSON(serializedNode: SerializedDummyButtonNode): DummyButtonNode {
    return new DummyButtonNode()
  }

  exportJSON(): SerializedDummyButtonNode {
    return {
      type: 'dummy-button-node',
      version: 1
    }
  }

  createDOM(config: EditorConfig): HTMLElement { 
    return document.createElement('div') 
  }

  updateDOM(): false { 
    return false 
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }

  decorate(): JSX.Element { 
    return <div className="border rounded p-2 bg-purple-100">Scrollytelling Block Placeholder</div>
  }
}