import type { LinkProps } from '@/skin/actions';
import { LinkIcon } from '@/skin/actions';
import type { IconName } from '@/skin/displays';
import { Dropdown, Tooltip } from '@/skin/displays';

import { useTableActionsContext } from '../contexts';

export type TableActionLinkProps = Omit<
  LinkProps,
  'variant' | 'className' | 'withIcon' | 'startIcon' | 'endIcon' | 'size'
> & {
  icon?: IconName;
};

const TableActionLink = ({
  children,
  'data-testid': testId = 'table-action-link',
  ...rest
}: TableActionLinkProps) => {
  const { hasOnlyOneAction } = useTableActionsContext();

  return !hasOnlyOneAction ? (
    <Dropdown.Link data-testid={testId} icon="Link" {...rest}>
      {children}
    </Dropdown.Link>
  ) : (
    <Tooltip content={children} triggerOn="hover">
      <LinkIcon
        data-testid={testId}
        icon="Link"
        {...rest}
        size="medium"
        variant="secondary"
      />
    </Tooltip>
  );
};

export default TableActionLink;
