import type { MutableRefObject, ReactNode, RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { ColumnPinConfig, ColumnResizingData, Layout } from './types';

export type TableContextType = {
  emptyCellFallback?: MutableRefObject<ReactNode>;
  layout: Layout;
  tableRef: RefObject<HTMLTableElement> | null;
  columnsResizingData: ColumnResizingData | undefined;
  setColumnsResizingData: (resizingData: ColumnResizingData) => void;
  isResizable: boolean;
  pinColumn: (
    columnKey: string,
    direction: ColumnPinConfig['direction'],
    options?: { inReverse?: boolean },
  ) => void;
  unpinColumn: (columnKey: string) => void;
  getPinnedStyles: (columnKey: string) => object;
  isPinned: (columnKey: string) => boolean;
  isPinnedRight: (columnKey: string) => boolean;
  isPinnedLeft: (columnKey: string) => boolean;
  elasticColumnKey?: string;
};

export const TableContext = createContext<TableContextType | null>(null);

export const useTableContext = () => {
  const value = useContext(TableContext);

  if (!value) {
    throw new Error(
      'useTableContext() must be used inside <TableContext.Provider />.',
    );
  }

  return value;
};

export type TableActionsContextType = {
  hasOnlyOneAction?: boolean;
};

export const TableActionsContext = createContext<TableActionsContextType>({});

export const useTableActionsContext = () => useContext(TableActionsContext);
