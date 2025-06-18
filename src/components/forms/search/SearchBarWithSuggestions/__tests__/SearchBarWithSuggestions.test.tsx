import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEFAULT_TEST_ID } from '../constants';
import type { SearchBarWithSuggestionsProps } from '../index';
import SearchBarWithSuggestions from '../index';

describe('SearchBarWithSuggestions', () => {
  const TEST_ID: TestId = DEFAULT_TEST_ID;
  const DROPDOWN_TEST_ID = suffixTestId(TEST_ID, 'dropdown');

  const renderComponent = ({
    ...props
  }: Partial<SearchBarWithSuggestionsProps> = {}) => {
    const user = userEvent.setup();

    return {
      user,
      ...render(
        <SearchBarWithSuggestions
          data-testid={TEST_ID}
          suggestions={[]}
          {...props}
        />,
      ),
    };
  };

  const getSearchBar = () => screen.getByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should display the dropdown after a click on the search bar', async () => {
    const { user } = renderComponent({
      suggestions: [
        { label: 'Hello', icon: 'Tower' },
        { label: 'World', icon: 'CloudData' },
      ],
    });

    await user.click(getSearchBar());

    await expectToBeVisibleInTheDocument(DROPDOWN_TEST_ID);
  });

  it('should display the loading placeholder in the dropdown', async () => {
    const { user } = renderComponent({
      suggestions: [],
      isLoading: true,
      withLoadingPlaceholder: true,
    });

    await user.click(getSearchBar());

    await expectToBeVisibleInTheDocument('dropdown-loading-placeholder');
  });

  it('should display the empty placeholder in the dropdown', async () => {
    const { user } = renderComponent({
      suggestions: [],
      withEmptyPlaceholder: true,
    });

    await user.click(getSearchBar());

    await expectToBeVisibleInTheDocument('dropdown-empty-placeholder');
  });

  it('should display the error placeholder in the dropdown', async () => {
    const { user } = renderComponent({
      isError: true,
      suggestions: [],
      withErrorPlaceholder: true,
    });

    await user.click(getSearchBar());

    await expectToBeVisibleInTheDocument('dropdown-error-placeholder');
  });

  it('should call onChange(value, type) when clicking on the first suggestion', async () => {
    const onSuggestionChange = vi.fn();
    const { user } = renderComponent({
      onSuggestionChange,
      suggestions: [
        { label: 'Hello', icon: 'Tower' },
        { label: 'World', icon: 'CloudData' },
      ],
    });

    await user.click(getSearchBar());
    await user.click(screen.getByText('Hello'));

    expect(onSuggestionChange).toHaveBeenCalledWith('Hello');
  });

  it('should call onChange(value, type) when clicking on the second suggestion', async () => {
    const onSuggestionChange = vi.fn();
    const { user } = renderComponent({
      onSuggestionChange,
      suggestions: [
        { label: 'Hello', icon: 'Tower' },
        { label: 'World', icon: 'CloudData' },
      ],
    });

    await user.click(getSearchBar());
    await user.click(screen.getByText('World'));

    expect(onSuggestionChange).toHaveBeenCalledWith('World');
  });

  it('should call onChange(value, type) when selecting the first suggestion with keyboard', async () => {
    const onSuggestionChange = vi.fn();
    const { user } = renderComponent({
      onSuggestionChange,
      suggestions: [
        { label: 'Hello', icon: 'Tower' },
        { label: 'World', icon: 'CloudData' },
      ],
    });

    await user.click(getSearchBar());
    await user.keyboard('{Enter}');

    expect(onSuggestionChange).toHaveBeenCalledWith('Hello');
  });

  it('should call onChange(value, type) when selecting the second suggestion with keyboard', async () => {
    const onSuggestionChange = vi.fn();
    const { user } = renderComponent({
      onSuggestionChange: onSuggestionChange,
      suggestions: [
        { label: 'Hello', icon: 'Tower' },
        { label: 'World', icon: 'CloudData' },
      ],
    });

    await user.click(getSearchBar());
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(onSuggestionChange).toHaveBeenCalledWith('World');
  });
});
