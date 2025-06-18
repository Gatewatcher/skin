import { Dropdown } from '@/skin/displays';
import type { DropdownButtonProps } from '@/skin/displays/floating/Dropdown/compounds/Button';

const NavigationItemAvatarButton = ({
  children,
  'data-testid': testId = 'navigation-item-button',
  ...rest
}: DropdownButtonProps) => {
  return (
    <Dropdown.Button data-testid={testId} {...rest}>
      {children}
    </Dropdown.Button>
  );
};

export default NavigationItemAvatarButton;
