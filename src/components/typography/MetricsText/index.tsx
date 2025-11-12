import { stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';

import { InternalText, type TextProps } from '../Text';
import { DEFAULT_SIZE } from './constants';
import type { MetricsTextSize } from './types';

import styles from './styles.module.scss';

export type MetricsTextProps = Omit<TextProps, 'size' | 'weight'> & {
  size?: MetricsTextSize;
};

const MetricsText = ({
  'data-testid': testId = 'metrics-text',
  size = DEFAULT_SIZE,
  ...rest
}: MetricsTextProps) => {
  return (
    <InternalText
      className={stylesToCamelCase(styles, 'size', size)}
      data-testid={testId}
      weight="medium"
      {...rest}
    />
  );
};

export default MetricsText;
