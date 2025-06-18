import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createQuoteNode, $isQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useState } from 'react';

import { CommandButton } from '../../../CommandButton';

export const QuoteCommand = () => {
  const [editor] = useLexicalComposerContext();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const listener = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        const isRangeSelection = $isRangeSelection(selection);

        if (isRangeSelection) {
          const anchor = selection.anchor.getNode();
          const parent = anchor.getParent();

          setIsActive($isQuoteNode(anchor) || $isQuoteNode(parent));
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) =>
      editorState.read(listener),
    );
  }, [editor]);

  const handleClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  };

  return (
    <CommandButton isActive={isActive} name="Quotes" onClick={handleClick} />
  );
};
