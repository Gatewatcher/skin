import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Dropdown, Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';
import { OverflownText, Text } from '@/skin/typography';
import type { OverflownTextExposedUtilities } from '@/skin/typography/OverflownText';

import { useListingSortsContext } from '../../Listing/context';
import type { SortOptions, SortOrder } from '../../Listing/types';
import {
  COLUMN_PIN_DROPDOWN_TEST_ID,
  COLUMN_PIN_MENU_TRIGGER_TEST_ID,
} from '../constants';
import { useTableContext } from '../contexts';
import type {
  ColumnPinDirection,
  ColumnPinningAction,
  Settings,
} from '../types';
import { ColumnResizer } from './ColumnResizer';

import styles from '../styles.module.scss';

export type TableHeaderCellProps = DataTestId & {
  children: ReactNode;
  isAction?: boolean;
  noWrap?: boolean;
  sort?: SortOptions;
  maxWidth?: CSSProperties['maxWidth'];
  minWidth?: number;
  width?: CSSProperties['width'];
  settings?: Settings;
  withOverflownText?: boolean;
};

type SortProps = {
  isActive: boolean;
  order?: SortOrder;
};

const Sort = ({ isActive, order }: SortProps) => {
  return (
    <Stack direction="column">
      <Icon
        className={classNames(
          styles.HeaderCellSort,
          isActive && order === 'asc' && styles.HeaderCellSortActive,
        )}
        data-testid="sort-asc"
        name="ChevronUp"
        currentColor
      />
      <Icon
        className={classNames(
          styles.HeaderCellSort,
          isActive && order === 'desc' && styles.HeaderCellSortActive,
        )}
        data-testid="sort-desc"
        name="ChevronDown"
        currentColor
      />
    </Stack>
  );
};

const TableHeaderCell = ({
  children,
  'data-testid': testId = 'table-header-cell',
  noWrap: noWrapProps,
  sort,
  maxWidth,
  minWidth,
  width,
  settings = {},
  withOverflownText = false,
}: TableHeaderCellProps) => {
  const {
    columnKey,
    columnPinConfig,
    isResizable: isColumnResizable = true,
  } = settings;

  const { currentSorts, setCurrentSorts, initialSorts, isMultiple } =
    useListingSortsContext();
  const {
    layout,
    isResizable,
    pinColumn,
    unpinColumn,
    isPinned,
    isPinnedRight,
    isPinnedLeft,
    getPinnedStyles,
  } = useTableContext();

  const tableHeaderCell = useRef<HTMLTableCellElement>(null);
  const headerTextContainerRef = useRef<
    OverflownTextExposedUtilities | HTMLElement
  >(null);

  useEffect(() => {
    if (columnPinConfig?.isPinned) {
      pinColumn(columnKey, columnPinConfig.direction, {
        inReverse: columnPinConfig.direction === 'right',
      });
    }
  }, []);

  useEffect(() => {
    if (tableHeaderCell.current?.offsetWidth === 0) {
      tableHeaderCell.current.style.width = minWidth
        ? `${minWidth}px`
        : '100px';
    }
  });

  const noWrap = noWrapProps ?? layout === 'auto';
  const userCanPin = columnKey !== undefined && columnPinConfig?.userCanPin;

  const id = sort?.id;
  const initialSort = initialSorts.current?.find(sort => sort.id === id);
  const initialOrder = useMemo(
    () => initialSort?.order || sort?.initialOrder,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { isLoading, isError } = useLoadMoreContext();

  const isDisabled = isLoading || isError;

  const [currentOrder, setCurrentOrder] = useState(initialOrder);

  const [currentSortAlreadyChanged, setCurrentSortAlreadyChanged] =
    useState(false);

  useDidMountEffect(() => {
    setCurrentSortAlreadyChanged(true);
  }, [currentSorts]);

  const getNextOrder = () => {
    if (!currentSorts.find(item => item.id === id)) {
      return initialOrder || 'asc';
    }

    if (!initialOrder && currentOrder === 'desc') {
      return;
    }

    if (initialOrder && currentOrder && currentOrder !== initialOrder) {
      return;
    }

    if (!currentOrder) {
      return initialOrder || 'asc';
    }

    return currentOrder === 'asc' ? 'desc' : 'asc';
  };

  const toggleSort = () => {
    if (!id || isDisabled) return;

    const order = getNextOrder();

    setCurrentOrder(order);
    setCurrentSorts(prev => {
      if (isMultiple.current) {
        const newSorts = prev?.filter(sort => sort.id !== id);
        if (order) {
          newSorts.push({ ...sort, id, order });
        }

        return newSorts.sort((a, b) => {
          if (!isDefined(a.priority)) return 1;
          return a.priority - (b.priority ?? 0);
        });
      }

      return order ? [{ id, order }] : [];
    });
  };

  const isActive = useMemo(() => {
    const sorts = currentSortAlreadyChanged
      ? currentSorts
      : initialSorts.current;

    return sorts.findIndex(sort => sort.id === id) > -1;
  }, [currentSorts, currentSortAlreadyChanged, initialSorts, id]);

  const handleColumnPin = (pinDirection: ColumnPinDirection) => {
    if (columnPinConfig) {
      pinColumn(columnKey, pinDirection);
    }
  };

  const handleColumnUnpin = () => {
    if (columnPinConfig) {
      unpinColumn(columnKey);
    }
  };

  const pinningActions: ColumnPinningAction[] = [
    {
      label: 'Pin to left',
      iconName: 'Pin',
      action: () => handleColumnPin('left'),
      isChecked: () => isPinnedLeft(columnKey || ''),
    },
    {
      label: 'Pin to right',
      iconName: 'Pin',
      action: () => handleColumnPin('right'),
      isChecked: () => isPinnedRight(columnKey || ''),
    },
    {
      label: 'Unpin',
      iconName: 'Unpin',
      action: () => handleColumnUnpin(),
    },
  ];

  return (
    <th
      ref={tableHeaderCell}
      className={classNames(
        styles.Borders,
        styles.HeaderCell,
        noWrap && styles.HeaderCellNoWrap,
        columnKey !== undefined && isPinned(columnKey)
          ? styles.pinnedCell
          : undefined,
      )}
      data-testid={
        isActive && currentOrder
          ? suffixTestId(testId, [id, currentOrder].join('-'))
          : testId
      }
      style={{
        maxWidth,
        minWidth,
        width,
        lineHeight: withOverflownText ? 0 : undefined,
        ...(columnKey !== undefined && getPinnedStyles(columnKey)),
      }}
      id={columnKey ? `header-${columnKey}` : undefined}
    >
      <Stack
        className={classNames(
          !!id && styles.HeaderCellSortable,
          isDisabled && styles.HeaderCellDisabled,
        )}
        alignItems="center"
        data-testid={suffixTestId(testId, id ? 'sortable' : 'unsortable')}
        gap={4}
        onClick={toggleSort}
      >
        {withOverflownText ? (
          <OverflownText
            ref={
              headerTextContainerRef as React.RefObject<OverflownTextExposedUtilities>
            }
            transform="capitalizeFirstLetter"
          >
            {children}
          </OverflownText>
        ) : (
          <Text ref={headerTextContainerRef as React.RefObject<HTMLElement>}>
            {children}
          </Text>
        )}

        {id && <Sort isActive={isActive} order={currentOrder} />}
      </Stack>

      {isResizable && isColumnResizable && columnKey ? (
        <ColumnResizer
          column={tableHeaderCell}
          headerTextWidth={headerTextContainerRef.current?.scrollWidth}
          minWidth={minWidth}
          userCanPin={userCanPin}
        />
      ) : null}

      {userCanPin && (
        <Stack className={classNames(styles.pinsContainer)}>
          <Dropdown
            content={
              <Stack
                data-testid={suffixTestId(
                  COLUMN_PIN_DROPDOWN_TEST_ID,
                  columnKey,
                )}
                className={styles.pinningActionsContainer}
                direction="column"
              >
                <Dropdown.Content>
                  {pinningActions.map(action => (
                    <Dropdown.Button key={action.label}>
                      <Stack alignItems="center">
                        <Dropdown.Button
                          icon={action.iconName}
                          onClick={action.action}
                        >
                          {action.label}
                        </Dropdown.Button>

                        {action.isChecked && action.isChecked() && (
                          <Icon color="blue" name="Check" />
                        )}
                      </Stack>
                    </Dropdown.Button>
                  ))}
                </Dropdown.Content>
              </Stack>
            }
            offset={8}
            placement="bottom-end"
            triggerOn="click"
          >
            <ButtonIcon
              data-testid={suffixTestId(
                COLUMN_PIN_MENU_TRIGGER_TEST_ID,
                columnKey,
              )}
              icon="OverflowMenuHorizontal"
              type="neutral"
              variant="ghosted"
            />
          </Dropdown>
        </Stack>
      )}
    </th>
  );
};

export default TableHeaderCell;
