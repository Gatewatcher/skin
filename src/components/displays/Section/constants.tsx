import type { Spacings } from '@/hocs';
import type { TitleProps } from '@/skin/typography';

import type { SectionVariant } from './types';

export const SECTION_VARIANTS = ['primary', 'secondary', 'tertiary'] as const;

export const DEFAULT_PADDING: Spacings['padding'] = { y: 10, x: 9 };
export const DEFAULT_TITLE_TAG: TitleProps['as'] = 'h3';
export const DEFAULT_VARIANT: SectionVariant = 'primary';
