import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import TreeNodeDefault from '../components/TreeNodeDefault';
import { useTreeContext } from '../context';
import type {
  TreeNodeRenderProps,
  TreeNodeVariantInternalProps,
} from '../types';

export type TreeNodeProps = DataTestId & {
  children?: ReactNode;
  defaultExpanded?: boolean;
  id: string | number;
  element: ReactNode;
  expandedElement?: ReactNode;
};

export type TreeNodeInternalProps = {
  internalClassName?: string;
  render?: (data: TreeNodeRenderProps) => ReactNode;
};

export const InternalTreeNode = (
  props: TreeNodeProps & TreeNodeInternalProps,
) => {
  const {
    children,
    defaultExpanded,
    expandedElement,
    internalClassName,
    id,
    render,
  } = props;

  const { expandedIds, resetOnFold, setExpanded } = useTreeContext();
  const isExpanded = expandedIds.get(id) ?? defaultExpanded ?? false;
  const isExpandable = !!(children || expandedElement);

  useEffect(() => {
    setExpanded(id, isExpanded);
  }, [id, isExpanded, setExpanded]);

  useEffect(() => {
    return () => {
      if (resetOnFold) {
        expandedIds.delete(id);
      }
    };
  }, [expandedIds, id, resetOnFold]);

  const handleClick = () => {
    if (isExpandable) {
      setExpanded(id, p => !p);
    }
  };

  const internalProps: TreeNodeVariantInternalProps = {
    className: internalClassName,
    isExpandable,
    isExpanded,
    onToggle: handleClick,
  };

  return render ? (
    render({ ...props, ...internalProps })
  ) : (
    <TreeNodeDefault {...props} {...internalProps} />
  );
};

const TreeNode = (props: TreeNodeProps) => <InternalTreeNode {...props} />;

export default TreeNode;
