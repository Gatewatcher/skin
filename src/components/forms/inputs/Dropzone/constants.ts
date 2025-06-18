import type { TestId } from '@gatewatcher/bistoury/utils-types';

import type { DropAnimationPosition } from './types';

export const TEST_ID: TestId = 'dropzone';
export const SUFFIX_TEST_IDS = ['input', 'inner'] as const;
export const DRAG_FILES_DEFAULT_LABEL = 'Drag and drop your files to upload';

export const DEFAULT_DROP_ANIMATION_POSITION: DropAnimationPosition = 'bottom';
