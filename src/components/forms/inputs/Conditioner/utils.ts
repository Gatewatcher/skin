import type { ConditionType, LogicalGroupType } from './types';

export const traverseArray = (
  logicalGroupId: LogicalGroupType['id'],
  logicalGroups: LogicalGroupType[],
  depth: number,
): number => {
  const subGroup = logicalGroups.find(
    logicalGroupState => logicalGroupState.id === logicalGroupId,
  );
  if (subGroup && subGroup.subGroupOf) {
    depth++;
    return traverseArray(subGroup.subGroupOf, logicalGroups, depth);
  }
  return depth;
};

export const checkAreAllConditionsDefined = (conditions: ConditionType[]) => {
  return conditions.every(condition => isConditionDefined(condition));
};

export const isConditionDefined = (condition: ConditionType) => {
  return condition?.observable && condition?.operator && condition?.value;
};
