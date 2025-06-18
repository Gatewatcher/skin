import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { cloneElement, useEffect, useRef, useState } from 'react';

import { Stack } from '@/skin/layout';

import { useTabContext } from '../context';
import type { TabsTitleInternalProps, TabsTitleProps } from './Title';

import styles from '../styles.module.scss';

export type TabsTitleListConditionalProps =
  | {
      variant?: 'primary' | 'pills';
      full?: never;
    }
  | {
      variant?: 'secondary' | 'main';
      full?: boolean;
    };

export type TabsTitleListProps = DataTestId &
  TabsTitleListConditionalProps & {
    children: ReactElement<TabsTitleProps & TabsTitleInternalProps>[];
  };

const TabsTitleList = ({
  children,
  'data-testid': testId = 'tabs-title-list',
  full,
  variant = 'primary',
}: TabsTitleListProps) => {
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const { currentTab, tabTitleRects } = useTabContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef?.current || !tabTitleRects) {
      return;
    }
    const currentElementSize = tabTitleRects[currentTab ?? 0];
    setIndicatorWidth(currentElementSize?.width);
    setTranslateValue(
      currentElementSize?.left -
        containerRef?.current?.getBoundingClientRect()?.left,
    );
  }, [currentTab, tabTitleRects]);

  const [isTouched, setIsTouched] = useState(false);

  const handleIndicatorClick = () => {
    setIsTouched(true);
  };

  return (
    <>
      {variant === 'main' && (
        <div className={styles.tabIndicator}>
          <div
            className={classNames(
              styles.indicator,
              isTouched && styles.indicatorEnableAnimation,
              indicatorWidth && styles.indicatorVisible,
            )}
            style={{ width: indicatorWidth, translate: `${translateValue}px` }}
          >
            <div
              className={classNames(
                styles.indicatorPart,
                styles.indicatorPartLeft,
                currentTab && styles.indicatorPartVisible,
                isTouched && styles.indicatorPartEnableAnimation,
              )}
            ></div>
            <div
              className={classNames(
                styles.indicatorPart,
                styles.indicatorPartRight,
                styles.indicatorPartVisible,
              )}
            ></div>
          </div>
        </div>
      )}
      <div ref={containerRef} onClick={handleIndicatorClick}>
        <Stack
          className={classNames(
            styles.TitlesList,
            styles[variant],
            full && styles.full,
          )}
          as="ul"
          data-testid={testId}
          gap={0}
          margin={0}
          padding={0}
        >
          {children.map((item, index) => (
            <li
              key={item.props.id || index}
              id={item.props.id?.toString() || index?.toString()}
            >
              {cloneElement(item, { id: item.props.id || index, variant })}
            </li>
          ))}
        </Stack>
      </div>
    </>
  );
};

export default TabsTitleList;
