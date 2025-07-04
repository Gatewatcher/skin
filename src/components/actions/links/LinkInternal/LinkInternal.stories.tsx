import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Card } from '@/skin/displays';
import { addBoolean, addInlineRadio } from '@/storybook';

import type { LinkInternalProps } from '.';
import LinkInternal from '.';
import {
  DEFAULT_IS_ALWAYS_UNDERLINED,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  LINK_SIZES,
  LINK_TARGETS,
  LINK_VARIANTS,
} from '../LinkBase/constants';
import { DEFAULT_TARGET } from './constants';

type Story = StoryObj<typeof LinkInternal>;

export default {
  title: 'actions/links/LinkInternal',
  component: LinkInternal,
  decorators: [withRouter],
  args: {
    children: 'Link',
    preventScrollReset: false,
    relative: '',
    size: DEFAULT_SIZE,
    target: DEFAULT_TARGET,
    to: '/user',
    isAlwaysUnderlined: DEFAULT_IS_ALWAYS_UNDERLINED,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<LinkInternalProps>('variant', LINK_VARIANTS),
    ...addInlineRadio<LinkInternalProps>('target', LINK_TARGETS),
    ...addInlineRadio<LinkInternalProps>('size', LINK_SIZES),
    ...addBoolean<LinkInternalProps>('italic'),
  },
} as Meta<typeof LinkInternal>;

const Template: StoryFn<typeof LinkInternal> = ({
  children,
  ...args
}: LinkInternalProps) => <LinkInternal {...args}>{children}</LinkInternal>;

export const Default: Story = {
  render: Template,
};

export const WithIcons: Story = {
  render: Template,
  args: {
    endIcon: 'Action',
  },
};

export const AboveCard: Story = {
  render: () => (
    <LinkInternal to="/" variant="bared">
      <Card>
        <Card.Header>
          <Card.Title>title</Card.Title>
        </Card.Header>
        <Card.Body>body</Card.Body>
        <Card.Footer>footer</Card.Footer>
      </Card>
    </LinkInternal>
  ),
};

export const SubtleHover: Story = {
  render: Template,
  parameters: {
    pseudo: { hover: true },
  },
};
