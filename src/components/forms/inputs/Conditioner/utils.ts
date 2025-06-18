import type { LogicalGroupType } from './types';

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
