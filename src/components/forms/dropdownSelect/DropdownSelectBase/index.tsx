import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useState } from 'react';

import type { DropdownProps } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';
import { List } from '@/skin/listings';
import type { LoadMoreParams } from '@/skin/pagination';
import { usePagination } from '@/skin/pagination';

import type { SelectOption } from '../..';
import type { DropdownSelectExclusiveProps } from '../DropdownSelect';
import { DEFAULT_UNSELECTABLE } from '../DropdownSelect/constants';
import type { DropdownSelectItemProps } from './components/Item';
import DropdownSelectItem from './components/Item';
import { DEFAULT_PAGE_SIZE } from './constants';

export type Values<T, TIsMulti extends boolean = false> = TIsMulti extends true
  ? T[]
  : T;

export type DropdownSelectBaseInternalProps<
  T = string,
  TIsMulti extends boolean = false,
> = Pick<DropdownSelectItemProps<T>, 'onUnselect' | 'onSelect'> & {
  isMulti: TIsMulti;
  content?: ReactNode;
  startListElement?: ReactNode;
  value?: Values<T, TIsMulti>;
};

export type DropdownSelectBaseProps<
  T = string,
  TIsMulti extends boolean = false,
> = DataTestId &
  Pick<
    DropdownProps,
    | 'placement'
    | 'elevation'
    | 'maxHeight'
    | 'minWidth'
    | 'isOpened'
    | 'setIsOpened'
    | 'isDisabled'
    | 'initialIsOpened'
    | 'triggerOn'
  > & {
    children: ReactNode | ((value?: Values<T, TIsMulti>) => ReactNode);
    initialValue?: Values<T, TIsMulti>;
    options: SelectOption<T>[];
    onChange?: (values?: Values<T, TIsMulti>) => void;
    pageSize?: number;
    renderLabelAs?: (item: SelectOption<T>) => ReactNode;
  };

const DropdownSelectBase = function <
  T = string,
  TIsMulti extends boolean = false,
>({
  children,
  isMulti,
  onUnselect,
  onSelect,
  onChange,
  options,
  pageSize = DEFAULT_PAGE_SIZE,
  renderLabelAs,
  startListElement,
  unselectable = DEFAULT_UNSELECTABLE,
  value,
  ...rest
}: DropdownSelectBaseProps<T, TIsMulti> &
  DropdownSelectBaseInternalProps<T, TIsMulti> &
  DropdownSelectExclusiveProps) {
  const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();

  useDidMountEffect(() => {
    onChange?.(value);
  }, [value]);

  const slicesData = usePagination(options, loadMoreParams);

  return (
    <Dropdown
      content={
        <Dropdown.Content>
          {startListElement}
          <List
            data={slicesData}
            gap={0}
            initialPerPage={pageSize}
            loadMoreType="infiniteScroll"
            onParamsChange={setLoadMoreParams}
            onReady={setLoadMoreParams}
            totalItemsCount={options.length}
          >
            {(item, { index }) => (
              <DropdownSelectItem
                key={index}
                isSelected={
                  isMulti && Array.isArray(value)
                    ? value.includes(item.value)
                    : value === item.value
                }
                isMulti={isMulti}
                onSelect={onSelect}
                onUnselect={onUnselect}
                option={item}
                renderLabelAs={renderLabelAs}
                unselectable={unselectable}
              />
            )}
          </List>
        </Dropdown.Content>
      }
      minWidth="fit"
      placement="bottom"
      triggerOn="click"
      {...rest}
    >
      <>{isFunction(children) ? children(value) : children}</>
    </Dropdown>
  );
};

export default DropdownSelectBase;
