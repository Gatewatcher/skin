import { classNames } from '@gatewatcher/bistoury/utils-dom';

import Icon from '@/skin/displays/icons/Icon';
import { Stack } from '@/skin/layout';

import type { TreeNodeRenderProps } from '../../types';

import styles from './styles.module.scss';

const TreeNodeDefault = ({
  className,
  children,
  'data-testid': testId = 'tree',
  expandedElement,
  isExpandable,
  isExpanded,
  element,
  onToggle,
}: TreeNodeRenderProps) => {
  return (
    <>
      <Stack
        className={classNames(
          styles.TreeNode,
          isExpandable && styles.expandable,
          className,
        )}
        alignItems="center"
        data-testid={testId}
        gap={6}
        onClick={onToggle}
        wrap="wrap"
      >
        <Stack
          alignItems="center"
          className={styles.TreeNodeContent}
          flexGrow={1}
        >
          {element}
          {isExpandable && (
            <Stack
              className={classNames(
                styles.indicatorContainer,
                isExpanded && styles.expanded,
              )}
              alignItems="center"
            >
              <Icon name="ChevronDown" />
            </Stack>
          )}
        </Stack>
        {!!expandedElement && isExpanded && (
          <Stack.Item flexBasis="100%" flexGrow={1} flexShrink={0}>
            {expandedElement}
          </Stack.Item>
        )}
      </Stack>
      {isExpanded && <div className={styles.ChildrenContainer}>{children}</div>}
    </>
  );
};

export default TreeNodeDefault;
