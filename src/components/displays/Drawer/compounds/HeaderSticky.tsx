import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode, RefObject } from 'react';

import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';
import ParentScroll from '@/skin/layout/ParentScroll';

import styles from '../styles.module.scss';

export type DrawerHeaderStickyProps = DataTestId & {
  children: ReactNode;
  customContent?: (isSticky: boolean) => ReactElement;
  parentRef: RefObject<HTMLDivElement>;
} & Omit<StackProps, 'margin' | 'padding' | 'direction' | 'className'>;

const HeaderSticky = ({
  children,
  parentRef,
  customContent,
  'data-testid': testId = 'drawer-header',
  ...rest
}: DrawerHeaderStickyProps) => {
  return (
    <ParentScroll parentRef={parentRef}>
      {({ isSticky }) => (
        <Stack
          className={classNames(
            styles.HeaderSticky,
            isSticky && styles.HeaderStickyBoxShadow,
          )}
          direction="column"
          gap={4}
          margin={{ bottom: 6 }}
          padding={{ top: 9, bottom: 6 }}
          {...rest}
        >
          <Stack
            alignItems="baseline"
            data-testid={testId}
            gap={4}
            justifyContent="space-between"
          >
            {children}
          </Stack>
          {customContent && customContent(isSticky)}
        </Stack>
      )}
    </ParentScroll>
  );
};

export default HeaderSticky;
