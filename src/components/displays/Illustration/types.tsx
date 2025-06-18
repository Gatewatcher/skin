import type { ILLUSTRATION_NAMES } from '@/constants';

export type IllustrationName = typeof ILLUSTRATION_NAMES[number];

export type IllustrationStyling = { height?: 'auto'; width?: 'auto' };
