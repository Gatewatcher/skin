import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { addBoolean, addInlineRadio } from '@/storybook';

import type { LinkExternalProps } from '.';
import LinkExternal from '.';
import {
  DEFAULT_IS_ALWAYS_UNDERLINED,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  LINK_SIZES,
  LINK_TARGETS,
  LINK_VARIANTS,
} from '../LinkBase/constants';
import { DEFAULT_TARGET } from './constants';

type Story = StoryObj<typeof LinkExternal>;

export default {
  title: 'actions/links/LinkExternal',
  component: LinkExternal,
  args: {
    children: 'Link',
    isAlwaysUnderlined: DEFAULT_IS_ALWAYS_UNDERLINED,
    size: DEFAULT_SIZE,
    to: 'https://www.google.com',
    target: DEFAULT_TARGET,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<LinkExternalProps>('variant', LINK_VARIANTS),
    ...addInlineRadio<LinkExternalProps>('target', LINK_TARGETS),
    ...addInlineRadio<LinkExternalProps>('size', LINK_SIZES),
    ...addBoolean<LinkExternalProps>('italic'),
  },
} as Meta<typeof LinkExternal>;

const Template: StoryFn<typeof LinkExternal> = ({
  children,
  ...args
}: LinkExternalProps) => <LinkExternal {...args}>{children}</LinkExternal>;

export const Default: Story = {
  render: Template,
};

export const Reverse: Story = {
  render: Template,
  args: {
    startIcon: 'ExternalLink',
    withIcon: { end: false },
  },
};

export const SubtleHover: Story = {
  render: Template,
  parameters: {
    pseudo: { hover: true },
  },
};
