import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { ChangeEvent, ReactNode } from 'react';
import { useEffect } from 'react';

import { withStopPropagation } from '@/hocs';
import Checkbox from '@/skin/forms/inputs/Checkbox';
import { Stack } from '@/skin/layout';

import {
  InternalTreeNode,
  type TreeNodeProps,
} from '../../Tree/compounds/TreeNode';
import { useSelectableTreeContext } from '../context';

import styles from '../styles.module.scss';

export type SelectableTreeNodeProps = Omit<TreeNodeProps, 'element'> & {
  label: string;
  defaultChecked?: boolean;
  afterLabel?: ReactNode;
  disabled?: boolean;
};

const SelectableTreeNode = ({
  children,
  label,
  defaultChecked,
  id,
  afterLabel,
  disabled,
  ...props
}: SelectableTreeNodeProps) => {
  const { isNodeSelected, isNodePartiallySelected, setSelectedIds } =
    useSelectableTreeContext();
  const isSelected = isNodeSelected(id);
  const isPartiallySelected = isNodePartiallySelected(id);

  useEffect(() => {
    if (defaultChecked) {
      setSelectedIds(id, defaultChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultChecked]);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(id, event.target.checked);
  };

  return (
    <InternalTreeNode
      element={
        <>
          {withStopPropagation(
            <Stack.Item
              className={styles.CheckboxWrapper}
              flexBasis="auto"
              flexGrow={1}
              flexShrink={1}
              margin={{ right: 4 }}
              padding={{ left: 2 }}
            >
              <Checkbox
                checked={isSelected}
                data-testid={`checkbox-${id}`}
                disabled={disabled}
                indeterminate={isPartiallySelected}
                label={label}
                onChange={handleSelect}
              />
            </Stack.Item>,
          )}
          {afterLabel && (
            <Stack.Item margin={{ right: 4 }}>{afterLabel}</Stack.Item>
          )}
        </>
      }
      internalClassName={classNames(
        styles.SelectableTreeNode,
        isSelected && styles.selected,
      )}
      id={id}
      {...props}
    >
      {children}
    </InternalTreeNode>
  );
};

export default SelectableTreeNode;
