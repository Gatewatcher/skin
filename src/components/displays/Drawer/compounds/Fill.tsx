import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type DrawerFillProps = {
  children: ReactNode;
};

const Fill = ({ children }: DrawerFillProps) => {
  return <Stack className={styles.Fill}>{children}</Stack>;
};

export default Fill;
