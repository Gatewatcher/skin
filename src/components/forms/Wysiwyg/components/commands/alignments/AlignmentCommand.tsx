import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { ElementFormatType } from 'lexical';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
} from 'lexical';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import type { IconName } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';

import { DropdownCommandButton } from '../../DropdownCommandButton';

type AlignmentPayload = {
  name: ReactNode;
  icon: IconName;
  format: ElementFormatType;
};

const ALIGMENTS: AlignmentPayload[] = [
  { name: 'Start', icon: 'Action', format: 'start' },
  { name: 'Center', icon: 'Action', format: 'center' },
  { name: 'End', icon: 'Action', format: 'end' },
  { name: 'Justify', icon: 'Action', format: 'justify' },
];

export const AlignmentCommand = () => {
  const [editor] = useLexicalComposerContext();
  const [type, setType] = useState<ElementFormatType>();

  useEffect(() => {
    const listener = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode();
          const parent = node.getParent();

          const type = parent?.getFormatType();
          setType(type);
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(listener);
    });
  }, [editor]);

  const handleClick = (format: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  const currentTypePayload =
    ALIGMENTS.find(item => item.format === type) || ALIGMENTS[0];

  return (
    <Dropdown
      content={
        <Dropdown.Content>
          {ALIGMENTS.map(item => (
            <Dropdown.Button
              key={item.format}
              icon={item.icon}
              onClick={() => handleClick(item.format)}
            >
              {item.name}
            </Dropdown.Button>
          ))}
        </Dropdown.Content>
      }
      placement="bottom-start"
      triggerOn="click"
    >
      <DropdownCommandButton icon={currentTypePayload.icon}>
        {currentTypePayload.name}
      </DropdownCommandButton>
    </Dropdown>
  );
};
