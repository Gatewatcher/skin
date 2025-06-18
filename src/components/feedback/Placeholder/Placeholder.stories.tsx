import type { Meta, StoryObj } from '@storybook/react';

import { ILLUSTRATION_SIZES } from '@/constants';
import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { PlaceholderProps } from '.';
import Placeholder from '.';
import { DEFAULT_ALIGNMENT, PLACEHOLDER_ALIGMENTS } from './constants';

type Story = StoryObj<typeof Placeholder>;

export default {
  title: 'feedback/Placeholder',
  component: Placeholder,
  args: {
    aligment: DEFAULT_ALIGNMENT,
    children: (
      <>
        <Placeholder.Illustration name="FolderEmpty" />
        <Placeholder.Title>No data</Placeholder.Title>
        <Placeholder.Description>
          Empty state description
        </Placeholder.Description>
        <Placeholder.Actions>
          <Button variant="ghosted">Action 1</Button>
          <Button>Action 2</Button>
        </Placeholder.Actions>
      </>
    ),
  },
  argTypes: {
    ...addInlineRadio<PlaceholderProps>('aligment', PLACEHOLDER_ALIGMENTS),
  },
} as Meta<typeof Placeholder>;

export const Default: Story = {};

export const Light: Story = {
  args: {
    children: (
      <>
        <Placeholder.Title>No data</Placeholder.Title>
        <Placeholder.Description>
          Empty state description
        </Placeholder.Description>
        <Placeholder.Actions>
          <Button>Action </Button>
        </Placeholder.Actions>
      </>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack gap={13}>
      {ILLUSTRATION_SIZES.map(size => (
        <Placeholder key={size}>
          <Placeholder.Illustration name="FolderEmpty" size={size} />
          <Placeholder.Title>No data</Placeholder.Title>
          <Placeholder.Description>
            Empty state description
          </Placeholder.Description>
          <Placeholder.Actions>
            <Button variant="ghosted">Action 1</Button>
            <Button>Action 2</Button>
          </Placeholder.Actions>
        </Placeholder>
      ))}
    </Stack>
  ),
};
