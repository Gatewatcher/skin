import type { ReactNode } from 'react';

import type { BreakpointProp } from '@/types';

import type { KEY_VALUE_DISPLAY_VARIANTS } from './constants';

export type KeyValueEntry = { label: ReactNode; value: ReactNode };
export type KeyValueArrayPair = [label: string, value: ReactNode];

export type KeyValueFormat =
  | Record<string, ReactNode>
  | Map<string, ReactNode>
  | KeyValueEntry[];

export type KeyValueVariant = typeof KEY_VALUE_DISPLAY_VARIANTS[number];
export type KeyValueColumns = { key?: BreakpointProp; value?: BreakpointProp };
