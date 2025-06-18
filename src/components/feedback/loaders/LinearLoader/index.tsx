import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { memo } from 'react';

import { DEFAULT_TEST_ID } from './constants';

import styles from './styles.module.scss';

export type LinearLoaderProps = DataTestId & {
  progress: number;
  rounded?: boolean;
};

const LinearLoader = ({
  'data-testid': testId = DEFAULT_TEST_ID,
  progress,
  rounded,
}: LinearLoaderProps) => {
  return (
    <div
      className={classNames(styles.linearActivity, rounded && styles.rounded)}
      data-testid={testId}
    >
      <div
        className={styles.determinate}
        data-testid={testId && buildLinearLoaderTestIds().determinate}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export const buildLinearLoaderTestIds = (base = DEFAULT_TEST_ID) => ({
  determinate: `${base}-determinate`,
});

export default memo(LinearLoader);
