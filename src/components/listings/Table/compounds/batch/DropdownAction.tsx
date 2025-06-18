import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Button } from '@/skin/actions';
import type { IconProps } from '@/skin/displays';
import { Dropdown, Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import styles from '../../styles.module.scss';

export type BatchDropdownActionProps = {
  actions: ReactNode;
  children?: ReactNode;
  startIcon?: IconProps['name'];
};

export const BatchDropdownAction = ({
  actions,
  children = 'Actions',
  startIcon,
}: BatchDropdownActionProps) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Dropdown
      content={actions}
      isOpened={isOpened}
      placement="top-start"
      setIsOpened={setIsOpened}
      triggerOn="click"
    >
      <Button size="small" startIcon={startIcon} variant="transparent">
        <Stack gap={2} justifyContent="space-around">
          {children}
          <Icon
            className={classNames(
              styles.BatchActionsDropdownActionIcon,
              isOpened && styles.BatchActionsDropdownActionIconUpsideDown,
            )}
            name="ChevronDown"
            currentColor
          />
        </Stack>
      </Button>
    </Dropdown>
  );
};
