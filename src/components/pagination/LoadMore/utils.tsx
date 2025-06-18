import type { LoadMoreParams } from './types';

export const calcOffset = ({
  page,
  perPage,
}: Required<Pick<LoadMoreParams, 'page' | 'perPage'>>) => {
  return perPage * (page - 1);
};
