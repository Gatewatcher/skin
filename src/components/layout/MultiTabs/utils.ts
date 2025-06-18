import { isDefined, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

export const interleaveArrayElements = <T, I>(
  array: T[],
  itemOrRender: I | ((index: number) => I),
) => {
  return array.flatMap((item, index, array) => {
    return index < array.length - 1
      ? [item, isFunction(itemOrRender) ? itemOrRender(index) : itemOrRender]
      : item;
  });
};

export const isReactNodeDisplayable = (node: ReactNode) => {
  return isDefined(node) && typeof node !== 'boolean';
};
