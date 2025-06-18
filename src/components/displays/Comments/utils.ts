import { isString } from '@gatewatcher/bistoury/utils-lang';

import { getThemeSpacing } from '@/utils';

import type { CommentUsername } from './types';

export const calcMarginLeft = (depth: number) => {
  return depth * 2 * parseInt(getThemeSpacing(13, 'px'), 10);
};

export const getUsername = (username: CommentUsername) => {
  return isString(username) ? username : username.value;
};

export const getAvatarColorGenerator = (username: CommentUsername) => {
  return !isString(username) ? username.colorGenerator : undefined;
};
