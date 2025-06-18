import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from 'lexical';

import { Dropdown } from '@/skin/displays';

export const ParagraphCommand = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  return <Dropdown.Button onClick={handleClick}>Normal</Dropdown.Button>;
};
