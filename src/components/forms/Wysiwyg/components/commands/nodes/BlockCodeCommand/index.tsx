import { $createCodeNode, $isCodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useState } from 'react';

import { CommandButton } from '../../../CommandButton';

export const BlockCodeCommand = () => {
  const [editor] = useLexicalComposerContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const listener = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode();
          const parent = node.getParent();

          setIsActive($isCodeNode(node) || $isCodeNode(parent));
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(listener);
    });
  }, [editor]);

  const handleClick = () => {
    editor.update(() => {
      let selection = $getSelection();

      if (!selection !== null) {
        if (selection?.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode());
        } else {
          const textContent = selection?.getTextContent();
          const codeNode = $createCodeNode();
          selection?.insertNodes([codeNode]);
          selection = $getSelection();

          if ($isRangeSelection(selection) && textContent) {
            selection.insertRawText(textContent);
          }
        }
      }
    });
  };

  return (
    <CommandButton
      isActive={isActive}
      name="CsCodeBlock"
      onClick={handleClick}
    />
  );
};
