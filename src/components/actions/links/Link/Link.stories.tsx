import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Paragraph } from '@/skin/typography';
import { addBoolean, addInlineRadio } from '@/storybook';

import type { LinkProps } from '.';
import Link from '.';
import {
  DEFAULT_IS_ALWAYS_UNDERLINED,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  LINK_SIZES,
  LINK_TARGETS,
  LINK_VARIANTS,
} from '../LinkBase/constants';

type Story = StoryObj<typeof Link>;

export default {
  title: 'actions/links/Link',
  component: Link,
  decorators: [withRouter],
  args: {
    children: 'Link',
    to: 'http://www.google.com',
    isAlwaysUnderlined: DEFAULT_IS_ALWAYS_UNDERLINED,
    isExternal: true,
    relative: '',
    preventScrollReset: false,
    size: DEFAULT_SIZE,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<LinkProps>('variant', LINK_VARIANTS),
    ...addInlineRadio<LinkProps>('target', LINK_TARGETS),
    ...addInlineRadio<LinkProps>('size', LINK_SIZES),
    ...addBoolean<LinkProps>('italic'),
  },
} as Meta<typeof Link>;

const Template: StoryFn<typeof Link> = ({ children, ...args }: LinkProps) => (
  <Link {...args}>{children}</Link>
);

export const Default: Story = {
  render: Template,
};

export const InsideParagraph = {
  render: (args: LinkProps) => {
    return (
      <Paragraph>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit
        commodi{' '}
        <Link {...args} to="https://www.google.com">
          Ceci est un lien
        </Link>{' '}
        illum minus eaque doloremque necessitatibus dignissimos sint cum,
        voluptatibus fugiat, maxime repellendus quisquam laudantium assumenda
        est ipsam voluptatum amet? Quod.
      </Paragraph>
    );
  },
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
