import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';

import type { TypographyVariantsProps } from './types';

import styles from './styles.module.scss';

export const getVariantClassNames = ({
  alignment,
  overflowWrap,
  size,
  transform,
  weight,
  whiteSpace,
  wordBreak,
}: TypographyVariantsProps) =>
  classNames(
    stylesToCamelCase(styles, 'alignment', alignment || ''),
    stylesToCamelCase(styles, 'wordBreak', wordBreak || ''),
    stylesToCamelCase(styles, 'overflowWrap', overflowWrap || ''),
    stylesToCamelCase(styles, 'size', size || ''),
    stylesToCamelCase(styles, 'weight', weight || ''),
    stylesToCamelCase(styles, 'transform', transform || ''),
    stylesToCamelCase(styles, 'whiteSpace', whiteSpace || ''),
  );
