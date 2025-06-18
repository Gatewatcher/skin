import type { TestId } from '@gatewatcher/bistoury/utils-types';

import { buildTestIds } from '@/utils/testIds';

export const TEST_ID: TestId = 'carousel';
export const SUFFIX_TEST_IDS = [
  'preview',
  'previewContainer',
  'leftButton',
  'rightButton',
  'dropdownButton',
] as const;

export const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);
