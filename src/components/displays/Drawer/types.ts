import type { ReactNode } from 'react';

import type { MAXIMIZE_SIZES } from './constants';

export type DrawerMatch = DrawerItem | ReactNode;

export type DrawerItem = {
  content: ReactNode;
  enabled?: boolean;
};

export type DrawerMatches<T extends string = string> = Record<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DrawerMatch | ((props: any) => DrawerMatch)
>;

export type MaximizeSize = typeof MAXIMIZE_SIZES[number];
