import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';

import { Button } from '@/skin/actions';
import { buildTestIds } from '@/utils/testIds';

import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';
import { useConditionerContext } from '../context';

export type ClearAllProps = {
  onClick?: () => void;
  label?: string;
};

const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const ClearAll = ({ onClick, label = 'Clear all' }: ClearAllProps) => {
  const { setConditions, setLogicalGroups, readonly } = useConditionerContext();

  const handleClick = () => {
    const condition = { id: generateUniqId() };
    const logicalGroup = {
      conditionsId: [condition.id],
      id: generateUniqId(),
      name: 'Condition 1',
    };

    setConditions([condition]);
    setLogicalGroups([logicalGroup]);
    onClick?.();
  };

  return (
    <Button
      data-testid={TEST_IDS.clearAll}
      disabled={readonly}
      onClick={handleClick}
      startIcon="Update"
      variant="ghosted"
    >
      {label}
    </Button>
  );
};
