import { getThemeSpacing } from '@/utils';

export const calcOffset = (depth: number) => {
  return depth * Number(getThemeSpacing(7, 'px'));
};

export type GetNodeFullPathParams = {
  path: string;
  label: string;
  isArrayItem?: boolean;
};

export const getNodeFullPath = ({
  path,
  label,
  isArrayItem,
}: GetNodeFullPathParams) => {
  const currentItemPath = isArrayItem
    ? `[${label}]`
    : path
    ? `.${label}`
    : label;
  return `${path}${currentItemPath}`;
};
