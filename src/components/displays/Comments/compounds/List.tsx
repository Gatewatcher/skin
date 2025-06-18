import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';

import type { ButtonAsyncProps } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import type { DataItem, ListProps } from '@/skin/listings';
import { List as SkinList } from '@/skin/listings';

export type CommentsListProps<T extends DataItem> = DataTestId &
  Omit<ListProps<T>, 'loadMoreType' | 'withControls'> & {
    loadMoreButton:
      | ReactElement<ButtonAsyncProps>
      | ((options: { isLoading?: boolean }) => ReactElement<ButtonAsyncProps>);
  };

const List = <T extends DataItem>({
  'data-testid': testId = 'comments-list',
  loadMoreButton,
  ...rest
}: CommentsListProps<T>) => {
  const { hasNextPage, isLoading } = rest;

  return (
    <Stack data-testid={testId} direction="column" gap={7}>
      <SkinList withControls={false} {...rest} />

      {hasNextPage && (
        <Stack justifyContent="center">
          {isFunction(loadMoreButton)
            ? loadMoreButton({ isLoading })
            : loadMoreButton}
        </Stack>
      )}
    </Stack>
  );
};

export default List;
