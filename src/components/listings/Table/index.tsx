import { useOnWindowResize } from '@gatewatcher/bistoury/hooks';
import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import { isNumber, isString } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { XOR } from '@gatewatcher/bistoury/utils-types';
import { useOnScreen } from 'hooks/useOnScreen';
import type { ReactNode } from 'react';
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { animated, useTransition } from 'react-spring';

import { ANIMATION_SHARED_CONFIG } from '@/constants';
import DropdownGroup from '@/skin/displays/floating/Dropdown/compounds/Group';
import { Stack } from '@/skin/layout';
import type { LoadMoreProps } from '@/skin/pagination/LoadMore';
import LoadMore from '@/skin/pagination/LoadMore';
import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';

import type { ListingProps } from '../Listing';
import Listing from '../Listing';
import type { ListingBatchSelectProps } from '../Listing/compounds/BatchSelect/BatchSelect';
import ListingBatchSelect from '../Listing/compounds/BatchSelect/BatchSelect';
import ListingEdition from '../Listing/compounds/Edition';
import type { ListingSortProps } from '../Listing/compounds/Sort';
import ListingSort from '../Listing/compounds/Sort';
import { useListingBatchSelectionContext } from '../Listing/context';
import type {
  ListingLoadMoreProps,
  RenderItem,
  TableDataItem,
} from '../Listing/types';
import { usePinnedColumns } from './columnPinningHooks';
import { getPersistedResizingDataAfterMigrating } from './columnResizingUtils';
import TableActionButton from './compounds/ActionButton';
import TableActionLink from './compounds/ActionLink';
import TableActions from './compounds/Actions';
import TableBatchActions from './compounds/BatchActions';
import TableCell from './compounds/Cell';
import TableHeaderCell from './compounds/HeaderCell';
import TableHeaderSelectCell from './compounds/HeaderSelectCell';
import TableHeaders from './compounds/Headers';
import TableRow from './compounds/Row';
import TableSelectCell from './compounds/SelectCell';
import TableActionEdit from './compounds/actions/Edit';
import {
  DEFAULT_BATCH_OPTIONS,
  DEFAULT_IS_RESIZABLE,
  DEFAULT_LAYOUT,
  DEFAULT_OVERFLOWN_TEXT_HEADERS,
} from './constants';
import type { TableContextType } from './contexts';
import { TableContext } from './contexts';
import {
  flushColumnsResizingDataFromLocalStorage,
  setColumnsResizingDataInLocalStorage,
} from './localStorage';
import type {
  BatchOptions,
  ColumnResizingData,
  Layout,
  TableColumn,
  Variant,
} from './types';

import styles from './styles.module.scss';

export type TableConditionalRowsProps<T extends TableDataItem> = {
  children: RenderItem<T>;
  headers?: ReactNode;
};
export type TableConditionalColumnsProps<T extends TableDataItem> = {
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  onRowDoubleClick?: (item: T) => void;
};

export type TableConditionalProps<T extends TableDataItem> = XOR<
  TableConditionalRowsProps<T>,
  TableConditionalColumnsProps<T>
>;

type DataKey<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export type TableProps<T extends TableDataItem> = LoadMoreProps<T> &
  Omit<ListingProps<T>, 'children'> &
  ListingLoadMoreProps &
  Pick<ListingBatchSelectProps, 'onBatchSelect'> &
  Pick<ListingSortProps, 'onSort'> & {
    dataKey?: DataKey<T>;
    batch?: BatchOptions;
    emptyCellFallback?: ReactNode;
    minWidth?: number | string;
    layout?: Layout;
    persistenceKey?: string;
    variant?: Variant;
    isResizable?: boolean;
    withOverflownTextHeaders?: boolean;
    elasticColumnKey?: string;
  } & TableConditionalProps<T>;

export type TableRowsProps<T extends TableDataItem> = Omit<
  TableProps<T>,
  keyof TableConditionalColumnsProps<T> | 'children' | 'persistenceKey'
> & {
  children: RenderItem<T>;
};
export type TableColumnsProps<T extends TableDataItem> =
  TableConditionalColumnsProps<T> &
    Omit<TableProps<T>, keyof TableConditionalRowsProps<T>>;

type BaseComponentProps = {
  children: ReactNode;
  colSpan?: number;
};
const RowComponent = ({ children }: BaseComponentProps) => (
  <tr>
    <td colSpan={100}>{children}</td>
  </tr>
);

export const TableContent = <T extends TableDataItem>({
  'data-testid': testId = 'table',
  dataKey,
  batch,
  children,
  columns: columnsProp,
  emptyCellFallback,
  headers,
  layout = DEFAULT_LAYOUT,
  minWidth,
  onRowClick,
  onRowDoubleClick,
  persistenceKey,
  isResizable = DEFAULT_IS_RESIZABLE,
  withOverflownTextHeaders = DEFAULT_OVERFLOWN_TEXT_HEADERS,
  elasticColumnKey,
  ...rest
}: TableProps<T>) => {
  const { min, ...bulkOptions } = {
    ...DEFAULT_BATCH_OPTIONS,
    ...batch,
  };
  const batchSelectionState = useListingBatchSelectionContext();
  const { itemsCount, hasSelection } = batchSelectionState;
  const { data, isError, firstLoadingDone } = useLoadMoreContext();

  const bulkActionsShown = hasSelection && batch?.actions && itemsCount >= min;

  const transition = useTransition(bulkActionsShown, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...ANIMATION_SHARED_CONFIG, duration: 100 },
  });

  const emptyCellFallbackRef = useRef(emptyCellFallback);

  const scrollableObserverLeftRef = useRef<HTMLDivElement>(null);
  const scrollableObserverRightRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [columns, setColumns] = useState(
    columnsProp ? [...columnsProp] : undefined,
  );

  const [columnsResizingData, setColumnsResizingData] = useState<
    ColumnResizingData | undefined
  >(getPersistedResizingDataAfterMigrating(persistenceKey, columnsProp));

  const isFullyScrolledLeft = useOnScreen(scrollableObserverLeftRef);
  const isFullyScrolledRight = useOnScreen(scrollableObserverRightRef);

  // set tableLayout to auto to allow for auto resizing and then switch to fixed to respect max-width
  useOnWindowResize(
    () => {
      if (!tableRef.current || !isResizable) return;
      const tableHeaders = tableRef.current.querySelectorAll('th');

      if (!tableHeaders.length || !data?.length) return;

      if (!columnsResizingData) {
        tableRef.current.style.tableLayout = 'auto';
        tableHeaders.forEach(header => {
          const width = getComputedStyle(header).width;
          header.style.width = width;
        });
        tableRef.current.style.tableLayout = 'fixed';
      } else {
        if (!tableRef.current.parentElement || !elasticColumnKey) return;

        const tableWidth = tableRef.current.getBoundingClientRect().width;
        const parentWidth =
          tableRef.current.parentElement.getBoundingClientRect().width;

        if (tableWidth < parentWidth) {
          const remainingWidth = parentWidth - tableWidth;
          const elasticColumn = columnsResizingData[elasticColumnKey];
          if (elasticColumn) {
            const newWidth = elasticColumn.width + remainingWidth;
            setResizingData({
              ...columnsResizingData,
              [elasticColumnKey]: {
                ...elasticColumn,
                width: newWidth,
              },
            });
          }
        }
      }
    },
    { delay: 100 },
  );

  const {
    getPinnedStyles,
    isPinned,
    isPinnedLeft,
    isPinnedRight,
    pinColumn,
    unpinColumn,
  } = usePinnedColumns({
    columns,
    columnsProp,
    setColumns,
    tableRef,
    persistenceKey,
  });

  useEffect(() => {
    const tableHeaders = tableRef.current?.querySelectorAll('th');
    const columnsResizingDataKeys = Object.keys(columnsResizingData || {});
    const shouldFlushResizingData =
      !isResizable ||
      !tableHeaders ||
      columnsResizingDataKeys.length !== tableHeaders.length;
    if (shouldFlushResizingData) {
      flushColumnsResizingDataFromLocalStorage(persistenceKey);
      setColumnsResizingData(undefined);
    }
  }, [isResizable, persistenceKey, columnsResizingData]);

  useEffect(() => {
    const tableHeaders = tableRef.current?.querySelectorAll('th');
    if (tableRef.current && isResizable && tableHeaders) {
      const tableHeadersRecord: Record<string, HTMLTableCellElement> = {};

      tableHeaders.forEach(header => {
        tableHeadersRecord[header.id] = header;
      });

      if (tableHeaders.length > 0) {
        if (columnsResizingData) {
          tableRef.current.style.minWidth = 'unset';

          for (const key in columnsResizingData) {
            const columnData = columnsResizingData[key];
            const width = `${columnData.width}px`;
            tableHeadersRecord[`header-${key}`].style.width = width;
          }
        }
      }
    }

    // set tableLayout to fixed to respect max-width
    if (tableRef.current && tableHeaders?.length && !columnsResizingData) {
      if (data?.length) {
        tableHeaders.forEach(header => {
          const width = getComputedStyle(header).width;
          header.style.width = width;
        });
        tableRef.current.style.tableLayout = 'fixed';
      }
    }
  }, [columnsResizingData, persistenceKey, isResizable, data]);

  const setResizingData = (data: ColumnResizingData) => {
    setColumnsResizingDataInLocalStorage(persistenceKey, data);
    setColumnsResizingData(data);
  };

  const contextValue: TableContextType = {
    emptyCellFallback: emptyCellFallbackRef,
    layout,
    tableRef,
    columnsResizingData,
    setColumnsResizingData: setResizingData,
    isResizable,
    pinColumn,
    unpinColumn,
    getPinnedStyles,
    isPinned,
    isPinnedRight,
    isPinnedLeft,
    elasticColumnKey,
  };

  const scrollable = !!data?.length && !isError && firstLoadingDone;

  const buildHeaders = () => {
    const columnsToRender = columns?.filter(column => !column.hidden);
    const hasHeaders = columnsToRender?.some(column => column.header);

    return (
      hasHeaders && (
        <Table.Headers>
          {columnsToRender?.map(column => {
            return isString(column.header) ? (
              <Table.HeaderCell
                key={column.key}
                settings={{ columnKey: column.key }}
                withOverflownText={withOverflownTextHeaders}
              >
                {column.header}
              </Table.HeaderCell>
            ) : (
              <Fragment key={column.key}>{column.header?.()}</Fragment>
            );
          })}
        </Table.Headers>
      )
    );
  };

  const buildRow = (...data: Parameters<RenderItem<T>>) => {
    const [item, { index }] = data;
    const rowItem = item as Record<string, ReactNode>;

    const columnsToRender = columns?.filter(column => !column.hidden);

    const rowKey =
      dataKey && (isString(item[dataKey]) || isNumber(item[dataKey]))
        ? item[dataKey]
        : index;

    return (
      <Table.Row
        key={rowKey}
        onDoubleClick={
          onRowDoubleClick ? () => onRowDoubleClick(item) : undefined
        }
        id={rowKey}
        onClick={onRowClick ? () => onRowClick(item) : undefined}
      >
        {columnsToRender?.map((column, columnIndex) => {
          const value = column.render
            ? column.render(item)
            : rowItem[column.key];

          return isString(value) || isNumber(value) ? (
            <Table.Cell key={columnIndex} columnKey={column.key}>
              {value}
            </Table.Cell>
          ) : (
            <Fragment key={columnIndex}>{value}</Fragment>
          );
        })}
      </Table.Row>
    );
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div className={styles.container}>
        <Stack
          className={classNames(
            styles.content,
            scrollable && [
              isFullyScrolledLeft === false && styles.scrollableLeft,
              isFullyScrolledRight === false && styles.scrollableRight,
            ],
          )}
        >
          <div
            ref={scrollableObserverLeftRef}
            className={styles.scrollableObserverLeft}
          />
          <table
            ref={tableRef}
            className={classNames(
              styles.Table,
              stylesToPascalCase(
                styles,
                'table',
                'layout',
                columnsResizingData && !!data?.length ? 'fixed' : layout,
              ),
              layout === 'fixed' &&
                !data?.length &&
                styles.TableLayoutFixedEmpty,
              isResizable && styles.TableResizable,
            )}
            data-testid={testId}
            style={{ minWidth }}
          >
            <Listing<T>
              {...rest}
              renderRowComponent={children => (
                <RowComponent>{children}</RowComponent>
              )}
              data-testid={suffixTestId(testId, 'body')}
              renderRoot={children => <tbody>{children}</tbody>}
              startElement={headers || buildHeaders()}
            >
              {children || ((item, params) => buildRow(item, params))}
            </Listing>
          </table>
          <div
            ref={scrollableObserverRightRef}
            className={styles.scrollableObserverRight}
          />

          {transition(
            (style, item) =>
              item && (
                <animated.div
                  className={styles.BatchActionsContainer}
                  style={style}
                >
                  <TableBatchActions {...bulkOptions} />
                </animated.div>
              ),
          )}
        </Stack>
      </div>
    </TableContext.Provider>
  );
};

const Table = <T extends TableDataItem>({
  loadMoreOptions,
  loadMoreType,
  onBatchSelect,
  onSort,
  ...rest
}: TableProps<T>) => {
  const { initialSort } = rest;

  return (
    <ListingBatchSelect onBatchSelect={onBatchSelect}>
      <ListingEdition>
        <ListingSort initialSort={initialSort} onSort={onSort}>
          <LoadMore options={loadMoreOptions} type={loadMoreType} {...rest}>
            <TableContent
              loadMoreOptions={loadMoreOptions}
              loadMoreType={loadMoreType}
              {...rest}
            />
          </LoadMore>
        </ListingSort>
      </ListingEdition>
    </ListingBatchSelect>
  );
};

Table.Actions = memo(TableActions);
Table.ActionGroup = memo(DropdownGroup);
Table.ActionButton = memo(TableActionButton);
Table.ActionLink = memo(TableActionLink);
Table.ActionEdit = memo(TableActionEdit);
Table.BatchActions = TableBatchActions;
Table.Cell = memo(TableCell);
Table.HeaderCell = memo(TableHeaderCell);
Table.HeaderSelectCell = memo(TableHeaderSelectCell);
Table.Headers = memo(TableHeaders);
Table.Row = memo(TableRow);
Table.SelectCell = memo(TableSelectCell);

export default Table;
