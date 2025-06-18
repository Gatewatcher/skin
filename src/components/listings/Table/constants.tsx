import type { ButtonIconProps } from '@/skin/actions';
import { Button } from '@/skin/actions';
import type { DropdownButtonProps } from '@/skin/displays/floating/Dropdown/compounds/Button';
import { Text } from '@/skin/typography';

import type { DataItem } from '../Listing/types';
import type { BatchOptions, Layout, PinnedColumns, Variant } from './types';

export const VARIANTS = ['default'] as const;
export const LAYOUTS = ['auto', 'fixed'] as const;

export const DEFAULT_WITH_STICKY_HEADERS = false;
export const DEFAULT_LAYOUT: Layout = 'auto';
export const DEFAULT_VARIANT: Variant = 'default';
export const DEFAULT_IS_RESIZABLE = false;
export const DEFAULT_OVERFLOWN_TEXT_HEADERS = false;

export const DEFAULT_DROPDOWN_MINWIDTH = 640;

export const DEFAULT_BATCH_OPTIONS: Required<BatchOptions> = {
  actions: () => [],
  clearText: 'Clear all',
  'data-testid': 'batch-actions',
  min: 1,
  selectionText: ({ selectedCount }) => (
    <Text size="small">
      <Text as="strong" data-testid="count" size="small">
        {selectedCount}
      </Text>{' '}
      {selectedCount === 1 ? 'row' : 'rows'} selected
    </Text>
  ),
  selectAllText: ({ totalItemsCount, onClick }) => (
    <Button onClick={onClick} size="small" variant="transparent">
      {`Select the ${totalItemsCount} rows`}
    </Button>
  ),
};

export const DEFAULT_BATCH_SELECT_ID_EXTRACTOR = (row: DataItem) =>
  (row as Record<string, unknown>).id?.toString();

export const ACTION_CELL_TYPE: Record<
  NonNullable<DropdownButtonProps['type']>,
  ButtonIconProps['type']
> = {
  critical: 'danger',
  danger: 'danger',
  error: 'danger',
  high: 'neutral',
  info: 'primary',
  low: 'primary',
  medium: 'neutral',
  success: 'neutral',
  warning: 'neutral',
};

export const DEFAULT_PINNED_COLUMNS: PinnedColumns = { left: [], right: [] };

export const COLUMN_PIN_MENU_TRIGGER_TEST_ID = 'column-pin-menu-trigger';
export const COLUMN_PIN_DROPDOWN_TEST_ID = 'column-pin-dropdown';
export const COLUMN_PINNING_VERSION = '1.0.0';
