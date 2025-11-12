import { type Ref, useImperativeHandle, useRef } from 'react';

import type { Spacings } from '@/hocs';
import type { UseIsOverflownOptions } from '@/hooks';
import { useIsOverflown } from '@/hooks';
import type { TooltipProps } from '@/skin/displays';
import { Tooltip } from '@/skin/displays';

import type { TextProps } from '../Text';
import Text from '../Text';

import styles from './styles.module.scss';

export type OverflownTextExposedUtilities = {
  scrollWidth?: number;
};

export type OverflownTextProps = UseIsOverflownOptions &
  Omit<
    TextProps,
    | 'noWrap'
    | 'overflowHidden'
    | 'overflowWrap'
    | 'textEllipsis'
    | 'wordBreak'
    | 'ref'
  > &
  Pick<TooltipProps, 'placement'> & {
    isDisabled?: boolean;
    ref?: Ref<OverflownTextExposedUtilities>;
  } & Spacings;

const OverflownText = ({
  'data-testid': testId = 'overflown-text',
  children,
  isDisabled,
  placement,
  ref: forwardedRef,
  withWatchScreenResize,
  ...props
}: OverflownTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(forwardedRef, () => ({
    scrollWidth: ref.current?.scrollWidth,
  }));

  const isOverflown = useIsOverflown(ref, {
    ...(withWatchScreenResize && { withWatchScreenResize }),
  });

  return (
    <Tooltip
      content={children}
      data-testid={testId}
      isDisabled={isDisabled || !isOverflown}
      placement={placement}
      triggerClassName={styles.OverflownText}
      triggerOn="hover"
      withStopPropagation={false}
    >
      <Text
        ref={ref}
        data-testid={testId}
        {...props}
        whiteSpace="nowrap"
        overflowHidden
        textEllipsis
      >
        {children}
      </Text>
    </Tooltip>
  );
};

export default OverflownText;
