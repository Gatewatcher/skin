import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentProps } from 'react';

import Button from '../buttons/Button';
import type { ItemContentProps } from './ItemContent';
import ItemContent from './ItemContent';
import { buildItemClassName, getAttritbutes } from './utils';

export type ItemButtonProps = DataTestId &
  ItemContentProps &
  Omit<ComponentProps<'button'>, 'className' | 'style' | 'type'>;

export const SelectableItemButton = ({
  children,
  'data-testid': testId = 'selectable-item',
  onClick,
  ...rest
}: ItemButtonProps) => {
  return (
    <Button
      className={buildItemClassName(rest)}
      data-testid={testId}
      onClick={onClick}
      variant="bared"
      {...getAttritbutes(rest)}
    >
      <ItemContent {...rest}>{children}</ItemContent>
    </Button>
  );
};
