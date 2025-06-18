import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useEffect, useState } from 'react';

import { Button } from '@/skin/actions';
import { Dropdown, Icon } from '@/skin/displays';
import { Grid, Stack } from '@/skin/layout';
import { buildTestIds } from '@/utils/testIds';

import {
  DEFAULT_ADD_CONDITION_BUTTONS_LABEL,
  SUFFIX_TEST_IDS,
  TEST_ID,
} from '../constants';
import { useConditionerContext } from '../context';
import type { ConditionType, LogicalGroupType } from '../types';
import { traverseArray } from '../utils';
import { Field } from './Field';

type ConditionProps = DataTestId & {
  condition: ConditionType;
  logicalGroup: LogicalGroupType;
  withDeleteAction: boolean;
};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const Condition = ({
  condition,
  withDeleteAction,
  logicalGroup,
  'data-testid': testId,
}: ConditionProps) => {
  const {
    maxDepth,
    setLogicalGroups,
    setConditions,
    logicalGroups,
    isMulti,
    readonly,
    restrictedLogicType,
  } = useConditionerContext();

  const [maxDepthReached, setMaxDepthReached] = useState<boolean>(false);

  useEffect(() => {
    const depths = [1];
    if (logicalGroup) {
      depths.push(traverseArray(logicalGroup.id, logicalGroups, 1));
    }
    const currentDepth = Math.max(...depths);
    if (currentDepth < maxDepth) {
      setMaxDepthReached(false);
    } else {
      setMaxDepthReached(true);
    }
  }, [logicalGroup, logicalGroups, maxDepth]);

  const currentLogicalGroupIndex = logicalGroups.findIndex(
    logicalGroupState => logicalGroupState.id === logicalGroup.id,
  );

  const currentConditionIndex = logicalGroups[
    currentLogicalGroupIndex
  ].conditionsId.findIndex(conditionId => conditionId === condition.id);

  const handleAdd = (logic: LogicalGroupType['logic']) => {
    const newCondition = { id: generateUniqId() };

    setConditions(conditionsValue => {
      conditionsValue.push(newCondition);
      return [...conditionsValue];
    });

    if (!logicalGroup.logic) {
      setLogicalGroups(logicalGroupsValue => {
        logicalGroupsValue[currentLogicalGroupIndex].logic = logic;
        logicalGroupsValue[currentLogicalGroupIndex].conditionsId.push(
          newCondition.id,
        );

        return [...logicalGroupsValue];
      });
    } else if (logicalGroup.logic !== logic) {
      setLogicalGroups(logicalGroupsValue => {
        const previousCondition = logicalGroupsValue[
          currentLogicalGroupIndex
        ].conditionsId.splice(currentConditionIndex, 1);

        const newLogicalGroup = {
          id: generateUniqId(),
          logic,
          conditionsId: [...previousCondition, newCondition.id],
          subGroupOf: logicalGroupsValue[currentLogicalGroupIndex].id,
          name: `Condition ${logicalGroupsValue.length + 1}`,
        };

        return [...logicalGroupsValue, newLogicalGroup];
      });
    } else {
      setLogicalGroups(logicalGroupsValue => {
        logicalGroupsValue[currentLogicalGroupIndex].conditionsId.push(
          newCondition.id,
        );

        return [...logicalGroupsValue];
      });
    }
  };

  const handleRemove = () => {
    setConditions(conditionsValue => {
      conditionsValue.splice(
        conditionsValue.findIndex(
          conditionValue => conditionValue.id === condition.id,
        ),
        1,
      );
      return [...conditionsValue];
    });
  };

  const ButtonsAdd = ({ variant }: { variant: 'ghosted' | 'transparent' }) => (
    <>
      {restrictedLogicType && (
        <>
          {restrictedLogicType === 'and' && (
            <Button
              data-testid={`${TEST_IDS.addOr}-${currentLogicalGroupIndex}-${currentConditionIndex}`}
              disabled={
                (maxDepthReached && logicalGroup.logic === 'and') || readonly
              }
              fill={variant === 'ghosted'}
              onClick={() => handleAdd('or')}
              startIcon="Add"
              variant={variant}
            >
              {DEFAULT_ADD_CONDITION_BUTTONS_LABEL.OR}
            </Button>
          )}
          {restrictedLogicType === 'or' && (
            <Button
              data-testid={`${TEST_IDS.addAnd}-${currentLogicalGroupIndex}-${currentConditionIndex}`}
              disabled={
                (maxDepthReached && logicalGroup.logic === 'or') || readonly
              }
              fill={variant === 'ghosted'}
              onClick={() => handleAdd('and')}
              startIcon="Add"
              variant={variant}
            >
              {DEFAULT_ADD_CONDITION_BUTTONS_LABEL.AND}
            </Button>
          )}
        </>
      )}
      {!restrictedLogicType && (
        <>
          <Button
            data-testid={`${TEST_IDS.addOr}-${currentLogicalGroupIndex}-${currentConditionIndex}`}
            disabled={
              (maxDepthReached && logicalGroup.logic === 'and') || readonly
            }
            fill={variant === 'ghosted'}
            onClick={() => handleAdd('or')}
            startIcon="Add"
            variant={variant}
          >
            {DEFAULT_ADD_CONDITION_BUTTONS_LABEL.OR}
          </Button>
          <Button
            data-testid={`${TEST_IDS.addAnd}-${currentLogicalGroupIndex}-${currentConditionIndex}`}
            disabled={
              (maxDepthReached && logicalGroup.logic === 'or') || readonly
            }
            fill={variant === 'ghosted'}
            onClick={() => handleAdd('and')}
            startIcon="Add"
            variant={variant}
          >
            {DEFAULT_ADD_CONDITION_BUTTONS_LABEL.AND}
          </Button>
        </>
      )}
    </>
  );

  return (
    <Grid
      alignItems="center"
      columns={10}
      data-testid={testId}
      gap={6}
      justifyContent="center"
      isContainer
    >
      <Grid colSpan={isMulti ? 9 : 8} isItem>
        <Field condition={condition} />
      </Grid>
      <Grid colSpan={isMulti ? 1 : 2} isItem>
        {isMulti ? (
          <Stack direction="column-reverse" gap={4}>
            <Dropdown
              content={
                <Dropdown.Content>
                  <ButtonsAdd variant="ghosted" />
                </Dropdown.Content>
              }
              isDisabled={readonly}
              placement="bottom"
            >
              <Button disabled={readonly} variant="ghosted" fill>
                <Icon name="Add" />
              </Button>
            </Dropdown>
            <Button
              data-testid={`${TEST_IDS.delete}-${currentLogicalGroupIndex}-${currentConditionIndex}`}
              disabled={withDeleteAction || readonly}
              onClick={handleRemove}
              variant="ghosted"
              fill
            >
              <Icon name="Delete" />
            </Button>
          </Stack>
        ) : (
          <Stack justifyContent="space-evenly">
            <ButtonsAdd variant="transparent" />
            <Button
              data-testid={`${TEST_IDS.delete}-${currentLogicalGroupIndex}-${currentConditionIndex}`}
              disabled={withDeleteAction || readonly}
              onClick={handleRemove}
              variant="transparent"
            >
              <Icon name="Delete" />
            </Button>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};
