import { ButtonIcon } from '@/skin/actions';
import { Dropdown } from '@/skin/displays';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { DEFAULT_VALUE_PLACEHOLDER } from '../constants';
import { useConditionerContext } from '../context';
import type { LogicalGroupType } from '../types';

type LabelProps = {
  logicalGroup: LogicalGroupType;
};

export const Label = ({ logicalGroup }: LabelProps) => {
  const { logicalGroups, setLogicalGroups, readonly } = useConditionerContext();
  return (
    <Stack alignItems="center" justifyContent="space-between">
      <Text>{logicalGroup.name}</Text>
      <Dropdown
        content={
          <Dropdown.Content>
            <Input.Text
              onChange={event => {
                const value = event.target.value;

                const currentLogicalGroupIndex = logicalGroups.findIndex(
                  logicalGroupState => logicalGroupState.id === logicalGroup.id,
                );

                setLogicalGroups(logicalGroupsState => {
                  logicalGroupsState[currentLogicalGroupIndex].name = value;

                  return [...logicalGroupsState];
                });
              }}
              placeholder={DEFAULT_VALUE_PLACEHOLDER}
              value={logicalGroup.name}
              withLabel={false}
            />
          </Dropdown.Content>
        }
        isDisabled={readonly}
      >
        <ButtonIcon disabled={readonly} icon="Edit" variant="ghosted" />
      </Dropdown>
    </Stack>
  );
};
