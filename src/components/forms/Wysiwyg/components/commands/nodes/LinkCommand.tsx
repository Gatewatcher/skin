import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useState } from 'react';

import { CommandButton } from '../../CommandButton';

export const LinkCommand = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const listener = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        const isRangeSelection = $isRangeSelection(selection);

        setIsDisabled(!isRangeSelection);

        if (isRangeSelection) {
          const anchor = selection.anchor.getNode();
          const parent = anchor.getParent();

          setIsActive($isLinkNode(anchor) || $isLinkNode(parent));
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) =>
      editorState.read(listener),
    );
  }, [editor]);

  const handleClick = () => {
    const url = prompt('url');

    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
  };

  return (
    <CommandButton
      disabled={isDisabled}
      isActive={isActive}
      name="Link"
      onClick={handleClick}
    />
  );
};
