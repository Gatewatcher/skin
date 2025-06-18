import { useEffect, useState } from 'react';

import { getOffsetForPinnedColumn } from './columnPinningUtils';
import { COLUMN_PINNING_VERSION, DEFAULT_PINNED_COLUMNS } from './constants';
import type { TableContextType } from './contexts';
import {
  flushPinnedColumnsFromLocalStorage,
  getColumnsPinningVersionFromLocalStorage,
  getPinnedColumnsFromLocalStorage,
  setColumnsPinningVersionInLocalStorage,
  setPinnedColumnsInLocalStorage,
} from './localStorage';
import type { PinnedColumns, TableColumn } from './types';

type UsePinnedColumnsParams<T> = {
  persistenceKey?: string;
  tableRef: React.RefObject<HTMLTableElement>;
  columns: TableColumn<T>[] | undefined;
  columnsProp: TableColumn<T>[] | undefined;
  setColumns: (
    value: React.SetStateAction<TableColumn<T>[] | undefined>,
  ) => void;
};

export const usePinnedColumns = <T>({
  persistenceKey,
  columns,
  tableRef,
  columnsProp,
  setColumns,
}: UsePinnedColumnsParams<T>) => {
  const [pinnedColumns, setPinnedColumns] = useState<PinnedColumns>(
    persistenceKey
      ? getPinnedColumnsFromLocalStorage(persistenceKey)
      : DEFAULT_PINNED_COLUMNS,
  );

  useEffect(() => {
    if (persistenceKey) {
      const userColumnsPinningVersion =
        getColumnsPinningVersionFromLocalStorage(persistenceKey);
      if (userColumnsPinningVersion !== COLUMN_PINNING_VERSION) {
        setColumnsPinningVersionInLocalStorage(persistenceKey);
        flushPinnedColumnsFromLocalStorage(persistenceKey);
        setPinnedColumns(DEFAULT_PINNED_COLUMNS);
      }
    }
  }, [persistenceKey]);

  useEffect(() => {
    setColumnsWithPinnedOrder();
    if (persistenceKey) {
      setPinnedColumnsInLocalStorage(persistenceKey, pinnedColumns);
    }
  }, [pinnedColumns, columnsProp, setColumns]);

  const setColumnsWithPinnedOrder = () => {
    if (columnsProp) {
      const columnsRecord = columnsProp.reduce<Record<string, TableColumn<T>>>(
        (colsRecord, column) => {
          colsRecord[column.key] = column;
          return colsRecord;
        },
        {},
      );

      const unpinnedColumnsKeys: string[] = [];
      columnsProp.forEach(column => {
        if (
          !pinnedColumns.left.includes(column.key) &&
          !pinnedColumns.right.includes(column.key)
        ) {
          unpinnedColumnsKeys.push(column.key);
        }
      });

      const filterPinnedColumnKeys = (direction: keyof PinnedColumns) => {
        const filteredKeys = pinnedColumns[direction].filter(key => {
          const matchingKey = !!columnsProp.find(column => column.key === key);
          if (!matchingKey) {
            unpinColumn(key);
          }
          return matchingKey;
        });
        return filteredKeys;
      };

      const filteredPinnedRightColumnKeys = filterPinnedColumnKeys('right');

      const filteredPinnedLeftColumnKeys = filterPinnedColumnKeys('left');

      const rightPinnedColumnsReversed =
        filteredPinnedRightColumnKeys.reverse();

      const orderedKeys = [
        ...filteredPinnedLeftColumnKeys,
        ...unpinnedColumnsKeys,
        ...rightPinnedColumnsReversed,
      ];

      const orderedColumns = orderedKeys.map(key => columnsRecord[key]);
      setColumns(orderedColumns);
    }
  };

  const unpinColumn = (columnKey: string) => {
    setPinnedColumns(prevState => {
      const newPinned = { ...prevState };

      newPinned.left = newPinned.left.filter(key => key !== columnKey);
      newPinned.right = newPinned.right.filter(key => key !== columnKey);

      return newPinned;
    });
  };

  const pinColumn: TableContextType['pinColumn'] = (
    columnKey,
    position,
    options = { inReverse: false },
  ) => {
    setPinnedColumns(prevState => {
      const newPinned = { ...prevState };
      if (!newPinned[position].includes(columnKey)) {
        if (options.inReverse) {
          newPinned[position] = [columnKey, ...prevState[position]];
        } else {
          newPinned[position] = [...prevState[position], columnKey];
        }

        if (position === 'left') {
          newPinned.right = newPinned.right.filter(key => key !== columnKey);
        } else {
          newPinned.left = newPinned.left.filter(key => key !== columnKey);
        }
      }

      return newPinned;
    });
  };

  const isPinnedRight = (columnKey: string): boolean => {
    return pinnedColumns.right.includes(columnKey);
  };

  const isPinnedLeft = (columnKey: string): boolean => {
    return pinnedColumns.left.includes(columnKey);
  };

  const isPinned = (columnKey: string): boolean => {
    return isPinnedRight(columnKey) || isPinnedLeft(columnKey);
  };

  const getPinnedStyles = (columnKey: string) => {
    if (!tableRef.current) return {};

    const leftPinned = pinnedColumns.left;
    const rightPinned = pinnedColumns.right;

    const tableColumns = tableRef.current.querySelectorAll('th');

    if (leftPinned.includes(columnKey)) {
      const leftOffset = getOffsetForPinnedColumn({
        columnKey,
        columns,
        pinnedColumns: leftPinned,
        tableColumns,
      });
      return { left: leftOffset };
    }

    if (rightPinned.includes(columnKey)) {
      const rightOffset = getOffsetForPinnedColumn({
        columnKey,
        columns,
        pinnedColumns: rightPinned,
        tableColumns,
      });
      return { right: rightOffset };
    }

    return {};
  };

  return {
    unpinColumn,
    pinColumn,
    isPinned,
    isPinnedLeft,
    isPinnedRight,
    getPinnedStyles,
  };
};
