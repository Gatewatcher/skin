import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { OverflownText } from '@/skin/typography';

import Icon from '../../icons/Icon';
import type { IconName } from '../../icons/types';

import styles from '../styles.module.scss';

export type FinderResumeItemProps = DataTestId & {
  children: ReactNode;
  icon?: IconName;
  maxWidth?: number;
};

export type FinderResumeItemInternalProps = {
  isLastItem: boolean;
};

const ResumeItem = ({
  children,
  'data-testid': testId = 'finder-resume-item',
  icon = 'Slash',
  maxWidth = 250,
  ...rest
}: FinderResumeItemProps) => {
  const { isLastItem } = rest as FinderResumeItemInternalProps;

  return (
    <Stack
      alignItems="baseline"
      className={styles.ResumeItem}
      data-testid={testId}
    >
      <Stack.Item style={{ maxWidth }}>
        <OverflownText as={isLastItem ? 'strong' : 'span'}>
          {children}
        </OverflownText>
      </Stack.Item>
      {!isLastItem && <Icon name={icon} />}
    </Stack>
  );
};

export default ResumeItem;
