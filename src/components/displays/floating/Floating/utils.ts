import { stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';

import type { FloatingSize } from './types';

import styles from './styles.module.scss';

export const getSizeClassName = (size: FloatingSize) => {
  return stylesToCamelCase(styles, 'size', size);
};
