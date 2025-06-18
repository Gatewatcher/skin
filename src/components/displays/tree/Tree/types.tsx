import type { TreeNodeProps } from './compounds/TreeNode';

export type ExpandValue = {
  expandedIds: Map<string | number, boolean>;
};

export type SetExpanded = (
  id: string | number,
  expanded: boolean | ((previous: boolean) => boolean),
) => void;

export type TreeNodeVariantInternalProps = {
  className?: string;
  isExpandable: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};
export type TreeNodeRenderProps = TreeNodeProps & TreeNodeVariantInternalProps;
