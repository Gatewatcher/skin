import { useEffect } from 'react';

import type { Operator } from '@/skin/forms/inputs/Conditioner/types';

import { useConditionerContext } from './context';

export const useConditioner = () => {
  const { setLogicalGroups, conditions } = useConditionerContext();

  useEffect(() => {
    setLogicalGroups(logicalGroupsState => {
      logicalGroupsState.forEach(
        (logicalGroupState, logicalGroupStateIndex) => {
          const remainingConditionsId = logicalGroupState.conditionsId?.filter(
            conditionId =>
              conditions.find(condition => condition.id === conditionId),
          );
          const parentGroup = logicalGroupsState.find(
            logicalGroupState =>
              logicalGroupState.id ===
              logicalGroupsState[logicalGroupStateIndex].subGroupOf,
          );

          /**
           * No condition:
           * - Change subgroup id for the parent
           * - Delete the current
           */
          if (
            !remainingConditionsId?.length &&
            logicalGroupState.type !== 'else'
          ) {
            logicalGroupsState.forEach(logicalSubGroup => {
              if (logicalSubGroup.subGroupOf === logicalGroupState.id) {
                logicalSubGroup.subGroupOf = parentGroup?.id;
              }
            });
            logicalGroupsState.splice(logicalGroupStateIndex, 1);

            return;
          }

          const remainingSubGroups = logicalGroupsState.filter(
            logicalSubGroupState =>
              logicalSubGroupState.subGroupOf === logicalGroupState.id,
          );

          /**
           * One condition:
           * - Put in the parent group
           * - Delete the current
           */
          if (
            logicalGroupState.subGroupOf &&
            !remainingSubGroups.length &&
            remainingConditionsId.length === 1
          ) {
            parentGroup?.conditionsId?.push(remainingConditionsId[0]);
            logicalGroupsState.splice(logicalGroupStateIndex, 1);

            return;
          }

          logicalGroupsState[logicalGroupStateIndex].conditionsId = [
            ...remainingConditionsId,
          ];
        },
      );

      return [...logicalGroupsState];
    });
  }, [conditions, setLogicalGroups]);
};

export const useOperators = () => {
  const { operators } = useConditionerContext();

  return {
    ...operators,
    getForObservableType: (observableType: Operator) => {
      switch (observableType) {
        case 'TEXT':
          return operators.text;
        case 'NUMBER':
          return operators.number;
        case 'BOOLEAN':
          return operators.boolean;
        case 'DATE':
          return operators.date;
        case 'IP':
          return operators.ip;
        default:
          return operators.all;
      }
    },
  };
};
