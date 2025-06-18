import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentProps, MouseEvent } from 'react';

import type { ItemButtonProps } from '@/skin/actions/selectable/SelectableItemButton';
import { SelectableItemButton } from '@/skin/actions/selectable/SelectableItemButton';

import { useFloatingContext } from '../../Floating/context';
import { DEFAULT_WITH_CLOSE_ON_ACTION } from '../constants';
import type { DropdownItemSharedProps } from '../types';

export type DropdownButtonProps = DataTestId &
  DropdownItemSharedProps &
  ItemButtonProps &
  Omit<ComponentProps<'button'>, 'className' | 'style' | 'type'>;

const Button = ({
  children,
  'data-testid': testId = 'dropdown-item',
  onClick,
  withCloseOnAction = DEFAULT_WITH_CLOSE_ON_ACTION,
  ...rest
}: DropdownButtonProps) => {
  const { close } = useFloatingContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    withCloseOnAction && close();
  };

  return (
    <SelectableItemButton data-testid={testId} onClick={handleClick} {...rest}>
      {children}
    </SelectableItemButton>
  );
};

export default Button;
