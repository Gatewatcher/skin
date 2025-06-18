import { createContext, useContext } from 'react';

import type { SelectedState, TreeNodeId } from './types';

export type SelectableTreeContextType = {
  selectedIds: TreeNodeId[];
  setSelectedIds: (nodeId: TreeNodeId, shouldBeSelected: boolean) => void;
  isNodeSelected: (nodeId: TreeNodeId) => SelectedState;
  isNodePartiallySelected: (nodeId: TreeNodeId) => SelectedState;
};

export const SelectableTreeContext =
  createContext<SelectableTreeContextType | null>(null);

export const useSelectableTreeContext = () => {
  const context = useContext(SelectableTreeContext);
  if (!context) {
    throw new Error(
      'SelectableTree.* components must be rendered as children of SelectableTree',
    );
  }
  return context;
};
