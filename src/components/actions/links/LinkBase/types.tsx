import type {
  LINK_SIZES,
  LINK_VARIANTS,
  LINK_VARIANTS_BARED,
  LINK_VARIANTS_BASE,
} from './constants';

export type LinkVariantBase = typeof LINK_VARIANTS_BASE[number];
export type LinkVariantBared = typeof LINK_VARIANTS_BARED[number];
export type LinkVariant = typeof LINK_VARIANTS[number];
export type LinkSize = typeof LINK_SIZES[number];
export type LinkAs = 'a' | 'link' | 'navlink';
