import type { LinkProps } from '@/skin/actions';
import { Link } from '@/skin/actions';
import type { ItemContentProps } from '@/skin/actions/selectable/ItemContent';
import ItemContent from '@/skin/actions/selectable/ItemContent';

import { buildItemClassName } from './utils';

export type ItemLinkProps = Omit<LinkProps, 'size'> & ItemContentProps;

export const SelectableItemLink = ({
  children,
  'data-testid': testId = 'selectable-item-link',
  to,
  withIcon = false,
  ...rest
}: ItemLinkProps) => {
  const className = buildItemClassName(rest);

  return (
    <Link
      className={className}
      data-testid={testId}
      to={to}
      withIcon={withIcon}
      {...rest}
      variant="bared"
    >
      <ItemContent {...rest}>{children}</ItemContent>
    </Link>
  );
};
