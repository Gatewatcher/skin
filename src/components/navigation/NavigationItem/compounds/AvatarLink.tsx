import { Dropdown } from '@/skin/displays';
import type { DropdownItemLinkProps } from '@/skin/displays/floating/Dropdown/compounds/Link';

const NavigationItemAvatarLink = ({
  children,
  'data-testid': testId = 'navigation-item-link',
  ...rest
}: DropdownItemLinkProps) => {
  return (
    <Dropdown.Link data-testid={testId} {...rest}>
      {children}
    </Dropdown.Link>
  );
};

export default NavigationItemAvatarLink;
