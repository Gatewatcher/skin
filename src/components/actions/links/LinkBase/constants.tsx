import type { HTMLAttributeAnchorTarget } from 'react';

import { SIZE_VARIANTS } from '@/skin/typography/constants';

import type { LinkSize, LinkVariantBase } from './types';

export const LINK_VARIANTS_BASE = ['primary', 'secondary', 'subtle'] as const;
export const LINK_VARIANTS_BARED = ['bared'] as const;
export const LINK_VARIANTS = [
  ...LINK_VARIANTS_BASE,
  ...LINK_VARIANTS_BARED,
] as const;

export const LINK_TARGETS: HTMLAttributeAnchorTarget[] = ['_blank', '_self'];
export const LINK_SIZES = [...SIZE_VARIANTS] as const;

export const DEFAULT_VARIANT: LinkVariantBase = 'primary';
export const DEFAULT_IS_ALWAYS_UNDERLINED = false;
export const DEFAULT_SIZE: LinkSize = 'regular';
