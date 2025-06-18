import type { ListType as LexicalListType } from '@lexical/list';
import {
  $isListItemNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeOfType } from '@lexical/utils';
import type { LexicalCommand } from 'lexical';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useState } from 'react';

import type { IconName } from '@/skin/displays';

import { formatToParagraph } from '../../../utils';
import { CommandButton } from '../../CommandButton';

type ListType = 'ul' | 'ol' | 'check';
export const LIST_PARAMS_BY_TYPE: Record<
  ListType,
  {
    icon: IconName;
    command: LexicalCommand<void>;
    type: LexicalListType;
  }
> = {
  check: {
    icon: 'ListChecked',
    command: INSERT_CHECK_LIST_COMMAND,
    type: 'check',
  },
  ul: {
    icon: 'ListBulleted',
    command: INSERT_UNORDERED_LIST_COMMAND,
    type: 'bullet',
  },
  ol: {
    icon: 'ListNumbered',
    command: INSERT_ORDERED_LIST_COMMAND,
    type: 'number',
  },
};

export type ListCommandProps = {
  type: ListType;
};

export const ListCommand = ({ type }: ListCommandProps) => {
  const options = LIST_PARAMS_BY_TYPE[type];

  const [editor] = useLexicalComposerContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const listener = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchor = selection.anchor.getNode();
          const parent = anchor.getParent();

          const isListNode = $isListItemNode(anchor) || $isListItemNode(parent);

          if (isListNode) {
            const parentList = $getNearestNodeOfType<ListNode>(
              anchor,
              ListNode,
            );

            const type = parentList?.getListType();
            setIsActive(isListNode && type === options.type);
          } else {
            setIsActive(false);
          }
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(listener);
    });
  });

  const handleClick = () => {
    if (isActive) {
      formatToParagraph(editor);
    } else {
      editor.dispatchCommand(options.command, undefined);
    }
  };

  return (
    <CommandButton
      isActive={isActive}
      name={options.icon}
      onClick={handleClick}
    />
  );
};
