import type { ReactNode } from 'react';

import type { InfiniteScrollProps } from '@/skin/pagination/InfiniteScroll';
import type { LoadMoreType } from '@/skin/pagination/LoadMore/types';

import type { PLACEHOLDER_SIZES } from './constants';

export type DataItem = object | File | ReactNode;
export type TableDataItem = object;

export type RenderItem<T> = (row: T, { index }: { index: number }) => ReactNode;

export type ListingLoadMoreProps = {
  loadMoreType?: LoadMoreType;
  loadMoreOptions?: Partial<
    Pick<InfiniteScrollProps, 'delay' | 'loader' | 'rootMargin' | 'threshold'>
  >;
};

export type SortOrder = 'asc' | 'desc';
export type SortOptions = {
  id: string;
  initialOrder?: SortOrder;
  priority?: number;
};

export type SortValue<T = string> = {
  id: T;
  order: SortOrder;
  priority?: number;
};

export type ConvertSortValuesOptions = {
  separator?: string;
  asArray?: boolean;
};

export type ConvertSortValuesOptionsAsArray = ConvertSortValuesOptions & {
  asArray?: true;
};

export type ConvertSortValuesOptionsAsString = ConvertSortValuesOptions & {
  asArray?: false;
};

export type PlaceholderSize = typeof PLACEHOLDER_SIZES[number];
export type PlaceholderSizeProps = {
  placeholderSize: PlaceholderSize;
};
