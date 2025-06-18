export type TreeNodeId = string | number;

export type SelectedState = boolean;

export type NodeDataType = {
  id: TreeNodeId;
  checked?: boolean;
  children: NodeDataType[];
};

export type SelectedIds = TreeNodeId[];

export type SetSelectedIds = (
  id: TreeNodeId,
  selected: boolean | ((previous: boolean) => boolean),
) => void;
