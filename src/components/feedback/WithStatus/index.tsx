import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, ElementType, ReactNode } from 'react';

import type { StatusIndicatorProps } from '@/skin/displays/StatusIndicator';
import StatusIndicator from '@/skin/displays/StatusIndicator';

import styles from './styles.module.scss';

export type WithStatusProps = DataTestId &
  StatusIndicatorProps & {
    as?: ElementType;
    children: ReactNode;
    offset?: {
      x?: CSSProperties['top'];
      y?: CSSProperties['right'];
    };
  };

const WithStatus = ({
  as: Component = 'span',
  children,
  offset = {},
  ...rest
}: WithStatusProps) => {
  return (
    <Component className={styles.WithStatus}>
      {children}
      <span
        className={styles.StatusWrapper}
        data-testid="status-wrapper"
        style={offsetToCssPosition(offset)}
      >
        <StatusIndicator {...rest} />
      </span>
    </Component>
  );
};

export default WithStatus;

const offsetToCssPosition = (offset: WithStatusProps['offset']) => {
  const { x = 0, y = 0 } = offset ?? {};

  const xUnit = isString(x) ? extractCssUnit(x) : 'px';
  const xValue = parseFloat(x.toString());

  return {
    right: `${-xValue}${xUnit}`,
    top: y,
  };
};

const extractCssUnit = (value: string) => {
  const match = value.match(/-?\d+(?<unit>\w+)/);
  return match?.groups?.unit ?? 'px';
};
