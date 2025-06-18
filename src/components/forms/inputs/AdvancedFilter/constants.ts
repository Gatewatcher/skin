import type { TestId } from '@gatewatcher/bistoury/utils-types';

import { buildTestIds } from '@/utils/testIds';

export const TEST_ID: TestId = 'advancedFilter';
export const SUFFIX_TEST_IDS = [
  'base',
  'filterButton',
  'addFilter',
  'advancedFilter',
  'advancedFilterItemButtonActions',
  'advancedFilterFooterActionClearAll',
  'advancedFilterFooterActionAddFitler',
  'chipPreview',
  'chipPreviewDropdownActions',
  'dropdownActionEdit',
  'dropdownActionDelete',
  'dropdownActionDisable',
  'dropPreview',
  'dropPreviewButtonActions',
  'dropPreviewDropdownActions',
] as const;

export const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);
