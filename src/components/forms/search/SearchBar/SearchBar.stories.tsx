import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import { VARIANTS } from './constants';
import type { SearchBarProps } from './index';
import SearchBar from './index';

type Story = StoryObj<typeof SearchBar>;

export default {
  title: 'forms/search/SearchBar',
  component: SearchBar,
  argTypes: {
    ...addInlineRadio('variant', VARIANTS),
  },
  args: {
    disabled: false,
    isClearable: true,
    isError: false,
    isLoading: false,
    placeholder: '',
    preventFocusOnClear: false,
    tooltipContent: 'Type in anything you like, we will find it for you!',
    variant: 'default',
    withShortcut: true,
    onEscape: () => console.log('escape'),
    onArrowDown: () => console.log('arrow down'),
    onArrowUp: () => console.log('arrow up'),
    onBlur: () => console.log('on blur'),
    onFocus: () => console.log('focus'),
    onEnter: () => console.log('enter'),
  },
} as Meta<typeof SearchBar>;

const logChangedAction = action('changed');

const Template: StoryFn<typeof SearchBar> = (args: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);

    logChangedAction({
      name: 'onChange',
      args: value,
    });
  };

  return <SearchBar {...args} onChange={handleChange} value={value} />;
};

export const Default: Story = {
  render: Template,
};

export const All: Story = {
  render: args => {
    return (
      <Stack direction="column" gap={8}>
        <SearchBar {...args} />
        <SearchBar {...args} isLoading />
        <SearchBar {...args} isError />
      </Stack>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: 'value',
  },
};

export const Controlled: Story = {
  decorators: [
    (Story, { args }) => {
      const [value, setValue] = useState('');

      const onChange = (newValue: string) => {
        setValue(newValue);
      };

      const onClear = () => {
        setValue('');
      };

      return <Story args={{ ...args, value, onChange, onClear }} />;
    },
  ],
};
