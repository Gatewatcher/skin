import type { DropdownProps } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';

import styles from '../styles.module.scss';

export type SideNavItemProps = Pick<
  DropdownProps,
  'data-testid' | 'onOpen' | 'onClose' | 'children' | 'content'
>;

const SideNavItem = ({
  children,
  'data-testid': testId = 'side-nav-item',
  content,
}: SideNavItemProps) => {
  return (
    <div className={styles.Item} data-testid={testId}>
      <Dropdown
        className={styles.ItemDropdown}
        content={content}
        maxHeight="fit"
        minWidth="fit"
        placement="right-end"
        strategy="absolute"
        triggerOn={['click', 'focus']}
        withBorder={false}
      >
        {children}
      </Dropdown>
    </div>
  );
};

export default SideNavItem;
