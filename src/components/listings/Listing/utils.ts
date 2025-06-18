import { isString } from '@gatewatcher/bistoury/utils-lang';

import { DEFAULT_CONVERT_SORT_VALUE_OPTIONS } from './constants';
import type {
  ConvertSortValuesOptionsAsArray,
  ConvertSortValuesOptionsAsString,
  SortValue,
} from './types';

export const convertOrderingToSortValue = (
  ordering?: string | null,
): SortValue | undefined => {
  if (!ordering) return;

  return {
    id: ordering.replace(/^-/, ''),
    order: ordering.startsWith('-') ? 'desc' : 'asc',
  };
};

export const convertSortValueToOrdering = <T = string>(
  sortValue: SortValue<T>,
): T => {
  return `${sortValue.order === 'desc' ? '-' : ''}${sortValue.id}` as T;
};

export const convertOrderingToSortValues = (
  ordering?: string | null,
  separator = ',',
): SortValue[] => {
  if (!ordering) return [];

  return ordering.split(separator).reduce((acc, item) => {
    const value = convertOrderingToSortValue(item);
    if (value) {
      acc.push(value);
    }
    return acc;
  }, [] as SortValue[]);
};

export function convertSortValuesToOrdering<T = string>(
  sortValues: SortValue<T>[],
  options: ConvertSortValuesOptionsAsArray,
): T[];

export function convertSortValuesToOrdering<T = string>(
  sortValues: SortValue<T>[],
  options?: ConvertSortValuesOptionsAsString,
): T;

export function convertSortValuesToOrdering<T = string>(
  sortValues: SortValue<T>[],
  options: ConvertSortValuesOptions = {},
) {
  const { asArray, separator } = {
    ...DEFAULT_CONVERT_SORT_VALUE_OPTIONS,
    ...options,
  };

  const data = sortValues.map(convertSortValueToOrdering);
  return asArray ? data : (data.join(separator) as T);
}

export type ConvertSortValuesOptions = {
  separator?: string;
  asArray?: boolean;
};

export const sortData = <T = unknown>(
  data: T[],
  currentSort?: SortValue,
): T[] => {
  if (!currentSort) {
    return data;
  }

  const { order, id } = currentSort;

  return data.sort((a, b) => {
    const A: string | number = (a || {})[id] || '';
    const B: string | number = (b || {})[id] || '';

    if (isString(A) && isString(B)) {
      return order === 'asc' ? A.localeCompare(B) : B.localeCompare(A);
    }

    return order === 'asc' ? +A - +B : +B - +A;
  });
};
