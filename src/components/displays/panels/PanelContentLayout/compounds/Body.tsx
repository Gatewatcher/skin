import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { ReactNode } from 'react';

import { Stack, type StackProps } from '@/skin/layout';

import { useStickyContext } from '../components/StickyProvider';

import styles from '../styles.module.scss';

export type BodyProps = {
  children?: ReactNode;
  fitContent?: boolean;
} & StackProps;

const Body = ({ children, fitContent, ...stackProps }: BodyProps) => {
  const { stickySize } = useStickyContext();

  return (
    <Stack
      {...stackProps}
      className={classNames(
        styles.Body,
        fitContent && styles.fitContent,
        stackProps.className,
      )}
      direction="column"
      style={{ paddingTop: stickySize, ...stackProps.style }}
    >
      {children}
    </Stack>
  );
};

export default Body;
