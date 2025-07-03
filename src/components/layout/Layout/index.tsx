import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import DrawerProvider from '@/skin/displays/Drawer/provider';

import PanelLayout from './PanelLayout';
import LayoutRow from './compounds/LayoutRow';
import { LAYOUT_CONTENT_GRID_PADDINGS } from './constants';

import styles from './styles.module.scss';

export type LayoutProps = {
  banner?: ReactNode;
  sideNav?: ReactNode;
  topNav?: ReactNode;
  children: ReactNode;
  drawer?: ReactNode;
  topNavHeight?: string;
  contentGridPadding?: Spacings['padding'] | (() => Spacings['padding']);
};

/**
 * @deprecated Prefer using `LayoutV2`.
 *
 * Will be removed 01/05/2025.
 */
const Layout = ({
  banner,
  children,
  sideNav,
  topNav,
  drawer,
  topNavHeight = 'var(--navbar-height)',
  contentGridPadding = LAYOUT_CONTENT_GRID_PADDINGS,
}: LayoutProps) => {
  const padding = isFunction(contentGridPadding)
    ? contentGridPadding()
    : contentGridPadding;

  return (
    <div className={styles.Layout}>
      <div className={styles.sideNavZone}>{sideNav}</div>
      <DrawerProvider topNavHeight={topNavHeight} withTopNav={!!topNav}>
        <PanelLayout
          banner={banner}
          contentGridPadding={padding}
          drawer={drawer}
          topNav={topNav}
          topNavHeight={topNavHeight}
        >
          {children}
        </PanelLayout>
      </DrawerProvider>
    </div>
  );
};

Layout.Row = LayoutRow;

export default Layout;
