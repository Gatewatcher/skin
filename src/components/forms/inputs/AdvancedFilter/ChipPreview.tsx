import { Button } from '@/skin/actions';
import { Dropdown, Icon } from '@/skin/displays';
import type { ChipBaseProps } from '@/skin/displays/chips/ChipBase';
import ChipBase from '@/skin/displays/chips/ChipBase';
import { Stack } from '@/skin/layout';

import DropdownActions from './DropdownActions';
import { TEST_IDS } from './constants';

import styles from './styles.module.scss';

export type ChipPreviewProps = ChipBaseProps & {
  onEditFilter: () => void;
  onDelete: () => void;
  onDisabled: () => void;
};

const ChipPreview = ({
  onEditFilter,
  onDelete,
  onDisabled,
  children,
}: ChipPreviewProps) => {
  return (
    <Dropdown
      content={
        <DropdownActions
          onDelete={onDelete}
          onDisabled={onDisabled}
          onEditFilter={onEditFilter}
        />
      }
      data-testid={TEST_IDS.chipPreviewDropdownActions}
      placement="bottom-end"
      strategy="fixed"
      triggerOn={['click', 'focus']}
    >
      <Button data-testid={TEST_IDS.chipPreview} variant="bared">
        <ChipBase className={styles.ChipPreview}>
          <Stack alignItems="center" gap={2}>
            <Stack className={styles.ChipPreviewText} gap={2}>
              {children}
            </Stack>
            <Icon name="ChevronDown" />
          </Stack>
        </ChipBase>
      </Button>
    </Dropdown>
  );
};

export default ChipPreview;
