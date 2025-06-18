import type { ReactNode } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Dropdown } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import { VerticalDivider } from './VerticalDivider';

import styles from '../styles.module.scss';

export type ToolbarProps = {
  dropdownActions: ReactNode;
  dropdownEnabled: boolean;
  toolbar?: ReactNode;
};

const Toolbar = ({
  dropdownActions,
  dropdownEnabled,
  toolbar,
}: ToolbarProps) => {
  return (
    <Stack
      alignItems="center"
      className={styles.toolbar}
      gap={8}
      margin={{ x: 8, y: 4 }}
    >
      {toolbar}
      {dropdownEnabled && (
        <>
          <VerticalDivider />
          <Dropdown
            content={<Dropdown.Content>{dropdownActions}</Dropdown.Content>}
            placement="bottom-end"
            triggerOn="click"
          >
            <ButtonIcon
              aria-label="open menu"
              icon="OverflowMenuVertical"
              variant="ghosted"
            />
          </Dropdown>
        </>
      )}
    </Stack>
  );
};

export default Toolbar;
