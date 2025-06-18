import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { get, set } from '@gatewatcher/bistoury/utils-web-storage';
import type { ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';

import { ButtonIcon } from '@/skin/actions';
import PoweredByGatewatcher from '@/skin/displays/PoweredByGatewatcher';
import { Stack } from '@/skin/layout';

import SideNavAvatar from './compounds/Avatar';
import SideNavFooter from './compounds/Footer';
import SideNavHeader from './compounds/Header';
import SideNavItem from './compounds/Item';
import SideNavItemButton from './compounds/ItemButton';
import SideNavItemLink from './compounds/ItemLink';
import SideNavLink from './compounds/Link';
import { SIDENAV_IS_OPENED_STORAGE_KEY } from './constants';
import { SidenavContext } from './context';

import styles from './styles.module.scss';

export type SideNavProps = DataTestId & {
  children: ReactNode;
  footer?:
    | ReactNode
    | ((elements: { poweredByGatewatcher: ReactNode }) => ReactNode);
  header?: ReactNode;
  withPoweredByGatewatcher?: boolean;
};

const SideNav = ({
  children,
  'data-testid': testId = 'side-nav',
  footer,
  header,
  withPoweredByGatewatcher = true,
}: SideNavProps) => {
  const [isOpened, setIsOpened] = useState(
    !!get(SIDENAV_IS_OPENED_STORAGE_KEY),
  );

  const handleClickOpenButton = () => {
    setIsOpened(state => !state);
  };

  useEffect(() => {
    set(SIDENAV_IS_OPENED_STORAGE_KEY, isOpened);
  }, [isOpened]);

  return (
    <SidenavContext.Provider value={{ isOpened }}>
      <nav
        className={classNames(styles.SideNav, isOpened && styles.SideNavOpened)}
        data-testid={testId}
      >
        <ButtonIcon
          className={classNames(styles.Button, isOpened && styles.ButtonOpened)}
          data-testid="button-toggle-nav"
          icon="ChevronRight"
          onClick={handleClickOpenButton}
          variant="bared"
        />

        {header}

        <Stack
          as="ul"
          className={styles.linkList}
          direction="column"
          flexGrow={1}
          gap={7}
          margin={0}
          padding={{ y: 5, x: 0 }}
        >
          {children}
        </Stack>

        {isFunction(footer)
          ? footer({ poweredByGatewatcher: <PoweredByGatewatcher /> })
          : footer}
        {withPoweredByGatewatcher && isOpened && <PoweredByGatewatcher />}
      </nav>
    </SidenavContext.Provider>
  );
};

SideNav.Avatar = memo(SideNavAvatar);
SideNav.Footer = memo(SideNavFooter);
SideNav.Header = memo(SideNavHeader);
SideNav.Item = memo(SideNavItem);
SideNav.ItemLink = memo(SideNavItemLink);
SideNav.ItemButton = memo(SideNavItemButton);
SideNav.Link = memo(SideNavLink);

export default SideNav;
