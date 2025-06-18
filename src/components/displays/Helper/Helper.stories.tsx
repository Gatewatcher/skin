import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { Paragraph } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { HelperProps } from '.';
import Helper from '.';
import {
  DEFAULT_VARIANT,
  DEFAULT_WITH_CLOSE,
  DEFAULT_WITH_ICON,
  HELPER_VARIANTS,
} from './constants';

type Story = StoryObj<typeof Helper>;

export default {
  title: 'displays/Helper',
  component: Helper,
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, hic voluptatibus, aliquam totam distinctio doloribus veniam iusto eos, nemo quas temporibus sapiente? Nemo eum ipsum fugit exercitationem a reprehenderit assumenda?',
    withClose: DEFAULT_WITH_CLOSE,
    withIcon: DEFAULT_WITH_ICON,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<HelperProps>('variant', HELPER_VARIANTS),
  },
} as Meta<typeof Helper>;

export const All: Story = {
  render: ({ children, ...args }) => (
    <Stack direction="column" gap={5}>
      {HELPER_VARIANTS.map(variant => (
        <Helper key={variant} {...args} variant={variant}>
          {children}
        </Helper>
      ))}
    </Stack>
  ),

  parameters: {
    controls: { exclude: ['variant'] },
  },
};

export const WithTitle: Story = {
  render: ({ children, ...args }) => (
    <Helper {...args}>
      <Helper.Title>Title</Helper.Title>
      <Paragraph currentColor>{children}</Paragraph>
    </Helper>
  ),
};
