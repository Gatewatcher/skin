import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { Modify } from '@gatewatcher/bistoury/utils-types';
import { forwardRef } from 'react';

import type { IconName, TextIconBaseProps } from '@/skin/displays';
import { TextIcon } from '@/skin/displays';

import type { ButtonBaseProps } from '../ButtonBase';
import ButtonBase from '../ButtonBase';
import { DEFAULT_SIZE, ICON_SIZES } from './constants';
import type { ButtonSize, ButtonType } from './types';

import styles from './styles.module.scss';

export type ButtonProps = Modify<ButtonBaseProps, { type?: ButtonType }> &
  Omit<
    TextIconBaseProps,
    'asFragment' | 'currentColor' | 'iconSize' | 'size' | 'type'
  > & {
    fill?: boolean;
    size?: ButtonSize;
  };

export type InternalButtonProps = ButtonProps & {
  className?: string;
};

export const InternalButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & InternalButtonProps
>(
  (
    {
      children,
      className,
      'data-testid': testId = 'button',
      endIcon,
      fill,
      size = DEFAULT_SIZE,
      startIcon,
      variant,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <ButtonBase
        ref={ref}
        classNameInternal={classNames(
          stylesToCamelCase(styles, 'size', size),
          variant === 'transparent' && styles.noPadding,
          fill && styles.fill,
          className,
        )}
        data-testid={testId}
        variant={variant}
        {...props}
      >
        {endIcon || startIcon ? (
          <TextIcon
            endIcon={endIcon as IconName}
            iconSize={ICON_SIZES[size]}
            startIcon={startIcon as IconName}
            asFragment
            currentColor
          >
            {children}
          </TextIcon>
        ) : (
          children
        )}
      </ButtonBase>
    );
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <InternalButton ref={ref} {...props} />
));

export default Button;
