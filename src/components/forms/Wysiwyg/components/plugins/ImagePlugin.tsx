import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { LexicalCommand } from 'lexical';
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import type { ImageNodePayload } from '../nodes/ImageNode';
import { $createImageNode } from '../nodes/ImageNode';

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImageNodePayload> =
  createCommand('INSERT_IMAGE_COMMAND');

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (node: ImageNodePayload) => {
        const imageNode = $createImageNode(node);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
