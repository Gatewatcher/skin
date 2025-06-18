import { Dropdown } from '@/skin/displays';
import type { DropdownButtonProps } from '@/skin/displays/floating/Dropdown/compounds/Button';

const SideNavItemButton = ({
  children,
  'data-testid': testId = 'sidenav-item-button',
  ...rest
}: DropdownButtonProps) => {
  return (
    <Dropdown.Button data-testid={testId} {...rest}>
      {children}
    </Dropdown.Button>
  );
};

export default SideNavItemButton;
