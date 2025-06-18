import type { Meta, StoryObj } from '@storybook/react';

import { Icon, TextIcon } from '@/skin/displays';
import { addInlineRadio } from '@/storybook';

import type { KeyValueDisplayProps } from '.';
import KeyValueDisplay from '.';
import {
  DEFAULT_VARIANT,
  DEFAULT_WITH_EMPTY_ELEMENTS,
  KEY_VALUE_DISPLAY_VARIANTS,
} from './constants';

type Story = StoryObj<typeof KeyValueDisplay>;

export default {
  title: 'displays/KeyValueDisplay',
  component: KeyValueDisplay,
  argTypes: {
    ...addInlineRadio<KeyValueDisplayProps>(
      'variant',
      KEY_VALUE_DISPLAY_VARIANTS,
    ),
  },
  args: {
    variant: DEFAULT_VARIANT,
    withEmptyElements: DEFAULT_WITH_EMPTY_ELEMENTS,
  },
} as Meta<typeof KeyValueDisplay>;

const object1 = { 'I am a key': 3, second: 'value', KeyName: 0 };
const object2 = { 'I have a ReactNode value': <Icon name="CircleInfo" /> };
const map = new Map([['Key as string', 2]]);
const array1 = [{ label: 'Test', value: 1 }];
const array2 = [
  {
    label: <TextIcon endIcon="Note">I am a ReactNode</TextIcon>,
    value: <Icon name="CircleInfo" />,
  },
];

export const Default: Story = {
  args: {
    title: 'Default',
    data: object1,
  },
};

export const WithMap: Story = {
  args: {
    title: 'With Map',
    data: map,
  },
};

export const WithArray: Story = {
  args: {
    title: 'With Array',
    data: array1,
  },
};

export const WithoutTitle: Story = {
  args: {
    data: object1,
  },
};

export const WithReactNodeValue: Story = {
  args: {
    data: object2,
  },
};

export const WithReactNodePair: Story = {
  args: {
    data: array2,
  },
};

export const List: Story = {
  args: {
    data: [
      { label: 'Firstname', value: 'John' },
      { label: 'Lastname', value: 'Doe' },
    ],
    title: 'Main title',
    variant: 'list',
  },
};

export const Inline: Story = {
  args: {
    data: [
      { label: 'Firstname', value: 'John' },
      { label: 'Lastname', value: 'Doe' },
      { label: 'User', value: 'John Doe' },
    ],
    title: 'Main title',
    variant: 'inline',
  },
};

export const WithoutEmptyElements: Story = {
  args: {
    data: [
      { label: 'Firstname', value: 'John' },
      { label: 'Lastname', value: undefined },
      { label: 'Number', value: 0 },
      { label: 'Number undefined', value: undefined },
    ],
    withEmptyElements: false,
  },
};

export const CustomEmptyElement: Story = {
  args: {
    data: [
      { label: 'Firstname', value: 'John' },
      { label: 'Lastname', value: undefined },
      { label: 'Number', value: 0 },
      { label: 'Number undefined', value: undefined },
    ],
    emptyElement: '-',
  },
};

export const CustomColumnsSize: Story = {
  args: {
    data: [
      { label: 'Firstname', value: 'John' },
      { label: 'Lastname', value: 'Doe' },
      { label: 'User', value: 'John Doe' },
    ],
    columns: { key: 2, value: 10 },
  },
};
