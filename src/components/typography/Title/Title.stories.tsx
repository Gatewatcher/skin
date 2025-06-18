import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TYPES } from '@/constants';
import { Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { TitleProps } from '.';
import Title from '.';
import type { TextProps } from '../Text';
import { ALIGNMENT_VARIANTS, TRANSFORM_VARIANTS } from '../constants';
import { DEFAULT_TAG, HEADING_TAGS } from './constants';

type Story = StoryObj<typeof Title>;

export default {
  title: 'typography/Title',
  component: Title,
  argTypes: {
    ...addInlineRadio<TitleProps>('as', HEADING_TAGS),
    ...addInlineRadio<TitleProps>('type', TYPES),
    ...addInlineRadio<TitleProps>('alignment', ALIGNMENT_VARIANTS),
    ...addInlineRadio<TitleProps>('transform', TRANSFORM_VARIANTS),
  },
  args: {
    as: DEFAULT_TAG,
    children: 'Title',
  },
} as Meta<typeof Title>;

const Template: StoryFn<typeof Title> = ({ children, ...args }: TitleProps) => (
  <Title {...args}>{children}</Title>
);

export const Default: Story = {
  render: Template,
};

export const All: Story = {
  render: ({ children, ...args }: TitleProps) => (
    <div>
      <Title {...args} as="h1">
        h1. {children}
      </Title>
      <Title {...args} as="h2">
        h2. {children}
      </Title>
      <Title {...args} as="h3">
        h3. {children}
      </Title>
      <Title {...args} as="h4">
        h4. {children}
      </Title>
      <Title {...args} as="h5">
        h5. {children}
      </Title>
    </div>
  ),
  parameters: { controls: { exclude: ['as'] } },
};

type ExtraMarkupProps = TitleProps & Omit<TextProps, 'as'>;

export const ExtraMarkup = {
  render: ({ children, italic, underline, ...rest }: ExtraMarkupProps) => (
    <Title {...rest}>
      <Text italic={italic} underline={underline}>
        {children}
      </Text>
    </Title>
  ),
  args: {
    italic: false,
    underline: false,
  },
};
