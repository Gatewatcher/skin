import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { MouseEvent, ReactNode } from 'react';

import { ButtonIcon } from '@/skin/actions';
import type { ButtonBaseProps } from '@/skin/actions/buttons/ButtonBase';
import type { IconName } from '@/skin/displays';
import { Dropdown, Tooltip } from '@/skin/displays';
import type { DropdownButtonProps } from '@/skin/displays/floating/Dropdown/compounds/Button';
import { useFloatingContext } from '@/skin/displays/floating/Floating/context';

import { ACTION_CELL_TYPE } from '../constants';
import { useTableActionsContext } from '../contexts';

export type TableActionCellButtonProps = DataTestId &
  Pick<ButtonBaseProps, 'disabled'> &
  Pick<DropdownButtonProps, 'type' | 'onClick'> & {
    children: ReactNode;
    className?: string;
    icon: IconName;
  };

const TableActionButton = ({
  children,
  'data-testid': testId = 'table-action-button',
  disabled,
  icon,
  type,
  onClick,
}: TableActionCellButtonProps) => {
  const { close } = useFloatingContext();
  const { hasOnlyOneAction } = useTableActionsContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.(event);
    setTimeout(close, 150);
  };

  return !hasOnlyOneAction ? (
    <Dropdown.Button
      data-testid={testId}
      disabled={disabled}
      icon={icon}
      onClick={handleClick}
      type={type}
    >
      {children}
    </Dropdown.Button>
  ) : (
    <Tooltip content={children} isDisabled={disabled} triggerOn="hover">
      <ButtonIcon
        data-testid={testId}
        disabled={disabled}
        icon={icon}
        onClick={handleClick}
        type={type ? ACTION_CELL_TYPE[type] : 'neutral'}
        variant="ghosted"
      />
    </Tooltip>
  );
};

export default TableActionButton;
