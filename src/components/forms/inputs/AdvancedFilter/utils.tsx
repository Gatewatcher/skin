import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';

import type {
  ConditionerConditionType,
  ConditionerLogicalGroupType,
} from '@/skin/forms';

export const generateNewFilter = (): [
  ConditionerConditionType[],
  ConditionerLogicalGroupType[],
] => {
  const conditionId = generateUniqId();
  const conditionsInit: ConditionerConditionType[] = [{ id: conditionId }];
  const logicalGroupsInit: ConditionerLogicalGroupType[] = [
    {
      conditionsId: [conditionId],
      id: generateUniqId(),
      name: 'Condition 1',
      type: 'if',
    },
  ];

  return [conditionsInit, logicalGroupsInit];
};

export const findMainGroupId = (logicalGroups: ConditionerLogicalGroupType[]) =>
  logicalGroups.find(logicalGroup => !logicalGroup.subGroupOf)?.id;
