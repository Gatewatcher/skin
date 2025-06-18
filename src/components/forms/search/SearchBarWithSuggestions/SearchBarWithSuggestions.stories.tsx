import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { SearchBarWithSuggestionsProps } from './index';
import SearchBarWithSuggestions from './index';

type Story = StoryObj<typeof SearchBarWithSuggestions>;

export default {
  title: 'forms/search/SearchBarWithSuggestions',
  component: SearchBarWithSuggestions,
} as Meta<typeof SearchBarWithSuggestions>;

const Template: StoryFn<typeof SearchBarWithSuggestions> = ({
  suggestions = [],
  ...args
}: SearchBarWithSuggestionsProps) => {
  const [value, setValue] = useState('');
  const sortedSuggestions = [...(suggestions ?? [])].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const actualSuggestions = sortedSuggestions.filter(suggestion =>
    suggestion.label.startsWith(value),
  );
  const onlySuggestionMatchValue =
    actualSuggestions.length === 1 && actualSuggestions[0].label === value;

  return (
    <SearchBarWithSuggestions
      {...args}
      onChange={setValue}
      onSuggestionChange={setValue}
      suggestions={onlySuggestionMatchValue ? [] : actualSuggestions}
      value={value}
      withEmptyPlaceholder={!onlySuggestionMatchValue}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    closeOnSelect: true,
    disabled: false,
    isClearable: true,
    isError: false,
    isLoading: false,
    placeholder: 'Press “/” to search...',
    preventFocusOnClear: false,
    suggestions: [
      { label: 'apes', icon: 'Elements' },
      { label: 'apples', icon: 'Elements' },
      { label: 'peers', icon: 'Elements' },
      { label: 'pears', icon: 'Desktop' },
      { label: 'bananas', icon: 'CloudData' },
      { label: 'pineapples', icon: 'Tower' },
      { label: 'pine', icon: 'FileCheck' },
      { label: 'pine cones', icon: 'Elements' },
    ],
    tooltipContent: 'Type in anything you like, we will find it for you!',
    withEmptyPlaceholder: true,
    withErrorPlaceholder: true,
    withLoadingPlaceholder: true,
    withShortcut: true,
  },
};
