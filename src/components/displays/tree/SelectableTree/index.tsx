import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { areEqual } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { Children, useEffect, useMemo } from 'react';

import useSelectableNodeData from '../SelectableTree/hooks/useSelectableNodeData';
import Tree from '../Tree';
import SelectableTreeNode from './compounds/SelectableTreeNode';
import { SelectableTreeContext } from './context';
import type { TreeNodeId } from './types';

export type SelectableTreeProps = DataTestId & {
  children: ReactNode;
  resetOnFold?: boolean;
  onChange?: (selectedIds: TreeNodeId[]) => void;
  value?: TreeNodeId[];
  withAllNodeUnselectable?: boolean;
};

const SelectableTree = ({
  children,
  resetOnFold = false,
  onChange,
  value,
  withAllNodeUnselectable = true,
}: SelectableTreeProps) => {
  const {
    selectedIds,
    setSelectedIds,
    isNodeSelected,
    isNodePartiallySelected,
    normalizeTreeSelection,
  } = useSelectableNodeData(Children.toArray(children) as ReactElement[], {
    withAllNodeUnselectable,
  });

  const contextValue = useMemo(
    () => ({
      selectedIds,
      setSelectedIds,
      isNodeSelected,
      isNodePartiallySelected,
    }),
    [selectedIds, setSelectedIds, isNodeSelected, isNodePartiallySelected],
  );

  useDidMountEffect(() => {
    onChange?.(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    if (!value || areEqual(value, selectedIds)) return;

    value.forEach(id => {
      setSelectedIds(id, true);
    });

    selectedIds.forEach(id => {
      setSelectedIds(id, value.includes(id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  normalizeTreeSelection();

  return (
    <SelectableTreeContext.Provider value={contextValue}>
      <Tree resetOnFold={resetOnFold}>{children}</Tree>
    </SelectableTreeContext.Provider>
  );
};

SelectableTree.Node = SelectableTreeNode;

export default SelectableTree;
