import { isFunction, isString } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import { type ReactNode, isValidElement } from 'react';

import type { DrawerItem, DrawerMatches } from './types';

export const getContent = <T>(
  matches: DrawerMatches,
  id: string,
  props?: T,
): { content: ReactNode } | null => {
  const match = matches[id];

  if (!match) {
    consoleWarn(`Drawer with id "${id}" does not exist`);
    return null;
  }

  const content = isFunction(match) ? match(props) : match;

  if (isValidElement(content) || isString(content)) {
    return { content };
  }

  const contentAsObject = content as DrawerItem;
  const { enabled = true } = contentAsObject;

  if (!enabled) {
    console.log(`Drawer with id ${id} is disabled`);
    return null;
  }

  return contentAsObject;
};
