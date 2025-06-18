import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';

import { Title } from '@/skin/typography';

import Stack from '../../Stack';
import Spaced from '../components/Spaced';

import styles from '../styles.module.scss';

export type RouteContainerSubheaderProps = DataTestId & {
  actions?: ReactNode;
  badge?: ReactNode;
  title: string | ReactElement<typeof Title>;
};

const Subheader = ({
  actions,
  badge,
  'data-testid': testId = 'route-container-subheader',
  title,
}: RouteContainerSubheaderProps) => {
  return (
    <Stack
      alignItems="flex-end"
      className={styles.Subheader}
      data-testid={testId}
      margin={{ top: 7, bottom: 9 }}
    >
      <Stack alignItems="center" gap={6}>
        {isString(title) ? <Title as="h2">{title}</Title> : title}
        {badge}
      </Stack>
      <Spaced shifted={actions ? true : undefined}>{actions}</Spaced>
    </Stack>
  );
};

export default Subheader;
