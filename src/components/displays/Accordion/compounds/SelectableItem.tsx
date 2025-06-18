import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentProps, MouseEvent } from 'react';

import type { ItemButtonProps } from '@/skin/actions/selectable/SelectableItemButton';
import { SelectableItemButton } from '@/skin/actions/selectable/SelectableItemButton';

export type SelectableItemProps = DataTestId &
  ItemButtonProps &
  Omit<ComponentProps<'button'>, 'className' | 'style' | 'type'>;

const SelectableItem = ({
  children,
  'data-testid': testId = 'accordion-item',
  onClick,
  ...rest
}: SelectableItemProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  return (
    <SelectableItemButton
      data-testid={testId}
      onClick={handleClick}
      fill
      {...rest}
    >
      {children}
    </SelectableItemButton>
  );
};

export default SelectableItem;
