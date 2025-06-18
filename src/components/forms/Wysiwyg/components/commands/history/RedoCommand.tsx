import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
} from 'lexical';
import { useEffect, useState } from 'react';

import { CommandButton } from '../../CommandButton';

export const RedoCommand = () => {
  const [editor] = useLexicalComposerContext();
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    editor.registerCommand<boolean>(
      CAN_REDO_COMMAND,
      payload => {
        setCanRedo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  const handleClick = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <CommandButton disabled={!canRedo} name="Redo" onClick={handleClick} />
  );
};
