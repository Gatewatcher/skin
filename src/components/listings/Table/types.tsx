import type { ReactNode } from 'react';

import type { IconName } from '@/skin/displays';

import type { TableBatchActionsProps } from './compounds/BatchActions';
import type { LAYOUTS, VARIANTS } from './constants';

export type Variant = typeof VARIANTS[number];
export type Layout = typeof LAYOUTS[number];

export type BatchOptions = TableBatchActionsProps & {
  min?: number;
};

export type TableColumn<T> = {
  key: string;
  hidden?: boolean;
  header?: string | (() => ReactNode);
  render?: (item: T) => ReactNode;
};

export type ColumnResizingData = Record<
  string,
  {
    width: number;
  }
>;

export type PinnedColumns = {
  left: string[];
  right: string[];
};

export type ColumnPinDirection = 'right' | 'left';

export type ColumnPinConfig = {
  direction: ColumnPinDirection;
  isPinned?: boolean;
  userCanPin?: boolean;
};

export type ColumnPinningAction = {
  label: string;
  iconName: IconName;
  action: () => void;
  isChecked?: () => boolean;
};

export type ResizableNotPinnable = {
  isResizable: true;
  columnKey: string;
  columnPinConfig?: ColumnPinConfig;
};

export type ResizableAndPinnable = {
  isResizable: true;
  columnKey: string;
  columnPinConfig: ColumnPinConfig;
};

export type PinnableNotResizable = {
  isResizable?: false;
  columnKey: string;
  columnPinConfig: ColumnPinConfig;
};

export type NotResizableNotPinnable = {
  columnKey?: string;
  columnPinConfig?: undefined;
  isResizable?: false;
};

export type Settings =
  | ResizableNotPinnable
  | ResizableAndPinnable
  | PinnableNotResizable
  | NotResizableNotPinnable;
