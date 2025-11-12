import { isObject } from '@gatewatcher/bistoury/utils-lang';
import { Fragment, useEffect } from 'react';

import { InternalTreeNode } from '@/skin/displays/tree/Tree/compounds/TreeNode';
import { useTreeContext } from '@/skin/displays/tree/Tree/context';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { JsonViewerProps } from '..';
import { calcOffset, getNodeFullPath } from '../utils';
import Draggable from './Draggable';
import FoldIndicator from './FoldIndicator';
import Leaf from './Leaf';

import styles from '../styles.module.scss';

type JsonViewerNodeProps = Pick<
  JsonViewerProps,
  'sort' | 'defaultExpandedDepth'
> & {
  arrayLength?: number;
  data: object;
  depth: number;
  forceToState?: 'expanded' | 'collapsed';
  isArrayItem?: boolean;
  onNodeClick?: (label: string, value: string | object, depth: number) => void;
  path: string;
  withJmesPathDragging?: boolean;
};

const Node = ({
  arrayLength,
  data,
  defaultExpandedDepth,
  depth,
  forceToState,
  isArrayItem,
  onNodeClick,
  path,
  sort,
  withJmesPathDragging,
}: JsonViewerNodeProps) => {
  const sortedData = sort
    ? Object.entries(data).sort(([a], [b]) => sort(a, b))
    : Object.entries(data);

  const { setExpanded } = useTreeContext();

  useEffect(() => {
    if (forceToState)
      sortedData.forEach(([label]) => {
        const fullPath = getNodeFullPath({ path, label, isArrayItem });
        setExpanded(fullPath, forceToState === 'expanded');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceToState]);

  return sortedData.map(([label, value]) => {
    const childIsArray = Array.isArray(value);
    const fullPath = getNodeFullPath({ path, label, isArrayItem });

    let jmesPath = fullPath.replace(/\[\d+]/g, '[]');
    if (isArrayItem) {
      jmesPath = jmesPath.replace(/\[]$/, `[${label}]`);
    }
    if (Array.isArray(value)) {
      jmesPath = `${jmesPath}[]`;
    }

    return isObject(value) ? (
      <InternalTreeNode
        key={label}
        defaultExpanded={
          !!defaultExpandedDepth && depth <= defaultExpandedDepth
        }
        render={props => {
          const { onToggle, isExpanded, isExpandable, children } = props;
          const count = Object.values(value).length;
          const type = childIsArray ? '[]' : '{}';

          const handleNodeClick = () => {
            onToggle();
            onNodeClick?.(label, value, depth);
          };

          return (
            <>
              <Stack
                alignItems="baseline"
                className={styles.node}
                data-testid="json-viewer-node"
                gap={3}
                margin={{ bottom: 3 }}
                onClick={handleNodeClick}
                style={{ marginLeft: calcOffset(depth) }}
                tabIndex={0}
              >
                <FoldIndicator
                  {...props}
                  isExpandable={isExpandable && !!count}
                />
                <Draggable
                  data={`{{ ${jmesPath} }}`}
                  disabled={!withJmesPathDragging}
                >
                  <Text weight="medium">{`${label}:`}</Text>
                </Draggable>
                <Text currentColor>
                  {count ? (
                    <>{`${type} ${count > 1 ? `${count} items` : '1 item'}`}</>
                  ) : (
                    type
                  )}
                </Text>
              </Stack>
              {isExpanded && <Stack direction="column">{children}</Stack>}
            </>
          );
        }}
        element={<Fragment />}
        id={fullPath}
      >
        <Node
          arrayLength={childIsArray ? value.length : 0}
          data={value}
          defaultExpandedDepth={defaultExpandedDepth}
          depth={depth + 1}
          forceToState={forceToState}
          isArrayItem={childIsArray}
          onNodeClick={onNodeClick}
          path={fullPath}
          sort={sort}
          withJmesPathDragging={withJmesPathDragging}
        />
      </InternalTreeNode>
    ) : (
      <Leaf
        key={label}
        arrayLength={arrayLength}
        depth={depth}
        isArrayItem={Array.isArray(data)}
        label={label}
        path={fullPath}
        value={value}
        withJmesPathDragging={withJmesPathDragging}
      />
    );
  });
};

export default Node;
