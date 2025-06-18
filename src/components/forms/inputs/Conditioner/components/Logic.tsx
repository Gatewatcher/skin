import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Divider } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import type { LogicalGroupType } from '../types';

import styles from '../styles.module.scss';

type LogicProps = DataTestId & {
  children: ReactNode;
  logic: LogicalGroupType['logic'];
  isLast: boolean;
  isOdd: boolean;
  order?: 'before' | 'after';
};

export const Logic = ({
  children,
  logic,
  isLast,
  isOdd,
  order = 'after',
  'data-testid': testId,
}: LogicProps) => {
  return (
    <Stack data-testid={testId} direction="column" gap={4}>
      {order === 'after' && children}
      {!isLast && (
        <Stack alignItems="center" className={styles.Separator}>
          <Divider />
          <div
            className={classNames(
              styles.ConditionText,
              isOdd && styles.oddText,
            )}
          >
            {logic === 'or' ? 'OR' : 'AND'}
          </div>
        </Stack>
      )}
      {order === 'before' && children}
    </Stack>
  );
};
