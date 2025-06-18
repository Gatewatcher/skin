import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { Children } from 'react';
import type { ValueContainerProps } from 'react-select';

import { useSelectContext } from '../../SelectBase/context';
import type { Option } from '../../SelectBase/types';

type UseSliceChildrenProps<OptionValue, OptionMeta> = Pick<
  ValueContainerProps<Option<OptionValue, OptionMeta>>,
  'children' | 'getValue' | 'isMulti'
>;

export const useSliceChildren = <OptionValue, OptionMeta>({
  children,
  getValue,
  isMulti,
}: UseSliceChildrenProps<OptionValue, OptionMeta>) => {
  const selectedCount = getValue().length;
  const collapsedCount = useCollapsedCount(selectedCount);
  const displayableCount = useDisplayableCount(selectedCount);

  const childrenArray = Children.toArray(children);
  const displayableChildren = childrenArray.slice(0, displayableCount);
  const otherChildren = isMulti ? childrenArray.slice(selectedCount) : children;

  return {
    collapsedCount,
    displayableChildren,
    otherChildren,
  };
};

export const useDisplayableCount = (selectedCount: number) => {
  const { displayMaxItems } = useSelectContext();
  return Math.min(selectedCount, displayMaxItems ?? selectedCount);
};

export const useCollapsedCount = (selectedCount: number) => {
  const { displayMaxItems } = useSelectContext();
  return isDefined(displayMaxItems)
    ? Math.max(selectedCount - displayMaxItems, 0)
    : 0;
};
