import { useToggle } from '@gatewatcher/bistoury/hooks';
import { withoutKey } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { ELEVATIONS } from 'hocs/withElevation/constants';

import { ICON_NAMES, TYPES } from '@/constants';
import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { addElevations, addInlineRadio, addSelect } from '@/storybook';

import type { BadgeProps } from '.';
import Badge from '.';
import { BADGE_SIZES, BADGE_TYPES, DEFAULT_SIZE } from './constants';

type Story = StoryObj<typeof Badge>;

export default {
  title: 'displays/Badge',
  component: Badge,
  args: {
    type: 'info',
    size: DEFAULT_SIZE,
  },
  argTypes: {
    ...addSelect<BadgeProps>('icon', ICON_NAMES),
    ...addSelect<BadgeProps>('type', BADGE_TYPES),
    ...addInlineRadio<BadgeProps>('size', BADGE_SIZES),
    ...addElevations(),
  },
} as Meta<typeof Badge>;

export const Default: Story = {
  args: {
    icon: true,
  },
  parameters: {
    controls: { exclude: ['icon'] },
  },
};

export const Children: Story = {
  args: {
    children: '1',
  },
  parameters: { controls: { exclude: ['icon'] } },
};

export const WithVeryLongText: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius error illum nemo neque quaerat quidem tempore totam?',
  },
  parameters: {
    controls: { exclude: ['icon'] },
  },
  decorators: [
    Story => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const All: Story = {
  render: ({ icon, children, ...args }) => (
    <Stack gap={5}>
      {TYPES.map(type =>
        icon ? (
          <Badge key={type} {...args} icon={icon} type={type} />
        ) : (
          <Badge key={type} {...args} type={type}>
            {children}
          </Badge>
        ),
      )}
    </Stack>
  ),
  args: {
    children: '999',
  },
  parameters: {
    controls: { exclude: ['type'] },
  },
};

export const Elevations: Story = {
  render: ({ children, ...args }) => {
    return (
      <Stack gap={7}>
        {ELEVATIONS.map(elevation => (
          <Badge
            key={elevation}
            elevation={elevation}
            {...withoutKey(args, ['icon'])}
          >
            {children}
          </Badge>
        ))}
      </Stack>
    );
  },
  args: {
    children: '999',
  },
  parameters: {
    controls: { exclude: ['elevation'] },
  },
};

export const WithLoader: Story = {
  args: {
    children: '999',
  },
  decorators: [
    (Story, { args }) => {
      const [isLoading, toggleIsLoading] = useToggle(true);

      return (
        <Stack alignItems="center" gap={10}>
          <Story args={{ ...args, isLoading }} />
          <Button onClick={toggleIsLoading} variant="outlined">
            Toggle
          </Button>
        </Stack>
      );
    },
  ],
  parameters: {
    controls: { exclude: ['type'] },
  },
};
