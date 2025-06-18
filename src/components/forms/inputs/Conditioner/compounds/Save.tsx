import { Button } from '@/skin/actions';
import { buildTestIds } from '@/utils/testIds';

import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import { useConditionerContext } from '../context';
import type { ConditionType, LogicalGroupType } from '../types';

export type ReturnType = {
  conditions: ConditionType[];
  logicalGroups: LogicalGroupType[];
};

export type SaveProps = {
  onClick: (value: ReturnType) => void;
  label?: string;
};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const Save = ({ onClick, label = 'Save' }: SaveProps) => {
  const { conditions, logicalGroups, readonly } = useConditionerContext();

  const handleClick = () => onClick({ conditions, logicalGroups });

  return (
    <Button
      data-testid={TEST_IDS.save}
      disabled={readonly}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
