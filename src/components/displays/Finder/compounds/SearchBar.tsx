import { useEffect } from 'react';

import type { SearchBarProps } from '@/skin/forms';
import { SearchBar as SkinSearchBar } from '@/skin/forms';

export type FinderSearchBarProps = Omit<SearchBarProps, 'variant'>;

const SearchBar = ({
  'data-testid': testId = 'finder-search',
  placeholder = 'Search',
  onChange,
  ...rest
}: FinderSearchBarProps) => {
  useEffect(() => {
    return () => onChange?.('');
  }, []);

  return (
    <SkinSearchBar
      data-testid={testId}
      onChange={onChange}
      placeholder={placeholder}
      variant="underlined"
      withShortcut={false}
      {...rest}
    />
  );
};

export default SearchBar;
