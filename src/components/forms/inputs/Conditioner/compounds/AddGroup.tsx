import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { buildTestIds } from '@/utils/testIds';

import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import { useConditionerContext } from '../context';
import type { LogicalGroupType } from '../types';

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const AddGroup = () => {
  const { setConditions, setLogicalGroups, logicalGroups, isMulti, readonly } =
    useConditionerContext();

  if (!isMulti) {
    return null;
  }

  const handleOnClick = (isElse: boolean) => {
    const newCondition = { id: generateUniqId() };

    setConditions(conditionsValue => {
      conditionsValue.push(newCondition);
      return [...conditionsValue];
    });

    setLogicalGroups(logicalGroupsValue => {
      const newLogicalGroup: LogicalGroupType = {
        id: generateUniqId(),
        conditionsId: [newCondition.id],
        name: `Condition ${logicalGroupsValue.length + 1}`,
        type: isElse ? 'else' : 'elif',
      };

      if (isElseSet) {
        logicalGroupsValue.splice(
          logicalGroupsValue.length - 1,
          0,
          newLogicalGroup,
        );
        return [...logicalGroupsValue];
      }

      return [...logicalGroupsValue, newLogicalGroup];
    });
  };

  const isElseSet = logicalGroups[logicalGroups.length - 1].type === 'else';

  return (
    <Stack alignContent="flex-end" gap={9}>
      <Button
        data-testid={TEST_IDS.addElseIf}
        disabled={readonly}
        onClick={() => handleOnClick(false)}
        startIcon="Add"
        variant="ghosted"
      >
        ELSE IF
      </Button>
      {!isElseSet && (
        <Button
          data-testid={TEST_IDS.addElse}
          disabled={readonly}
          onClick={() => handleOnClick(true)}
          startIcon="Add"
          variant="ghosted"
        >
          ELSE
        </Button>
      )}
    </Stack>
  );
};
