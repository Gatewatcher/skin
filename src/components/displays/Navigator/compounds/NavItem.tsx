import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type { To } from 'react-router-dom';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import TextIcon from '../../TextIcon';
import type { IconName } from '../../icons/types';
import { useNavigatorContext } from '../context';
import type { NavId, NavIdProps } from '../types';
import NavLink from './NavLink';

import styles from '../styles.module.scss';

export type NavItemProps = NavIdProps &
  DataTestId & {
    children: ReactNode;
    disabled?: boolean;
    icon?: IconName;
    to?: To;
    sectionId?: NavId;
  };

const NavItem = ({
  children,
  'data-testid': testId = 'nav-item',
  disabled,
  icon,
  to,
  id,
  sectionId,
}: NavItemProps) => {
  const {
    currentSection,
    currentNavItem,
    setCurrentSection,
    setCurrentNavItem,
    onNavItemChange,
  } = useNavigatorContext();
  const isActive = useMemo(
    () => currentSection === sectionId && currentNavItem === id,
    [currentSection, currentNavItem, sectionId, id],
  );
  const navItemTestId = isActive ? suffixTestId(testId, 'active') : testId;

  const handleClick = () => {
    if (disabled || !isDefined(id) || !isDefined(sectionId)) return;

    setCurrentSection(sectionId);
    setCurrentNavItem(id);
    onNavItemChange({ sectionId, navItemId: id });
  };

  const getContent = () => {
    return icon ? (
      <TextIcon iconSize="small" startIcon={icon} currentColor>
        {children}
      </TextIcon>
    ) : (
      <Text weight={isActive ? 'medium' : 'regular'}>{children}</Text>
    );
  };

  return (
    <Stack
      className={classNames(styles.NavItemContainer, isActive && styles.active)}
    >
      {to ? (
        <NavLink
          data-testid={navItemTestId}
          disabled={disabled}
          onClick={handleClick}
          to={to}
        >
          {getContent()}
        </NavLink>
      ) : (
        <Button
          className={classNames(
            styles.NavItem,
            styles.padding,
            isActive && styles.active,
            disabled && styles.disabled,
          )}
          data-testid={navItemTestId}
          disabled={disabled}
          onClick={handleClick}
          variant="bared"
        >
          {getContent()}
        </Button>
      )}
    </Stack>
  );
};

export default NavItem;
