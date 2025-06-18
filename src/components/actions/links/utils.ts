import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { To } from 'react-router';

export const isExternalLink = (to: To): to is string => {
  if (!isString(to)) return false;

  const isOnlyPrefix = /^https?$/.test(to);

  const isSpecialLink =
    to.startsWith('mailto:') ||
    to.startsWith('tel:') ||
    to.startsWith('magnet:');

  return isSpecialLink || (to.startsWith('http') && !isOnlyPrefix);
};
