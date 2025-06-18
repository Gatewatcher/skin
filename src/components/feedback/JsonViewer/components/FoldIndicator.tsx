import { classNames } from '@gatewatcher/bistoury/utils-dom';

import type { TreeNodeRenderProps } from '@/skin/displays/tree/Tree/types';
import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

const FoldIndicator = ({ isExpandable, isExpanded }: TreeNodeRenderProps) => {
  return (
    <Stack
      alignItems="center"
      className={styles.arrowContainer}
      justifyContent="center"
    >
      <div
        className={classNames(
          isExpandable && styles.arrow,
          isExpanded && styles.arrowExpanded,
        )}
      />
    </Stack>
  );
};

export default FoldIndicator;
