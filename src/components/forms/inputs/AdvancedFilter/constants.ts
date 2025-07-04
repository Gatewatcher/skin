import type { TestId } from '@gatewatcher/bistoury/utils-types';

import { buildTestIds } from '@/utils/testIds';

export const TEST_ID: TestId = 'advancedFilter';
export const SUFFIX_TEST_IDS = [
  'base',
  'filterButton',
  'addFilter',
  'advancedFilter',
  'advancedFilterConditionerCancel',
  'advancedFilterItemButtonActions',
  'advancedFilterFooterActionClearAll',
  'advancedFilterFooterActionAddFilter',
  'chipPreview',
  'chipPreviewDropdownActions',
  'dropdownActionEdit',
  'dropdownActionExclude',
  'dropdownActionDelete',
  'dropdownActionDisable',
  'dropPreview',
  'dropPreviewButtonActions',
  'dropPreviewDropdownActions',
] as const;

export const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

export const DEFAULT_ADVANCED_FILTER_FOOTER_ADD_TEXT = 'Add filter';
export const DEFAULT_ADVANCED_FILTER_FOOTER_CLEAR_TEXT = 'Clear all';
export const DEFAULT_ADVANCED_FILTER_FOOTER_DISABLE_TEXT = 'Disable all';
export const DEFAULT_ADVANCED_FILTER_FOOTER_ENABLE_TEXT = 'Enable filter';
