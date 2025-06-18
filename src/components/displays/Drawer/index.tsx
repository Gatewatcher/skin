import {
  useDidMountEffect,
  useOnWindowResize,
} from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { set } from '@gatewatcher/bistoury/utils-web-storage';
import type { ReactNode } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Stack } from '@/skin/layout';

import Panels from '../panels';
import type { ImperativePanelHandle } from '../panels/compounds/PanelsItem';
import Actions from './compounds/Actions';
import Body from './compounds/Body';
import Close from './compounds/Close';
import Content from './compounds/Content';
import Fill from './compounds/Fill';
import Footer from './compounds/Footer';
import Header from './compounds/Header';
import HeaderSticky from './compounds/HeaderSticky';
import Maximize from './compounds/Maximize';
import Title from './compounds/Title';
import {
  DEFAULT_MATCHES,
  DEFAULT_URL_KEY,
  DEFAULT_WITH_ESCAPE,
  MIN_SIZE_PERCENTAGE,
  SPACING_OFFSET,
  STORAGE_KEY,
} from './constants';
import { useDrawerContext } from './context';
import type { DrawerMatches } from './types';
import { getContent } from './utils';

import styles from './styles.module.scss';

export type DrawerProps = DataTestId & {
  matches?: DrawerMatches;
  withEscape?: boolean;
};

/**
 * @deprecated Prefer using `DrawerV2`.
 *
 * Will be removed 01/05/2025.
 */
const Drawer = ({
  'data-testid': testId = 'drawer',
  matches: matchesProps = DEFAULT_MATCHES,
  withEscape: withEscapeProps = DEFAULT_WITH_ESCAPE,
}: DrawerProps) => {
  const {
    setContentRef,
    isOpened,
    offsetTop,
    close,
    open,
    matches,
    withEscape,
    resizeRef,
    setMaxSizeRef,
    setMaximizeRef,
    setCurrentPropsRef,
    persistence,
    topNavHeight,
    withTopNav,
  } = useDrawerContext();
  const { pathname } = useLocation();

  const [content, setContent] = useState<ReactNode>();

  setContentRef.current = setContent;
  withEscape.current = withEscapeProps;
  matches.current = matchesProps;

  const ref = useRef<ImperativePanelHandle>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [panelSize, setPanelSize] = useState<number>();
  const [maxSizePercentage, setMaxSizePercentage] = useState<number>();
  const [searchParams] = useSearchParams();
  const innerHeight = `calc(100vh${
    withTopNav ? ` - ${topNavHeight}` : ''
  } - ${offsetTop}px)`;

  const { setId } = useDrawerContext();

  resizeRef.current = ref?.current?.resize;
  setMaxSizeRef.current = setMaxSizePercentage;

  useDidMountEffect(() => {
    const { keepOn, closeOn } = persistence;

    if (keepOn && !keepOn.test(pathname)) {
      close();
    }
    if (closeOn?.test(pathname)) {
      close();
    }
  }, [pathname]);

  const handlePanelSize = () => {
    if (!containerRef.current) {
      return;
    }
    if (setMaximizeRef?.current && maxSizePercentage && ref?.current) {
      const sizeTreshold = (maxSizePercentage + MIN_SIZE_PERCENTAGE) / 2;
      setMaximizeRef?.current(ref?.current?.getSize?.() > sizeTreshold);
    }
    setPanelSize(containerRef.current.clientWidth - SPACING_OFFSET);
  };

  const handleResize = () => {
    const panel = ref.current;
    if (!panel) {
      return;
    }

    handlePanelSize();
  };

  useOnWindowResize(() => {
    handleResize();
  });

  useEffect(() => {
    const observer = new ResizeObserver(handleResize);

    if (containerRef?.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mutationObserver = new MutationObserver(handleResize);

    const elements = document.querySelectorAll('[data-panel]');
    Array.from(elements).forEach(element => {
      mutationObserver.observe(element, {
        attributes: true,
      });
    });

    return () => {
      mutationObserver.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleResize();
    set(STORAGE_KEY, isOpened);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  useDidMountEffect(() => {
    if (!isOpened) {
      setCurrentPropsRef.current?.(undefined);
      persistence.clean?.();
    }
  }, [isOpened]);

  useEffect(() => {
    const id = searchParams.get(DEFAULT_URL_KEY);
    if (!id) {
      close();
      return;
    }

    const props = Object.fromEntries(
      [...searchParams].reduce((acc, param) => {
        const [prefix, keyName] = param[0].split('_');
        if (keyName && prefix === DEFAULT_URL_KEY) {
          acc.push([keyName, param[1]]);
        }
        return acc;
      }, [] as [string, string][]),
    );

    const content = getContent(matches.current, id, props);
    if (!content) return;

    setContent(content);
    setId(id);
    open(props);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isOpened && (
        <>
          <Panels.ResizeHandle />
          <Panels.Item
            ref={ref}
            defaultSize={MIN_SIZE_PERCENTAGE}
            maxSize={maxSizePercentage}
            minSize={MIN_SIZE_PERCENTAGE}
            order={2}
          >
            <div ref={containerRef}>
              <Stack
                className={styles.inner}
                data-testid={testId}
                direction="column"
                padding={{ x: 9 }}
                style={{ width: `${panelSize}px`, height: innerHeight }}
              >
                {content}
              </Stack>
            </div>
          </Panels.Item>
        </>
      )}
    </>
  );
};

Drawer.Actions = memo(Actions);
Drawer.Body = memo(Body);
Drawer.Close = memo(Close);
Drawer.Content = memo(Content);
Drawer.Fill = memo(Fill);
Drawer.Footer = memo(Footer);
Drawer.Header = memo(Header);
Drawer.Maximize = memo(Maximize);
Drawer.Title = memo(Title);
Drawer.HeaderSticky = memo(HeaderSticky);

export default Drawer;
