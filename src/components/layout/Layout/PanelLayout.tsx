import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import { useDrawerContext } from '@/skin/displays/Drawer/context';
import Panels from '@/skin/displays/Panels';

import Grid from '../Grid';
import {
  LAYOUT_COLUMNS,
  LAYOUT_CONTENT_GRID_PADDINGS,
  LAYOUT_GAPS,
} from './constants';
import { buildPanelLayoutTestIds } from './utils';

import styles from './styles.module.scss';

export type PanelLayoutProps = DataTestId & {
  banner?: ReactNode;
  sideNav?: ReactNode;
  topNav?: ReactNode;
  children: ReactNode;
  drawer?: ReactNode;
  topNavHeight?: string;
  contentGridPadding?: Spacings['padding'];
};

const PanelLayout = ({
  banner,
  'data-testid': testId = 'panel-layout',
  topNav,
  children,
  drawer,
  topNavHeight = 'var(--navbar-height)',
  contentGridPadding = LAYOUT_CONTENT_GRID_PADDINGS,
}: PanelLayoutProps) => {
  const testIds = buildPanelLayoutTestIds(testId);
  const { isOpened, offsetTop } = useDrawerContext();

  const innerHeight = `calc(100vh${
    topNav ? ` - ${topNavHeight}` : ''
  } - ${offsetTop}px)`;

  return (
    <main className={styles.mainZone}>
      {(topNav || banner) && (
        <div className={styles.topNavZone} data-testid={testIds.topNavZone}>
          {topNav}
          {banner}
        </div>
      )}
      <Panels>
        <Panels.Group autoSaveId="persistence" direction="horizontal">
          <Panels.Item
            className={classNames(!!drawer && styles.panelOverflow)}
            minSize={0}
            order={1}
            collapsible
          >
            <div
              className={classNames(
                styles.contentZone,
                isOpened && styles.contentZoneMinWidth,
              )}
              style={{ height: innerHeight }}
            >
              <Grid
                columns={LAYOUT_COLUMNS}
                data-testid={testIds.contentGrid}
                gap={LAYOUT_GAPS}
                padding={contentGridPadding}
                isContainer
              >
                {children}
              </Grid>
            </div>
          </Panels.Item>
          {drawer}
        </Panels.Group>
      </Panels>
    </main>
  );
};

export default PanelLayout;
