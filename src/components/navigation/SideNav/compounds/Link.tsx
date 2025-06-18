import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { NavLink } from 'react-router-dom';

import type { LinkProps } from '@/skin/actions';
import { Link } from '@/skin/actions';
import type { IconName } from '@/skin/displays';
import { Icon, Tooltip } from '@/skin/displays';

import { useSidenavContext } from '../context';

import styles from '../styles.module.scss';

type SideNavChildrenProps = Pick<SideNavLinkProps, 'children' | 'icon'>;

const SideNavChildren = ({ children, icon }: SideNavChildrenProps) => {
  const { isOpened } = useSidenavContext();
  return (
    <>
      <Icon name={icon} size="large" />
      <span
        className={classNames(
          styles.LinkText,
          !isOpened && styles.LinkTextClosed,
        )}
      >
        {children}
      </span>
    </>
  );
};

export type SideNavLinkProps = DataTestId &
  Pick<LinkProps, 'to' | 'children' | 'isExternal' | 'target'> & {
    icon: IconName;
  };

const SideNavLink = ({
  children,
  'data-testid': testId = 'side-nav-link',
  icon,
  isExternal,
  to,
}: SideNavLinkProps) => {
  const { isOpened } = useSidenavContext();
  const sharedProps = {
    'data-testid': testId,
  };

  return (
    <Tooltip content={children} isDisabled={isOpened} placement="right">
      <li className={classNames(styles.Link, !isOpened && styles.LinkClosed)}>
        {isExternal ? (
          <Link
            className={classNames(
              styles.LinkNav,
              !isOpened && styles.LinkNavClosed,
            )}
            to={to.toString()}
            variant="bared"
            {...sharedProps}
          >
            <SideNavChildren icon={icon}>{children}</SideNavChildren>
          </Link>
        ) : (
          <NavLink
            className={({ isActive }) =>
              classNames(
                styles.LinkNav,
                isActive && styles.LinkNavActive,
                !isOpened && styles.LinkNavClosed,
              )
            }
            to={to}
            {...sharedProps}
          >
            <SideNavChildren icon={icon}>{children}</SideNavChildren>
          </NavLink>
        )}
      </li>
    </Tooltip>
  );
};

export default SideNavLink;
