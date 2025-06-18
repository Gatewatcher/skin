import { createContext, useContext } from 'react';

export type TreeContextType = {
  expandedIds: Map<string | number, boolean>;
  resetOnFold: boolean;
  setExpanded: (
    id: string | number,
    setter: boolean | ((previous: boolean) => boolean),
  ) => void;
};

export const TreeContext = createContext<TreeContextType | null>(null);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('Tree.* components must be rendered as children of Tree');
  }
  return context;
};
