import type { IconName, IconProps } from '@/skin/displays';
import { Icon } from '@/skin/displays';

import type { LinkProps } from '../Link';
import Link from '../Link';
import type { LinkVariantBase } from '../LinkBase/types';

export type LinkIconProps = Omit<
  LinkProps,
  | 'startIcon'
  | 'endIcon'
  | 'withIcon'
  | 'variant'
  | 'className'
  | 'size'
  | 'children'
  | 'italic'
> &
  Pick<IconProps, 'size'> & {
    icon: IconName;
    variant?: LinkVariantBase;
  };

const LinkIcon = ({
  'data-testid': testId = 'link-icon',
  icon,
  size,
  ...rest
}: LinkIconProps) => {
  return (
    <Link data-testid={testId} {...rest} withIcon={false}>
      <Icon name={icon} size={size} currentColor />
    </Link>
  );
};

export default LinkIcon;
