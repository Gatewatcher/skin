import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { IconName } from '@/skin/displays';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type ItemProps = DataTestId & {
  children: ReactNode;
  icon: IconName;
};

const Item = ({
  children,
  'data-testid': testId = 'timeline-item',
  icon,
}: ItemProps) => {
  return (
    <Stack
      className={styles.Item}
      data-testid={testId}
      gap={5}
      margin={{ bottom: 3 }}
    >
      <Stack alignItems="center" direction="column" gap={3}>
        <Stack
          alignItems="center"
          className={styles.IconContainer}
          justifyContent="center"
        >
          <Icon name={icon} size="small" currentColor />
        </Stack>
        <div className={styles.Bar} />
      </Stack>

      <Stack className={styles.BodyContainer} direction="column" gap={2}>
        {children}
      </Stack>
    </Stack>
  );
};

export default Item;
