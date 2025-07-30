import { ElementNode, LexicalNode, NodeKey, SerializedElementNode, DOMConversionMap, DOMConversionOutput } from 'lexical'

export type SerializedScrollytellingNode = SerializedElementNode & {
  type: 'scrollytelling';
  version: 1;
};

export class ScrollytellingNode extends ElementNode {
  static getType(): string {
    return 'scrollytelling'
  }

  static clone(node: ScrollytellingNode): ScrollytellingNode {
    return new ScrollytellingNode(node.__key)
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(): HTMLElement {
    const element = document.createElement('div')
    element.className = 'scrollytelling-block'
    return element
  }

  updateDOM(): boolean {
    return false
  }

  static importJSON(serializedNode: SerializedScrollytellingNode): ScrollytellingNode {
    const node = new ScrollytellingNode()
    return node
  }

  exportJSON(): SerializedScrollytellingNode {
    return {
      ...super.exportJSON(),
      type: 'scrollytelling',
      version: 1,
    }
  }

  static importDOM(): DOMConversionMap | null {
    return {};
  }
}

export function $createScrollytellingNode(): ScrollytellingNode {
  return new ScrollytellingNode()
}

export function $isScrollytellingNode(node: LexicalNode | null | undefined): node is ScrollytellingNode {
  return node instanceof ScrollytellingNode
} 