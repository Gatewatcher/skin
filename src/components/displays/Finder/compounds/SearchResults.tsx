import type { ListProps } from '@/skin/listings';
import { List } from '@/skin/listings';

import { EmptyElement, FirstLoader } from '../components/list';
import type { ItemBase } from '../types';

export type FinderSearchResultsProps<T extends ItemBase> = ListProps<T>;

const SearchResults = <T extends ItemBase>({
  'data-testid': testId = 'finder-search-results',
  emptyMessage = 'No results found',
  ...rest
}: FinderSearchResultsProps<T>) => {
  return (
    <List
      data-testid={testId}
      emptyElement={<EmptyElement>{emptyMessage}</EmptyElement>}
      firstLoader={<FirstLoader />}
      gap={2}
      {...rest}
      withControls={false}
    />
  );
};

export default SearchResults;
