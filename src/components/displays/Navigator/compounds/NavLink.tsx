import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { To } from 'react-router-dom';
import {
  NavLink as SkinNavLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

import styles from '../styles.module.scss';

export type NavLinkProps = DataTestId & {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  ref?: React.Ref<HTMLAnchorElement>;
  to: To;
};

const NavLink = ({
  'data-testid': testid,
  disabled,
  onClick,
  children,
  ref,
  to,
}: NavLinkProps) => {
  const path = useResolvedPath(to);
  const match = useMatch(`${path.pathname}/*`);

  useEffect(() => {
    if (match) {
      onClick();
    }
  }, [match, onClick]);

  return (
    <SkinNavLink
      ref={ref}
      className={({ isActive }) =>
        classNames(
          styles.NavItem,
          styles.NavItemLink,
          isActive && styles.active,
          disabled && styles.disabled,
        )
      }
      data-testid={testid}
      onClick={onClick}
      tabIndex={disabled ? -1 : undefined}
      to={to}
    >
      {children}
    </SkinNavLink>
  );
};

export default NavLink;
