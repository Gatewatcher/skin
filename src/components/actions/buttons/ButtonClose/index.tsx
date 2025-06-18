import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { ButtonIconProps } from '@/skin/actions';

import { InternalButtonIcon } from '../ButtonIcon';

import styles from './styles.module.scss';

export type ButtonCloseProps = DataTestId &
  Omit<
    ButtonIconProps,
    | 'behavior'
    | 'icon'
    | 'endElement'
    | 'startElement'
    | 'type'
    | 'variant'
    | 'className'
  > & {
    rounded?: boolean;
  };

export type InternalButtonCloseProps = {
  className?: string;
};

export const InternalButtonClose = ({
  className,
  'data-testid': testId = 'button-close',
  rounded,
  ...rest
}: ButtonCloseProps & InternalButtonCloseProps) => {
  return (
    <InternalButtonIcon
      classNameInternal={classNames(
        styles.ButtonClose,
        rounded && styles.rounded,
      )}
      behavior="button"
      className={className}
      data-testid={testId}
      icon="Close"
      variant="ghosted"
      {...rest}
    />
  );
};

const ButtonClose = (props: ButtonCloseProps) => (
  <InternalButtonClose {...props} />
);

export default ButtonClose;
