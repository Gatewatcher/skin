import { useAsyncDebounce } from '@gatewatcher/bistoury/hooks';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import { DrawerV2, SidePanel } from '@/skin/displays';
import {
  getPersistedPanelWidth,
  persistPanelWidth,
} from '@/skin/displays/drawerPanels/DrawerV2/PanelLayout/utils/drawerPanelWidth';
import { Grid } from '@/skin/layout';

import LayoutRow from './compounds/LayoutRow';
import {
  DEFAULT_DRAWER_CONFIG,
  DEFAULT_SIDE_PANEL_CONFIG,
  LAYOUT_COLUMNS,
  LAYOUT_CONTENT_GRID_PADDINGS,
  LAYOUT_GAPS,
} from './constants';
import type { DrawerConfig, MainContentConfig, SidePanelConfig } from './types';

import styles from './styles.module.scss';

export type LayoutV2Props = {
  banner?: ReactNode;
  children: ReactNode;
  contentGridPadding?: (() => Spacings['padding']) | Spacings['padding'];
  drawerConfig?: DrawerConfig;
  sideNav?: ReactNode;
  sidePanelConfig?: SidePanelConfig;
  topNav?: ReactNode;
  mainContentConfig?: MainContentConfig;
};

const LayoutV2 = ({
  banner,
  children,
  contentGridPadding = LAYOUT_CONTENT_GRID_PADDINGS,
  drawerConfig,
  sideNav,
  sidePanelConfig,
  topNav,
  mainContentConfig,
}: LayoutV2Props) => {
  const { initialWidth, mainContentMinWidth, matches, minWidth } = {
    ...DEFAULT_DRAWER_CONFIG,
    ...drawerConfig,
  };
  const { width: sidePanelWidth } = {
    ...DEFAULT_SIDE_PANEL_CONFIG,
    ...sidePanelConfig,
  };

  const drawerResizeHandler = (id: string | null, width: number) => {
    if (id) {
      persistPanelWidth(id, width);
    }
  };

  const drawerResizeHandlerDebounced = useAsyncDebounce(
    drawerResizeHandler,
    100,
  );

  const padding = isFunction(contentGridPadding)
    ? contentGridPadding()
    : contentGridPadding;

  const mainContent = (
    <Grid
      columns={LAYOUT_COLUMNS}
      gap={LAYOUT_GAPS}
      padding={padding}
      style={{ height: mainContentConfig?.height }}
      isContainer
    >
      {children}
    </Grid>
  );

  return (
    <SidePanel.Provider>
      {sidePanelApi => (
        <DrawerV2.Provider matches={matches}>
          {drawerApi => (
            <>
              {banner && <div className={styles.Banner}>{banner}</div>}
              <div className={styles.LayoutV2}>
                <div className={styles.sideNavZone}>{sideNav}</div>
                <div className={styles.topNavAndMainZone}>
                  {topNav}
                  <SidePanel.Layout>
                    {sidePanelApi.isOpened && (
                      <SidePanel.Panel width={sidePanelWidth}>
                        {sidePanelApi.content}
                      </SidePanel.Panel>
                    )}
                    <div className={styles.mainZone}>
                      <DrawerV2.Layout
                        contentPanelMinWidth={
                          drawerApi.options?.mainContentMinWidth ??
                          mainContentMinWidth
                        }
                        initialDrawerWidth={
                          (drawerApi.currentId &&
                            getPersistedPanelWidth(drawerApi.currentId)) ||
                          initialWidth
                        }
                        onResize={width =>
                          drawerResizeHandlerDebounced(
                            drawerApi.currentId,
                            width,
                          )
                        }
                        containerClassName={styles.contentContainer}
                        drawerContent={drawerApi.content}
                        drawerMinWidth={minWidth}
                        mainContent={mainContent}
                        mainPanelHeight={mainContentConfig?.height}
                        onCloseDrawer={drawerApi.close}
                        showDrawer={drawerApi.isOpened}
                      />
                    </div>
                  </SidePanel.Layout>
                </div>
              </div>
            </>
          )}
        </DrawerV2.Provider>
      )}
    </SidePanel.Provider>
  );
};

LayoutV2.Row = LayoutRow;

export default LayoutV2;

export type { DrawerConfig } from './types';
