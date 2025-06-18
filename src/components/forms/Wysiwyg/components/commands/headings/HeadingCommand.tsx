import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useState } from 'react';

import { Dropdown } from '@/skin/displays';
import { HEADING_TAGS } from '@/skin/typography/Title/constants';

import { CommandButton } from '../../CommandButton';
import { HeadingItem } from './HeadingItem';
import { ParagraphCommand } from './ParagraphCommand';

export const HeadingCommand = () => {
  const [isActive, setIsActive] = useState(false);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const updateButtonState = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode();
          const parent = node.getParent();

          setIsActive($isHeadingNode(node) || $isHeadingNode(parent));
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updateButtonState);
    });
  }, [editor]);

  return (
    <Dropdown
      content={
        <Dropdown.Content>
          <ParagraphCommand />
          {HEADING_TAGS.map(tag => (
            <HeadingItem key={tag} tag={tag} />
          ))}
        </Dropdown.Content>
      }
      placement="bottom-start"
      triggerOn="click"
    >
      <CommandButton isActive={isActive} name="Title" />
    </Dropdown>
  );
};
