import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';

import { TEST_IDS } from './constants';

export const buildLayoutTestIds = (base: string) => ({
  sideNav: suffixTestId(base, TEST_IDS.sideNav),
});

export const buildPanelLayoutTestIds = (base: string) => ({
  topNavZone: suffixTestId(base, TEST_IDS.topNav),
  contentGrid: suffixTestId(base, TEST_IDS.contentGrid),
});
