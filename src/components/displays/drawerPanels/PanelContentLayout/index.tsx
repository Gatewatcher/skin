import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { type ReactNode, useState } from 'react';

import StickyProvider from './components/StickyProvider';
import Actions from './compounds/Actions';
import Body from './compounds/Body';
import Footer from './compounds/Footer';
import Header from './compounds/Header';
import SubHeader from './compounds/SubHeader';
import Title from './compounds/Title';

import styles from './styles.module.scss';

export type PanelContentLayoutProps = DataTestId & {
  children?: ReactNode;
};

const PanelContentLayout = ({
  'data-testid': testId = 'panel-content-layout',
  children,
}: PanelContentLayoutProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <StickyProvider scrollTop={scrollTop}>
      <div
        ref={setElement}
        className={classNames(styles.PanelContentLayout, styles.fill)}
        data-testid={testId}
        onScroll={() => setScrollTop(element?.scrollTop ?? 0)}
      >
        {children}
      </div>
    </StickyProvider>
  );
};

PanelContentLayout.Actions = Actions;
PanelContentLayout.Body = Body;
PanelContentLayout.Footer = Footer;
PanelContentLayout.Header = Header;
PanelContentLayout.Title = Title;
PanelContentLayout.SubHeader = SubHeader;

export default PanelContentLayout;
