import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { HTMLAttributes, MouseEvent, ReactElement, Ref } from 'react';
import { cloneElement, forwardRef } from 'react';

import type { FloatingProps } from '..';

import styles from './styles.module.scss';

export type TriggerElementProps = HTMLAttributes<HTMLElement> &
  Pick<FloatingProps, 'withStopPropagation'> &
  Required<Pick<FloatingProps, 'data-testid'>> & {
    children: ReactElement;
    className?: string;
    withMinWidthTrigger?: boolean;
  };

const TriggerElement = forwardRef<HTMLElement, TriggerElementProps>(
  (
    {
      children,
      'data-testid': baseTestId,
      className,
      withStopPropagation,
      withMinWidthTrigger,
      ...rest
    }: TriggerElementProps,
    ref,
  ) => {
    const isString = typeof children.type === 'string';

    const divOnClick = (event: MouseEvent<HTMLElement>) => {
      if (withStopPropagation) {
        event.stopPropagation();
      }
      rest.onClick?.(event);
    };

    const testId = suffixTestId(baseTestId, 'trigger');

    return isString ? (
      cloneElement(children, {
        'data-testid': testId,
        ref,
        className: classNames(className),
        ...rest,
      })
    ) : (
      <div
        ref={ref as Ref<HTMLDivElement>}
        className={classNames(
          styles.TriggerElement,
          className,
          withMinWidthTrigger && styles.MinWidth,
        )}
        data-testid={testId}
        {...rest}
        onClick={divOnClick}
      >
        {children}
      </div>
    );
  },
);

export default TriggerElement;
