import type {
  FloatingContext,
  MiddlewareData,
  Placement,
} from '@floating-ui/react';
import { useTransitionStyles } from '@floating-ui/react';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { Modify, TestId } from '@gatewatcher/bistoury/utils-types';
import type { MouseEvent, Ref } from 'react';
import { forwardRef } from 'react';

import { Stack } from '@/skin/layout';

import type { FloatingInternalSharedProps, FloatingSharedProps } from '..';
import { DEFAULT_DURATION, DURATIONS_MS } from '../constants';
import { useFloatingContext } from '../context';

import styles from '../styles.module.scss';

export type FloatingElementProps = Modify<
  FloatingSharedProps,
  { 'data-testid': TestId; placement: Placement }
> &
  FloatingInternalSharedProps & {
    arrowRef: Ref<HTMLDivElement>;
    context: FloatingContext;
    maxHeight?: number;
    middlewareData: MiddlewareData;
    x: number | null;
    y: number | null;
  };

const FloatingElement = forwardRef<HTMLDivElement, FloatingElementProps>(
  (
    {
      arrowClassName,
      arrowRef,
      className,
      content: contentProps,
      context,
      'data-testid': baseTestId,
      duration = DEFAULT_DURATION,
      isDisabled,
      maxHeight,
      middlewareData,
      padding,
      placement,
      strategy,
      withArrow,
      withSmoothAnimation,
      x,
      y,
      ...rest
    },
    ref,
  ) => {
    const positionComputed = x !== null && y !== null;

    const ctx = useFloatingContext();

    const direction = placement.split('-')[0];
    const isVertical = direction === 'top' || direction === 'bottom';
    const isHorizontal = direction === 'left' || direction === 'right';

    const transition = useTransitionStyles(context, {
      duration: DURATIONS_MS[duration],
      initial: {
        ...(withSmoothAnimation && {
          transform: isVertical
            ? `translateY(${10 * (direction === 'top' ? 1 : -1)}px)`
            : `translateX(${10 * (direction === 'left' ? 1 : -1)}px)`,
        }),
        opacity: 0,
      },
    });

    if (isDisabled) {
      return null;
    }

    const content = isFunction(contentProps) ? contentProps(ctx) : contentProps;

    const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
    };

    return (
      <>
        {transition.isMounted && content && (
          <div
            ref={ref}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              visibility: positionComputed ? 'visible' : 'hidden',
              zIndex: 'var(--z-index-floating)',
              ...transition.styles,
            }}
            className={className}
            data-testid={suffixTestId(baseTestId, 'content')}
            onClick={handleClick}
            {...rest}
          >
            <Stack
              className={classNames(!!maxHeight && styles.overflow)}
              direction="column"
              padding={padding}
              style={{ maxHeight }}
            >
              {content}
            </Stack>

            {withArrow && (
              <div
                ref={arrowRef}
                className={classNames(
                  styles.arrow,
                  isFunction(arrowClassName)
                    ? arrowClassName(placement)
                    : arrowClassName,
                )}
                style={{
                  ...(isVertical && {
                    left: middlewareData?.arrow?.x ?? 0,
                    [direction === 'top' ? 'bottom' : 'top']:
                      middlewareData?.arrow?.y ?? 0,
                    transform: `translateY(${
                      direction === 'bottom' ? '-' : ''
                    }50%) rotate(45deg)`,
                  }),
                  ...(isHorizontal && {
                    top: middlewareData?.arrow?.y ?? 0,
                    [direction === 'left' ? 'right' : 'left']:
                      middlewareData?.arrow?.x ?? 0,
                    transform: `translateX(${
                      direction === 'right' ? '-' : ''
                    }50%) rotate(45deg)`,
                  }),
                }}
                data-testid={suffixTestId(baseTestId, 'arrow')}
              />
            )}
          </div>
        )}
      </>
    );
  },
);

export default FloatingElement;
