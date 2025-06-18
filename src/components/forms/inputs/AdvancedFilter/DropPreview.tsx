import type { ReactNode } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Dropdown } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import DropdownActions from './DropdownActions';
import { TEST_IDS } from './constants';

export type DropPreviewProps = {
  onEditFilter: () => void;
  onDelete: () => void;
  onDisabled: () => void;
  children: ReactNode;
};

const DropPreview = ({
  onEditFilter,
  onDelete,
  onDisabled,
  children,
}: DropPreviewProps) => {
  return (
    <Stack
      alignItems="center"
      data-testid={TEST_IDS.dropPreview}
      gap={2}
      justifyContent="space-between"
    >
      <Stack gap={2}>{children}</Stack>
      <Dropdown
        content={
          <DropdownActions
            onDelete={onDelete}
            onDisabled={onDisabled}
            onEditFilter={onEditFilter}
          />
        }
        data-testid={TEST_IDS.dropPreviewDropdownActions}
        placement="bottom-end"
        strategy="fixed"
        triggerOn={['click', 'focus']}
      >
        <ButtonIcon
          data-testid={TEST_IDS.dropPreviewButtonActions}
          icon="OverflowMenuHorizontal"
          type="neutral"
          variant="ghosted"
        />
      </Dropdown>
    </Stack>
  );
};

export default DropPreview;
