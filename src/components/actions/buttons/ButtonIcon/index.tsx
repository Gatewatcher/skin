import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { Modify } from '@gatewatcher/bistoury/utils-types';

import type { IconName } from '@/skin/displays';
import { Icon } from '@/skin/displays';

import type { ButtonBaseProps, InternalButtonBaseProps } from '../ButtonBase';
import ButtonBase from '../ButtonBase';
import { DEFAULT_VARIANT } from '../ButtonBase/constants';
import { DEFAULT_SIZE, DEFAULT_TYPE } from './constants';
import type { ButtonSize, ButtonType } from './types';

import styles from './styles.module.scss';

export type ButtonIconProps = Modify<ButtonBaseProps, { type?: ButtonType }> & {
  icon: IconName;
  size?: ButtonSize;
};

type InternalButtonIconProps = Pick<
  InternalButtonBaseProps,
  'classNameInternal'
>;

export const InternalButtonIcon = ({
  className,
  classNameInternal,
  'data-testid': testId = 'button-icon',
  icon,
  size = DEFAULT_SIZE,
  type = DEFAULT_TYPE,
  variant = DEFAULT_VARIANT,
  ...rest
}: ButtonIconProps & InternalButtonIconProps) => {
  return (
    <ButtonBase
      classNameInternal={classNames(
        classNameInternal,
        variant !== 'bared' && [
          stylesToCamelCase(styles, 'size', size),
          stylesToCamelCase(styles, variant, type),
          className,
        ],
        variant !== 'transparent' && variant !== 'bared' && styles.ButtonIcon,
        variant === 'bared' && className,
      )}
      data-testid={testId}
      type={type}
      variant={variant}
      {...rest}
    >
      <Icon name={icon} size={size} currentColor />
    </ButtonBase>
  );
};

const ButtonIcon = (props: ButtonIconProps) => (
  <InternalButtonIcon {...props} />
);

export default ButtonIcon;
