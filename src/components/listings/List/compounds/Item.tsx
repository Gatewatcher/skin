import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';

import styles from '../styles.module.scss';

export type ListItemProps = DataTestId & {
  className?: string;
  children: ReactElement;
  active?: boolean;
};

const ListItem = ({
  children,
  className,
  active = false,
  'data-testid': testId = 'list-item',
}: ListItemProps) => {
  return (
    <li
      className={classNames(
        className,
        styles.Item,
        active && styles.ItemActive,
      )}
      data-testid={testId}
    >
      {children}
    </li>
  );
};

export default ListItem;
