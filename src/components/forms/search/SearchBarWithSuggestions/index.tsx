import { useRoveFocus } from '@gatewatcher/bistoury/hooks';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import { useEffect, useState } from 'react';

import { withSpacing } from '@/hocs';
import { Dropdown, Icon } from '@/skin/displays';
import { CircularLoader, Placeholder } from '@/skin/feedback';

import type { SearchBarProps } from '../SearchBar';
import SearchBar from '../SearchBar';
import { DEFAULT_TEST_ID } from './constants';
import type { Suggestion, Suggestions } from './types';

import styles from './styles.module.scss';

export type SearchBarWithSuggestionsProps = Omit<
  SearchBarProps,
  'onEnter' | 'onEscape' | 'onArrowUp' | 'onArrowDown' | 'onFocus' | 'onBlur'
> & {
  closeOnSelect?: boolean;
  suggestions: Suggestions;
  onSuggestionChange?: (value: Suggestion['label']) => void;
  withEmptyPlaceholder?: boolean;
  withErrorPlaceholder?: boolean;
  withLoadingPlaceholder?: boolean;
  withSuggestionAutofocus?: boolean;
};

const SearchBarWithSuggestions = ({
  closeOnSelect,
  'data-testid': testId = DEFAULT_TEST_ID,
  isError,
  isLoading,
  onChange,
  onSuggestionChange,
  value,
  suggestions,
  withEmptyPlaceholder,
  withErrorPlaceholder,
  withLoadingPlaceholder,
  withSuggestionAutofocus,
  ...rest
}: SearchBarWithSuggestionsProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { currentFocus, setCurrentFocus, setCurrentSize } = useRoveFocus(
    suggestions.length,
  );

  useEffect(
    () => setCurrentSize(suggestions.length),
    [setCurrentSize, suggestions.length],
  );

  const handleChange = (value: string) => {
    onChange?.(value);
    setCurrentFocus(withSuggestionAutofocus ? 0 : -1);
    setShowSuggestions(true);
  };

  const handleEnter = () => {
    onSuggestionChange?.(suggestions[currentFocus].label);
    setCurrentFocus(-1);
    setShowSuggestions(!closeOnSelect);
  };

  const handleClick = (value: string) => {
    onSuggestionChange?.(value);
    setCurrentFocus(-1);
    setShowSuggestions(!closeOnSelect);
  };

  const isEmpty = suggestions && !suggestions.length;

  const errorPlaceholder = withErrorPlaceholder ? (
    <Placeholder data-testid="dropdown-error-placeholder">
      <Placeholder.Illustration name="Error" />
      <Placeholder.Title>Unexpected error</Placeholder.Title>
    </Placeholder>
  ) : null;

  const emptyPlaceholder = withEmptyPlaceholder ? (
    <Placeholder data-testid="dropdown-empty-placeholder">
      <Placeholder.Illustration name="FolderEmpty" />
      <Placeholder.Title>Empty data</Placeholder.Title>
    </Placeholder>
  ) : null;

  const loadingPlaceholder =
    withLoadingPlaceholder && isLoading
      ? withSpacing(
          <div>
            <CircularLoader data-testid="dropdown-loading-placeholder" />
          </div>,
          { margin: 8 },
        )
      : null;

  const suggestionsElement =
    suggestions && suggestions.length
      ? suggestions.map((suggestion, index) => (
          <Dropdown.Button
            key={suggestion.label}
            isFocused={index === currentFocus}
            onClick={() => handleClick(suggestion.label)}
            startElement={<Icon name={suggestion.icon} />}
          >
            {suggestion.label}
          </Dropdown.Button>
        ))
      : null;

  const dropdownContent =
    showSuggestions &&
    (loadingPlaceholder
      ? loadingPlaceholder
      : isError
      ? errorPlaceholder
      : isEmpty
      ? emptyPlaceholder
      : suggestionsElement);

  return (
    <div className={styles.SearchBarWithSuggestions}>
      <SearchBar
        {...rest}
        data-testid={testId}
        onArrowDown={() => setShowSuggestions(true)}
        onArrowUp={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        onChange={handleChange}
        onEnter={handleEnter}
        onEscape={() => setShowSuggestions(false)}
        onFocus={() => setShowSuggestions(true)}
        value={value}
      />
      {showSuggestions && (
        <div
          className={styles.suggestions}
          data-testid={suffixTestId(testId, 'dropdown')}
          onMouseDown={ev => ev.preventDefault()}
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
