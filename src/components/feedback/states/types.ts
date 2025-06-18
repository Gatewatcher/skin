import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, ReactNode } from 'react';

import type { StackProps } from '@/skin/layout';

import type { STATUSES } from './constants';

export type Status = typeof STATUSES[number];

export type StateBaseProps<T> = DataTestId &
  Pick<StackProps, 'padding'> & {
    children: ReactNode | ((data: T) => ReactNode);
    containerStyle?: CSSProperties;
    data?: T;
  };
