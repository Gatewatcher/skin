import type { CopyToClipboardGrow } from './types';

export const COPY_TO_CLIPBOARD_GROWTHS = ['outside', 'inside'] as const;

export const DEFAULT_TEST_ID = 'copy-to-clipboard-link';

export const DEFAULT_GROW: CopyToClipboardGrow = 'outside';
export const DEFAULT_LEAVE_TRANSITION_DELAY = 300;
export const DEFAULT_TRANSITION_DURATION = 250;
export const DEFAULT_SUCCESS_DURATION = 2000;
