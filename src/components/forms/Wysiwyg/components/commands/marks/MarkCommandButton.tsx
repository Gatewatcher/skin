import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { TextFormatType } from 'lexical';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';

import type { CommandButtonProps } from '../../CommandButton';
import { CommandButton } from '../../CommandButton';

export type MarkCommandButtonProps = Omit<
  CommandButtonProps,
  'isActive' | 'onClick'
> & {
  format: TextFormatType;
};

export const MarkCommandButton = ({
  format,
  ...rest
}: MarkCommandButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const updateButtonState = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsActive(selection.hasFormat(format));
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updateButtonState);
    });
  }, [editor, format]);

  const handleClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return <CommandButton isActive={isActive} onClick={handleClick} {...rest} />;
};
