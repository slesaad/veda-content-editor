import { ElementNode, NodeKey, SerializedElementNode, DOMConversionMap, EditorConfig } from 'lexical';

//BREAD CRUMBS:
// Need to reserialize the components into <block<prose> structure
// You can do so either through string manipulation, but want to keept hat in the back pocket for the time being
// 
// Should go through the lexical node functionality and create groups based off how that is handled. 

export type SerializedBlockNode = SerializedElementNode & {
  type: 'block';
  version: 1;
};

export type SerializedProseNode = SerializedElementNode & {
  type: 'prose';
  version: 1;
};

export class BlockNode extends ElementNode {
  static getType(): string {
    return 'block';
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: BlockNode): BlockNode {
    return new BlockNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('div');
    dom.classList.add('block-container'); // Add any necessary styling
    return dom;
  }

  updateDOM(prevNode: BlockNode, dom: HTMLElement, config: EditorConfig): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedBlockNode): BlockNode {
    return new BlockNode();
  }

  exportJSON(): SerializedBlockNode {
    return {
      ...super.exportJSON(),
      type: 'block',
      version: 1,
    };
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }
}

export class ProseNode extends ElementNode {
  static getType(): string {
    return 'prose';
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: ProseNode): ProseNode {
    return new ProseNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('div');
    dom.classList.add('prose-content'); // Add any necessary styling
    return dom;
  }

  updateDOM(prevNode: ProseNode, dom: HTMLElement, config: EditorConfig): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedProseNode): ProseNode {
    return new ProseNode();
  }

  exportJSON(): SerializedProseNode {
    return {
      ...super.exportJSON(),
      type: 'prose',
      version: 1,
    };
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }
}

export function $createBlockNode(): BlockNode {
  return new BlockNode();
}

export function $createProseNode(): ProseNode {
  return new ProseNode();
}