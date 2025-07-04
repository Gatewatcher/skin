import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { ICON_SIZES } from '@/constants';
import { DEFAULT_ICON_SIZE } from '@/skin/displays/InfoTooltip/constants';
import { addInlineRadio } from '@/storybook';

import type { LinkIconProps } from '.';
import LinkIcon from '.';
import { DEFAULT_VARIANT, LINK_VARIANTS_BASE } from '../LinkBase/constants';

type Story = StoryObj<typeof LinkIcon>;

export default {
  title: 'actions/links/LinkIcon',
  component: LinkIcon,
  argTypes: {
    ...addInlineRadio<LinkIconProps>('variant', LINK_VARIANTS_BASE),
    ...addInlineRadio<LinkIconProps>('size', ICON_SIZES),
  },
  args: {
    icon: 'Action',
    size: DEFAULT_ICON_SIZE,
    to: 'https://www.google.com',
    variant: DEFAULT_VARIANT,
  },
  decorators: [withRouter],
} as Meta<typeof LinkIcon>;

const Template: StoryFn<typeof LinkIcon> = (args: LinkIconProps) => (
  <LinkIcon {...args} />
);

export const Default: Story = {
  render: Template,
};
