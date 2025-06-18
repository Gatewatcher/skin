import { areEqual, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactElement } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type {
  NodeDataType,
  SelectedIds,
  SelectedState,
  SetSelectedIds,
  TreeNodeId,
} from '../types';
import {
  fromReactNodeToDataType,
  getChildrenIds,
  hasSelectableChildren,
} from '../utils';

export type useSelectableNodeDataOptions = {
  withAllNodeUnselectable: boolean;
};

const useSelectableNodeData = (
  children: ReactElement[],
  options: useSelectableNodeDataOptions,
) => {
  const [selectedIds, setSelectedIds] = useState<SelectedIds>([]);
  const { withAllNodeUnselectable } = options;

  const treeNodesRecord = useMemo(
    () => children.map(fromReactNodeToDataType)[0],
    [children],
  );

  const setNodeLeavesState = (
    nodeId: TreeNodeId,
    shouldBeSelected: boolean,
  ) => {
    const node = getNodeDataById(nodeId);

    if (
      node &&
      !withAllNodeUnselectable &&
      !shouldBeSelected &&
      areEqual(getChildrenIds(node).sort(), selectedIds.sort())
    ) {
      return;
    }

    if (node && hasSelectableChildren(node)) {
      node.children.forEach(childNode => {
        setNodeLeavesState(childNode.id, shouldBeSelected);
      });
    } else {
      setSelected(nodeId, shouldBeSelected);
    }
  };

  const normalizeTreeSelection = (node: NodeDataType = treeNodesRecord) => {
    if (hasSelectableChildren(node) && selectedIds.includes(node.id)) {
      setSelected(node.id, false);
      setNodeLeavesState(node.id, true);
    }
    node.children.forEach(child => {
      normalizeTreeSelection(child);
    });
  };

  const isNodeSelected = (nodeId: TreeNodeId): SelectedState => {
    const isSelfSelected = selectedIds.includes(nodeId);
    const node = getNodeDataById(nodeId);

    const isChildrenSelected = (data: NodeDataType) => isNodeSelected(data.id);

    const areAllChildrenSelected =
      node && hasSelectableChildren(node)
        ? node.children.map(isChildrenSelected).every(p => p)
        : false;

    return isSelfSelected || areAllChildrenSelected;
  };

  const isNodePartiallySelected = (nodeId: TreeNodeId): SelectedState => {
    const node = getNodeDataById(nodeId);

    const isChildrenSelected = (data: NodeDataType) => isNodeSelected(data.id);

    const mappedChildren =
      node && hasSelectableChildren(node)
        ? node.children.map(isChildrenSelected)
        : [];

    const selectedChildren = mappedChildren.filter(Boolean);

    const childrenSelected =
      !!node?.children &&
      node.children.some(node => isNodePartiallySelected(node.id));

    return (
      childrenSelected ||
      (!!selectedChildren.length &&
        selectedChildren.length !== mappedChildren.length)
    );
  };

  const getNodeDataById = (
    id: TreeNodeId,
    node: NodeDataType = treeNodesRecord,
  ): NodeDataType | undefined => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const result = getNodeDataById(id, child);

      if (result) return result;
    }
    return undefined;
  };

  const setSelected = useCallback<SetSelectedIds>(
    (id, selected) => {
      const current = selectedIds.includes(id);
      const newSelected = isFunction(selected) ? selected(current) : selected;

      if (newSelected !== current && current) {
        setSelectedIds(prev => prev.filter(e => e !== id));
      } else if (newSelected !== current && !current) {
        setSelectedIds(prev => [...prev, id]);
      }
    },
    [selectedIds],
  );

  return {
    selectedIds,
    setSelectedIds: setNodeLeavesState,
    isNodeSelected,
    isNodePartiallySelected,
    normalizeTreeSelection,
  };
};

export default useSelectableNodeData;
