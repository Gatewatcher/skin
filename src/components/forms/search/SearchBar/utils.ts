import type { SearchBarProps } from '.';
import { DEFAULT_PLACEHOLDER, DEFAULT_SHORTCUT_PLACEHOLDER } from './constants';

export const getPlaceholder = ({
  placeholder,
  withShortcut,
}: Pick<SearchBarProps, 'placeholder' | 'withShortcut'>) => {
  if (placeholder) return placeholder;
  if (withShortcut) return DEFAULT_SHORTCUT_PLACEHOLDER;
  return DEFAULT_PLACEHOLDER;
};
