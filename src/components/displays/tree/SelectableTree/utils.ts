import { Children } from 'react';

import type { NodeDataType, TreeNodeId } from './types';

export const hasSelectableChildren = (node: NodeDataType): boolean =>
  !!node.children.length;

export const fromReactNodeToDataType = (
  reactElement: JSX.Element,
): NodeDataType => ({
  id: reactElement.props.id,
  checked: reactElement.props.defaultChecked ?? false,
  children: Children.toArray(reactElement.props?.children).map(element =>
    fromReactNodeToDataType(element as JSX.Element),
  ),
});

export const getChildrenIds = (node: NodeDataType, ids: TreeNodeId[] = []) => {
  if (hasSelectableChildren(node)) {
    node.children.forEach(child => getChildrenIds(child, ids));
  } else {
    ids.push(node.id);
  }
  return ids;
};
