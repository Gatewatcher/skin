import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Tree } from '@/skin/displays';

import Node from './components/Node';

export type JsonViewerProps = DataTestId & {
  data: object;
  defaultExpandedDepth?: number;
  forceToState?: 'expanded' | 'collapsed';
  onNodeClick?: (label: string, value: string | object, depth: number) => void;
  sort?: (keyA: string, keyB: string) => number;
  withJmesPathDragging?: boolean;
};

const JsonViewer = ({
  data,
  'data-testid': testId = 'json-viewer',
  defaultExpandedDepth,
  sort,
  forceToState,
  onNodeClick,
  withJmesPathDragging,
}: JsonViewerProps) => {
  return (
    <Tree data-testid={testId}>
      <Node
        data={data}
        defaultExpandedDepth={defaultExpandedDepth}
        depth={0}
        forceToState={forceToState}
        isArrayItem={Array.isArray(data)}
        onNodeClick={onNodeClick}
        path=""
        sort={sort}
        withJmesPathDragging={withJmesPathDragging}
      />
    </Tree>
  );
};

export default JsonViewer;
