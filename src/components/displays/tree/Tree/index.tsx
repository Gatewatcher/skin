import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import TreeNode from './compounds/TreeNode';
import { TreeContext } from './context';
import useDefaultNodeData from './hooks/useDefaultNodeData';

import styles from './styles.module.scss';

export type TreeProps = DataTestId & {
  children: ReactNode;
  resetOnFold?: boolean;
};

const Tree = ({
  children,
  'data-testid': testId = 'tree',
  resetOnFold = false,
}: TreeProps) => {
  const [expandValue, setExpanded] = useDefaultNodeData();

  const memoValue = useMemo(
    () => ({
      expandedIds: expandValue.expandedIds,
      resetOnFold,
      setExpanded,
    }),
    [resetOnFold, setExpanded, expandValue],
  );

  return (
    <div className={styles.Tree} data-testid={testId}>
      <TreeContext.Provider value={memoValue}>{children}</TreeContext.Provider>
    </div>
  );
};

Tree.Node = TreeNode;

export default Tree;
