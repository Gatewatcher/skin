import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { ReactElement } from 'react';
import { Fragment } from 'react';

export const isFragment = (
  variableToInspect?: unknown,
): variableToInspect is ReactElement<{ children?: unknown }> => {
  if (
    variableToInspect &&
    typeof variableToInspect === 'object' &&
    'type' in variableToInspect &&
    'props' in variableToInspect
  ) {
    return (variableToInspect as ReactElement).type === Fragment;
  }

  return variableToInspect === Fragment;
};

export const isEmptyFragment = (
  fragment?: unknown,
): fragment is ReactElement<{ children?: never }> => {
  if (!isFragment(fragment)) return false;

  const children = fragment.props.children;

  if (!children) {
    return true;
  }

  if (Array.isArray(children)) {
    return children.length === 0;
  }

  if (isString(children)) {
    return children.trim().length === 0;
  }

  return false;
};
