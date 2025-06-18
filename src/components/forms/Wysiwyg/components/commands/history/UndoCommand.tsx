import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  UNDO_COMMAND,
} from 'lexical';
import { useEffect, useState } from 'react';

import { CommandButton } from '../../CommandButton';

export const UndoCommand = () => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    editor.registerCommand<boolean>(
      CAN_UNDO_COMMAND,
      payload => {
        setCanUndo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  const handleClick = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  return (
    <CommandButton disabled={!canUndo} name="Undo" onClick={handleClick} />
  );
};
