import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import TextIcon from '../TextIcon';
import type { IconName } from '../icons/types';

import styles from './styles.module.scss';

export type PillProps = DataTestId & {
  active?: boolean;
  children: ReactNode;
  disabled?: boolean;
  icon?: IconName;
};

const Pill = ({
  active,
  children,
  'data-testid': testId = 'pill',
  disabled,
  icon,
}: PillProps) => {
  return (
    <Stack
      className={classNames(
        styles.Pill,
        active ? styles.PillActive : styles.PillTransition,
        disabled && styles.PillDisabled,
      )}
      alignItems="center"
      data-testid={testId}
      padding={{ x: 6, y: 4 }}
    >
      {icon ? (
        <TextIcon startIcon={icon} currentColor>
          {children}
        </TextIcon>
      ) : (
        <Text>{children}</Text>
      )}
    </Stack>
  );
};

export default Pill;
