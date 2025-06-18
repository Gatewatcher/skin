import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent } from '@lexical/utils';
import type { LexicalNode, TextNode } from 'lexical';
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot } from 'lexical';
import { useEffect, useState } from 'react';

export const useElement = () => {
  const [editor] = useLexicalComposerContext();

  const [element, setElement] = useState<LexicalNode | TextNode | null>();

  useEffect(() => {
    editor.read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        let element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, e => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });

        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow();
        }

        setElement(element);
      }
    });
  }, [editor]);

  return { element };
};
