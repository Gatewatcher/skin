import { isDefined, isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';

import type { DrawerItem, DrawerMatches } from './types';

export const getContent = <T>(
  matches: DrawerMatches,
  id: string,
  props?: T,
): ReactNode | undefined => {
  const tmpMatch = matches[id];

  if (!tmpMatch) {
    console.warn(`Drawer with id "${id}" does not exist`);
    return;
  }

  const match = isFunction(tmpMatch) ? tmpMatch(props) : tmpMatch;
  const isReactNode = isValidElement(match);

  if (isReactNode) return match;

  const matchAsObject = match as DrawerItem;

  if (isDefined(matchAsObject.enabled) && !matchAsObject.enabled) {
    return;
  }

  return matchAsObject.content;
};
