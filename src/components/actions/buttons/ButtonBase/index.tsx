import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { DEFAULT_BEHAVIOR, DEFAULT_TYPE, DEFAULT_VARIANT } from './constants';
import type { ButtonType, ButtonVariant } from './types';

import styles from './styles.module.scss';

export type ButtonBaseProps = DataTestId & {
  behavior?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  disabled?: boolean;
  endElement?: ReactNode;
  startElement?: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariant;
} & Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'onMouseDown' | 'onTouchEnd' | 'tabIndex'
  >;

export type InternalButtonBaseProps = {
  children: ReactNode;
  classNameInternal?: string;
};

const ButtonBase = forwardRef<
  HTMLButtonElement,
  ButtonBaseProps & InternalButtonBaseProps
>(
  (
    {
      behavior = DEFAULT_BEHAVIOR,
      children,
      className,
      classNameInternal,
      'data-testid': testId = 'button-base',
      disabled,
      endElement,
      startElement,
      type = DEFAULT_TYPE,
      variant = DEFAULT_VARIANT,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          classNameInternal,
          variant !== 'bared'
            ? [styles.ButtonBase, stylesToCamelCase(styles, variant, type)]
            : [styles.bared, className],
        )}
        data-testid={testId}
        disabled={disabled}
        type={behavior}
        {...rest}
      >
        {startElement && startElement}
        {children}
        {endElement && endElement}
      </button>
    );
  },
);

export default ButtonBase;
