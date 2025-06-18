import { Dropdown } from '@/skin/displays';
import type { DropdownItemLinkProps } from '@/skin/displays/floating/Dropdown/compounds/Link';

const SideNavItemLink = ({
  children,
  'data-testid': testId = 'sidenav-item-link',
  ...rest
}: DropdownItemLinkProps) => {
  return (
    <Dropdown.Link data-testid={testId} {...rest}>
      {children}
    </Dropdown.Link>
  );
};

export default SideNavItemLink;
