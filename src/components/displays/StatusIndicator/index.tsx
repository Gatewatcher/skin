import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { useThemeContext } from '@/skin/navigation/Theme';
import { getColor } from '@/utils';

import { DEFAULT_STATUS_INDICATOR_SIZE } from './constants';
import type { StatusIndicatorSize, StatusIndicatorType } from './types';

import styles from './styles.module.scss';

export type StatusIndicatorProps = DataTestId & {
  size?: StatusIndicatorSize;
  type: StatusIndicatorType;
  withPulse?: boolean;
};

const StatusIndicator = ({
  'data-testid': testId = 'status-indicator',
  size = DEFAULT_STATUS_INDICATOR_SIZE,
  type,
  withPulse = false,
}: StatusIndicatorProps) => {
  const { theme } = useThemeContext();

  const backgroundColor = getColor(type, {
    variant: theme === 'dark' ? 300 : 500,
  });

  return (
    <span
      className={classNames(
        styles.StatusIndicator,
        styles[size],
        withPulse && styles.withPulse,
      )}
      data-testid={testId}
      style={{ backgroundColor }}
    />
  );
};

export default StatusIndicator;
