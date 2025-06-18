import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { forwardRef, useEffect } from 'react';
import type { To } from 'react-router-dom';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

import type { TitleListVariant } from '../types';

import styles from '../styles.module.scss';

export type InternalNavLinkTitleProps = DataTestId & {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  to: To;
  variant: TitleListVariant;
};

const InternalNavLinkTitle = forwardRef<
  HTMLAnchorElement,
  InternalNavLinkTitleProps
>(
  (
    { 'data-testid': testid, disabled, onClick, children, to, variant },
    ref,
  ) => {
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
  },
);

export default InternalNavLinkTitle;
