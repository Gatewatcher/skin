import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { MouseEvent, ReactNode } from 'react';

import type { ButtonIconProps } from '@/skin/actions';
import { ButtonIcon } from '@/skin/actions';

import { useFloatingContext } from '../../../displays/floating/Floating/context';
import Tooltip from '../../../displays/floating/Tooltip';
import { InternalButton } from '../../buttons/Button';
import { useFloatingActionsContext } from '../context';

import styles from '../styles.module.scss';

export type FloatingActionsButtonProps = DataTestId &
  Pick<ButtonIconProps, 'icon' | 'onClick' | 'type'> & {
    label?: ReactNode;
    withCloseOnAction?: boolean;
  };

const Action = ({
  'data-testid': testId = 'floating-actions-action',
  icon,
  label,
  onClick,
  type = 'neutral',
  withCloseOnAction = true,
}: FloatingActionsButtonProps) => {
  const { close } = useFloatingContext();

  const { onlyOneAction } = useFloatingActionsContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    withCloseOnAction && close();
  };

  const children = (
    <ButtonIcon
      data-testid={testId}
      icon={icon}
      onClick={handleClick}
      size="small"
      type={type}
      variant="ghosted"
    />
  );

  return !!onlyOneAction.current && !!label ? (
    <InternalButton
      className={styles.Button}
      data-testid={testId}
      onClick={handleClick}
      size="small"
      startIcon={icon}
      variant="bared"
    >
      {label}
    </InternalButton>
  ) : (
    <Tooltip content={label} data-testid={testId} isDisabled={!label}>
      {children}
    </Tooltip>
  );
};

export default Action;
