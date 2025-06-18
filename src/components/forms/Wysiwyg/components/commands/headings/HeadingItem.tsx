import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection } from 'lexical';

import { Dropdown } from '@/skin/displays';
import type { HeadingTag } from '@/skin/typography/Title';

export type HeadingItemProps = {
  tag: HeadingTag;
};

export const HeadingItem = ({ tag }: HeadingItemProps) => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(tag));
    });
  };

  return (
    <Dropdown.Button onClick={handleClick}>{`Heading ${tag}`}</Dropdown.Button>
  );
};
