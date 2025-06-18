import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';
import { buildTestIds } from '@/utils/testIds';

import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import { useConditionerContext } from '../context';
import type { LogicalGroupType } from '../types';
import { Condition } from './Condition';
import { Logic } from './Logic';

import styles from '../styles.module.scss';

type GroupContainerProps = DataTestId & {
  currentLogicalGroup: LogicalGroupType;
  logicalGroupIndex: number;
  isEven: boolean;
  isFirst: boolean;
};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const Group = ({
  currentLogicalGroup,
  logicalGroupIndex,
  isEven,
  isFirst,
  'data-testid': testId,
}: GroupContainerProps) => {
  const { logicalGroups, conditions } = useConditionerContext();
  return (
    <Stack
      className={classNames(
        styles.group,
        isEven ? styles.isEven : styles.isOdd,
      )}
      data-testid={testId}
      direction="column"
      flexGrow={1}
      gap={4}
    >
      {currentLogicalGroup.conditionsId
        .filter(conditionId =>
          conditions.find(conditionState => conditionState.id === conditionId),
        )
        .map((conditionId, conditionIndex) => {
          const currentCondition = conditions.find(
            conditionState => conditionState.id === conditionId,
          );
          if (!currentCondition) {
            return null;
          }
          return (
            <Logic
              key={conditionId}
              isLast={
                currentLogicalGroup.conditionsId.length - 1 === conditionIndex
              }
              data-testid={`${TEST_IDS.conditionLogic}-${logicalGroupIndex}-${conditionIndex}`}
              isOdd={!isEven}
              logic={currentLogicalGroup.logic}
            >
              <Condition
                condition={currentCondition}
                data-testid={`${TEST_IDS.condition}-${logicalGroupIndex}-${conditionIndex}`}
                logicalGroup={currentLogicalGroup}
                withDeleteAction={isFirst && conditionIndex === 0}
              />
            </Logic>
          );
        })}
      {logicalGroups
        .filter(
          logicalSubGroup =>
            logicalSubGroup.subGroupOf === currentLogicalGroup.id,
        )
        .map(logicalSubGroup => (
          <Logic
            key={logicalSubGroup.id}
            data-testid={`${TEST_IDS.subGroupLogic}-${logicalGroupIndex}`}
            isLast={logicalGroups.length - 1 === logicalGroupIndex}
            isOdd={!isEven}
            logic={currentLogicalGroup.logic}
            order="before"
          >
            <Group
              logicalGroupIndex={logicalGroups.findIndex(
                logicalGroup => logicalGroup.id === logicalSubGroup.id,
              )}
              currentLogicalGroup={logicalSubGroup}
              data-testid={`${TEST_IDS.subGroup}-${logicalGroupIndex}`}
              isEven={!isEven}
              isFirst={false}
            />
          </Logic>
        ))}
    </Stack>
  );
};
