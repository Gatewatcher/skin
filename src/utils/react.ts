import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { ReactElement } from 'react';
import { Fragment } from 'react';

export const isFragment = (
  variableToInspect?: unknown,
): variableToInspect is ReactElement => {
  if ((variableToInspect as ReactElement)?.type) {
    return (variableToInspect as ReactElement).type === Fragment;
  }

  return variableToInspect === Fragment;
};

export const isEmptyFragment = (fragment?: unknown) => {
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
