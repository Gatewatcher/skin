import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { InternalText } from '@/skin/typography/Text';

import styles from '../styles.module.scss';

export type EllipsisDataBadgeCountProps = DataTestId & {
  count: number;
};

const BadgeCount = ({
  count,
  'data-testid': testId = 'ellipsis-data-badge-count',
}: EllipsisDataBadgeCountProps) => {
  return (
    <InternalText
      className={styles.BadgeCount}
      data-testid={testId}
    >{`+${count}`}</InternalText>
  );
};

export default BadgeCount;
