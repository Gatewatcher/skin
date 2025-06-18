import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { withoutKey } from '@gatewatcher/bistoury/utils-lang';

import type { ItemContentProps } from './ItemContent';
import type { ItemLinkProps } from './SelectableItemLink';

import styles from './styles.module.scss';

export const buildItemClassName = ({
  isDisabled,
  isFocused,
  isSelected,
  fill,
}: Partial<ItemLinkProps>) => {
  return classNames(
    styles.Item,
    isDisabled && styles.ItemDisabled,
    isFocused && styles.ItemFocused,
    isSelected && styles.ItemSelected,
    fill && styles.ItemContentFill,
  );
};

export const getAttritbutes = (attributes: Partial<ItemContentProps>) =>
  withoutKey(attributes, [
    'children',
    'endElement',
    'isDisabled',
    'isFocused',
    'isSelected',
    'startElement',
    'size',
    'type',
  ]);
