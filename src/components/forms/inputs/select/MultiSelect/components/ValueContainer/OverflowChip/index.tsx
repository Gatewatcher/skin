import { Chip } from '@/skin/displays';

import { useSelectContext } from '../../../../SelectBase/context';

type OverflowChipProps = {
  collapsedCount: number;
};

const OverflowChip = ({ collapsedCount }: OverflowChipProps) => {
  const { getOverflowLabel } = useSelectContext();
  return collapsedCount ? (
    <Chip size="medium" type="info">
      {getOverflowLabel
        ? getOverflowLabel(collapsedCount)
        : `+${collapsedCount}`}
    </Chip>
  ) : null;
};

export default OverflowChip;
