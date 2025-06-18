import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';

import Illustration from '../Illustration';

import styles from './styles.module.scss';

export type PoweredByGatewatcherProps = DataTestId & {
  label?: string;
};

const PoweredByGatewatcher = ({
  'data-testid': testId = 'powered-by-gatewatcher',
  label = 'Powered by',
}: PoweredByGatewatcherProps) => {
  return (
    <Stack
      className={styles.poweredByContainer}
      data-testid={testId}
      gap={2}
      justifyContent="center"
    >
      <span className={styles.poweredByText}>{label}</span>
      <Illustration name="GwFontLogo" size={80} />
    </Stack>
  );
};

export default PoweredByGatewatcher;
