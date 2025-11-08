import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { BannerProps } from '.';
import Banner from '.';
import {
  BANNER_VARIANTS,
  DEFAULT_VARIANT,
  DEFAULT_WITH_CLOSE,
  DEFAULT_WITH_ICON,
} from './constants';

type Story = StoryObj<typeof Banner>;

export default {
  title: 'displays/Banner',
  component: Banner,
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, hic voluptatibus, aliquam totam distinctio doloribus veniam iusto eos, nemo quas temporibus sapiente? Nemo eum ipsum fugit exercitationem a reprehenderit assumenda?',
    withClose: DEFAULT_WITH_CLOSE,
    withIcon: DEFAULT_WITH_ICON,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<BannerProps>('variant', BANNER_VARIANTS),
  },
} as Meta<typeof Banner>;

export const All: Story = {
  render: ({ children, ...args }) => (
    <Stack direction="column" gap={5}>
      {BANNER_VARIANTS.map(variant => (
        <Banner key={variant} {...args} variant={variant}>
          {children}
        </Banner>
      ))}
    </Stack>
  ),

  parameters: {
    controls: { exclude: ['variant'] },
  },
};
