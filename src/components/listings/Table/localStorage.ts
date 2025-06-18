import { get, set } from '@gatewatcher/bistoury/utils-web-storage';

import { COLUMN_PINNING_VERSION, DEFAULT_PINNED_COLUMNS } from './constants';
import type { ColumnResizingData, PinnedColumns } from './types';

export const setColumnsResizingDataInLocalStorage = (
  key?: string,
  value?: ColumnResizingData,
) => {
  if (key && value) {
    set(key, value);
  }
};

export const getColumnsResizingDataFromLocalStorage = (key?: string) => {
  if (!key) return;
  return get(key);
};

export const flushColumnsResizingDataFromLocalStorage = (key?: string) => {
  if (key) {
    set(key, '');
  }
};

const getPinnedColumnsPersistenceKey = (persistenceKey: string): string => {
  return `${persistenceKey}-pinnedColumns`;
};

export const setPinnedColumnsInLocalStorage = (
  key: string,
  value: PinnedColumns = DEFAULT_PINNED_COLUMNS,
) => {
  const persistenceKey = getPinnedColumnsPersistenceKey(key);
  set(persistenceKey, value);
};

export const getPinnedColumnsFromLocalStorage = (key: string) => {
  const persistenceKey = getPinnedColumnsPersistenceKey(key);
  return get(persistenceKey) || { ...DEFAULT_PINNED_COLUMNS };
};

export const flushPinnedColumnsFromLocalStorage = (key: string) => {
  const persistenceKey = getPinnedColumnsPersistenceKey(key);
  set(persistenceKey, '');
};

const getColumnsPinningVersionPersistenceKey = (
  persistenceKey: string,
): string => {
  return `${persistenceKey}-pinnedColumns-version`;
};

export const setColumnsPinningVersionInLocalStorage = (
  key: string,
  value: string = COLUMN_PINNING_VERSION,
) => {
  const persistenceKey = getColumnsPinningVersionPersistenceKey(key);
  set(persistenceKey, value);
};

export const getColumnsPinningVersionFromLocalStorage = (key: string) => {
  const persistenceKey = getColumnsPinningVersionPersistenceKey(key);
  return get(persistenceKey);
};
