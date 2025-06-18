import { ButtonIcon } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import { buildTestIds } from '@/utils/testIds';

import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import { useConditionerContext } from '../context';
import type { LogicalGroupType } from '../types';

type IfElserProps = {
  logicalGroupIndex: number;
  logicalGroup: LogicalGroupType;
};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const IfElser = ({ logicalGroupIndex, logicalGroup }: IfElserProps) => {
  const { setLogicalGroups, readonly } = useConditionerContext();

  const handleOnClick = () => {
    setLogicalGroups(logicalGroupsState => {
      logicalGroupsState.splice(
        logicalGroupsState.findIndex(
          logicalGroupValue => logicalGroupValue.id === logicalGroup.id,
        ),
        1,
      );
      return [...logicalGroupsState];
    });
  };

  return (
    (!logicalGroupIndex && (
      <Text data-testid={TEST_IDS.if} type="info" weight="medium">
        IF
      </Text>
    )) || (
      <Stack
        data-testid={
          logicalGroup.type === 'else' ? TEST_IDS.else : TEST_IDS.elseIf
        }
        alignItems="center"
        gap={4}
      >
        <Text type="info" weight="medium">
          {logicalGroup.type === 'else' ? 'ELSE' : 'ELSE IF'}
        </Text>
        <ButtonIcon
          data-testid={
            logicalGroup.type === 'else'
              ? TEST_IDS.removeElse
              : TEST_IDS.removeElseIf
          }
          disabled={readonly}
          icon="Close"
          onClick={handleOnClick}
          variant="ghosted"
        />
      </Stack>
    )
  );
};
