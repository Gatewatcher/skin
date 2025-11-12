import { useDocumentEventListener } from '@gatewatcher/bistoury/hooks';
import type { KeyboardEventHandler } from 'react';
import { useState } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { useConditionerContext } from '../context';
import type { LogicalGroupType } from '../types';

type LabelProps = {
  logicalGroup: LogicalGroupType;
};

export const Label = ({ logicalGroup }: LabelProps) => {
  const { logicalGroups, setLogicalGroups } = useConditionerContext();
  const [isEditable, setIsEditable] = useState(false);
  const [draft, setDraft] = useState(logicalGroup.name);

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') confirmDraft();
    else if (event.key === 'Escape') dropDraft();
  };

  const confirmDraft = () => {
    if (!isEditable) return;
    setIsEditable(false);
    const name = draft.trim();
    if (name) updateGroupName(name);
    else dropDraft();
  };

  const dropDraft = () => {
    setIsEditable(false);
    setDraft(logicalGroup.name);
  };

  const updateGroupName = (name: string) => {
    const currentLogicalGroupIndex = logicalGroups.findIndex(
      logicalGroupState => logicalGroupState.id === logicalGroup.id,
    );
    setLogicalGroups(logicalGroupsState => {
      logicalGroupsState[currentLogicalGroupIndex].name = name;
      return [...logicalGroupsState];
    });
  };

  useDocumentEventListener('click', confirmDraft);

  return (
    <Stack
      alignItems="center"
      gap={4}
      onClick={event => event.stopPropagation()}
    >
      {isEditable ? (
        <Stack.Item flexGrow={1}>
          <Input.Text
            onChange={event => setDraft(event.target.value)}
            onKeyDown={handleOnKeyDown}
            placeholder={logicalGroup.name}
            value={draft}
            withLabel={false}
            autoFocus
          />
        </Stack.Item>
      ) : (
        <Stack alignItems="center" gap={4}>
          <Text weight="medium">{logicalGroup.name}</Text>
          <ButtonIcon
            icon="Edit"
            onClick={() => setIsEditable(true)}
            type="neutral"
            variant="ghosted"
          />
        </Stack>
      )}
      {isEditable && (
        <>
          <ButtonIcon icon="Check" onClick={confirmDraft} variant="ghosted" />
          <ButtonIcon
            icon="Close"
            onClick={dropDraft}
            type="danger"
            variant="ghosted"
          />
        </>
      )}
    </Stack>
  );
};
