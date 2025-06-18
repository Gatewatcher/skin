import type { TextDisplay, TextTag } from './types';

export const TEXT_TAGS = ['span', 'strong', 'em'] as const;
export const TEXT_DISPLAYS = ['inline-block', 'inline'] as const;

export const DEFAULT_TAG: TextTag = 'span';
export const DEFAULT_TEXT_DISPLAY: TextDisplay = 'inline-block';
