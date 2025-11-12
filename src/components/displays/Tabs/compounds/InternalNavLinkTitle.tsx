import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode, Ref } from 'react';
import { useEffect } from 'react';
import type { To } from 'react-router-dom';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

import type { TitleListVariant } from '../types';

import styles from '../styles.module.scss';

export type InternalNavLinkTitleProps = DataTestId & {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  ref?: Ref<HTMLAnchorElement>;
  to: To;
  variant: TitleListVariant;
};

const InternalNavLinkTitle = ({
  'data-testid': testid,
  disabled,
  onClick,
  children,
  ref,
  to,
  variant,
}: InternalNavLinkTitleProps) => {
  const path = useResolvedPath(to);
  const match = useMatch(`${path.pathname}/*`);

  useEffect(() => {
    if (match) {
      onClick();
    }
  }, [match, onClick]);

  return (
    <NavLink
      ref={ref}
      className={({ isActive }) =>
        classNames(
          styles.Title,
          styles.TitleLink,
          styles[variant],
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
    </NavLink>
  );
};

export default InternalNavLinkTitle;
