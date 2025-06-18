import type {
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import { Suspense } from 'react';

export type ImageNodePayload = {
  altText?: string;
  src: string;
  key?: NodeKey;
};

export type SerializedImageNode = Spread<
  ImageNodePayload,
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __altText: string;
  __src: string;

  constructor(src: string, altText?: string, key?: NodeKey) {
    super(key);

    this.__src = src;
    this.__altText = altText || 'image';
  }

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  createDOM(): HTMLElement {
    const img = document.createElement('img');

    img.src = this.__src;
    img.alt = this.__altText;

    return img;
  }

  updateDOM(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const node = $createImageNode(serializedNode);
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      altText: this.__altText,
      src: this.__src,
      version: 1,
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    return { element };
  }

  decorate(): JSX.Element {
    return (
      <Suspense>
        <img alt={this.__altText} src={this.__src} />
      </Suspense>
    );
  }
}

export function $createImageNode({
  src,
  altText,
  key,
}: ImageNodePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, altText, key));
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode;
}
