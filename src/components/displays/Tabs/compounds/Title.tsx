import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode, RefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import type { To } from 'react-router-dom';

import { Button } from '@/skin/actions';
import type { IconName } from '@/skin/displays';
import { Pill, TextIcon } from '@/skin/displays';
import { Text } from '@/skin/typography';

import { useTabContext } from '../context';
import type { TabIdProps, TitleListVariant } from '../types';
import InternalNavLinkTitle from './InternalNavLinkTitle';

import styles from '../styles.module.scss';

export type TabsTitleInternalProps = {
  variant?: TitleListVariant;
};

export type TabsTitleProps = TabIdProps &
  DataTestId & {
    children: ReactNode;
    disabled?: boolean;
    icon?: IconName;
    to?: To;
  };

const TabsTitle = ({
  children,
  'data-testid': testId = 'tabs-title',
  disabled,
  icon,
  id,
  to,
  ...internalProps
}: TabsTitleProps) => {
  const { currentTab, onTabChange, setCurrentTab, setTabTitleRects } =
    useTabContext();
  const isActive = useMemo(() => currentTab === id, [currentTab, id]);
  const titleTestId = isActive ? suffixTestId(testId, 'active') : testId;

  const currentElement = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
    null,
  );

  const { variant = 'primary' } = internalProps as TabsTitleInternalProps;

  const handleClick = () => {
    if (disabled || !isDefined(id)) return;

    setCurrentTab(id);
    onTabChange(id);
  };

  useEffect(() => {
    if (!currentElement?.current || !isDefined(id)) {
      return;
    }
    setTabTitleRects(currentTabTitleRects => {
      const newRect = currentElement?.current?.getBoundingClientRect();

      if (newRect) {
        return {
          ...(currentTabTitleRects || {}),
          [id ?? 0]: newRect,
        };
      }

      return currentTabTitleRects;
    });
  }, [id, currentTab, setTabTitleRects]);

  const getContent = () => {
    switch (variant) {
      case 'pills':
        return (
          <Pill active={isActive} disabled={disabled} icon={icon}>
            {children}
          </Pill>
        );

      case 'primary':
      case 'secondary':
      case 'main':
      default:
        return icon ? (
          <TextIcon
            iconSize="small"
            startIcon={icon}
            whiteSpace="nowrap"
            currentColor
          >
            {children}
          </TextIcon>
        ) : (
          <Text
            weight={isActive && variant !== 'main' ? 'medium' : 'regular'}
            whiteSpace="nowrap"
          >
            {children}
          </Text>
        );
    }
  };

  return to ? (
    <InternalNavLinkTitle
      ref={currentElement as RefObject<HTMLAnchorElement>}
      data-testid={titleTestId}
      disabled={disabled}
      onClick={handleClick}
      to={to}
      variant={variant}
    >
      {getContent()}
    </InternalNavLinkTitle>
  ) : (
    <Button
      ref={currentElement as RefObject<HTMLButtonElement>}
      className={classNames(
        styles.Title,
        styles.padding,
        styles[variant],
        isActive && variant !== 'pills' && styles.active,
        disabled && variant !== 'pills' && styles.disabled,
      )}
      data-testid={titleTestId}
      disabled={disabled}
      onClick={handleClick}
      variant="bared"
    >
      {getContent()}
    </Button>
  );
};

export default TabsTitle;
