import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';

import StackItem from './compounds/item';
import { DEFAULT_AS } from './constants';
import type { StackContainerProperties } from './types';
import { buildCssVariables } from './utils';

import styles from './styles.module.scss';

export type StackProps = DataTestId &
  HTMLAttributes<HTMLElement> &
  StackContainerProperties &
  Spacings & {
    as?: ElementType;
    children?: ReactNode;
    className?: string;
    setRef?: (element: HTMLElement) => void;
  };

const Stack = ({
  alignContent,
  alignItems,
  as: Component = DEFAULT_AS,
  children,
  className,
  'data-testid': testId = 'stack',
  direction,
  flexGrow,
  gap,
  justifyContent,
  style,
  wrap,
  setRef,
  ...rest
}: StackProps) => {
  const styleVariables = buildCssVariables({
    alignContent,
    alignItems,
    direction,
    flexGrow,
    gap,
    justifyContent,
    wrap,
  });

  return withSpacing(
    <Component
      ref={setRef}
      className={classNames(
        styles.Stack,
        alignContent && styles.alignContent,
        alignItems && styles.alignItems,
        direction && styles.flexDirection,
        isDefined(flexGrow) && styles.flexGrow,
        isDefined(gap) && styles.gap,
        justifyContent && styles.justifyContent,
        wrap && styles.flexWrap,
        className,
      )}
      data-testid={testId}
      style={{ ...style, ...styleVariables }}
      {...rest}
    >
      {children}
    </Component>,
    rest,
  );
};

Stack.Item = memo(StackItem);

export default Stack;
