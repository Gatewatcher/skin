import type { LinkProps } from '@/skin/actions';
import { Link as SkinLink } from '@/skin/actions';
import { useFloatingContext } from '@/skin/displays/floating/Floating/context';

import { DEFAULT_CLOSE_NAV_ON_CLICK } from '../constants';

import styles from '../styles.module.scss';

export type NavigationItemLinkProps = Omit<
  LinkProps,
  'className' | 'activeClassName' | 'variant'
> & {
  closeNavOnClick?: boolean;
};

const Link = ({
  children,
  closeNavOnClick = DEFAULT_CLOSE_NAV_ON_CLICK,
  'data-testid': testId = 'navigation-item-link',
  ...rest
}: NavigationItemLinkProps) => {
  const { close } = useFloatingContext();

  return (
    <SkinLink
      activeClassName={styles.LinkActive}
      as="navlink"
      data-testid={testId}
      onClick={closeNavOnClick ? close : undefined}
      variant="secondary"
      {...rest}
    >
      {children}
    </SkinLink>
  );
};

export default Link;
