import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentProps, MouseEvent } from 'react';
import type { To } from 'react-router-dom';

import type { ItemLinkProps as SelectableItemLinkProps } from '@/skin/actions/selectable/SelectableItemLink';
import { SelectableItemLink } from '@/skin/actions/selectable/SelectableItemLink';

import { useFloatingContext } from '../../Floating/context';
import { DEFAULT_WITH_CLOSE_ON_ACTION } from '../constants';
import type { DropdownItemSharedProps } from '../types';

export type DropdownItemLinkProps = DataTestId &
  DropdownItemSharedProps &
  SelectableItemLinkProps &
  Omit<ComponentProps<'a'>, 'className' | 'href' | 'style'> & {
    to: To;
  };

const Link = ({
  children,
  'data-testid': testId = 'dropdown-item-link',
  onClick,
  to,
  withCloseOnAction = DEFAULT_WITH_CLOSE_ON_ACTION,
  ...rest
}: DropdownItemLinkProps) => {
  const { close } = useFloatingContext();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    withCloseOnAction && close();
  };

  return (
    <SelectableItemLink
      data-testid={testId}
      onClick={handleClick}
      to={to}
      {...rest}
    >
      {children}
    </SelectableItemLink>
  );
};

export default Link;
