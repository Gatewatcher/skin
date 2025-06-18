import type { Meta, StoryObj } from '@storybook/react';

import { ICON_NAMES } from '@/constants';
import { Grid, Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import IconContained from '.';
import { getDefaultArgs, getDefaultArgsTypes } from '../utils';

type Story = StoryObj<typeof IconContained>;

export default {
  title: 'displays/icons/IconContained',
  component: IconContained,
  args: {
    ...getDefaultArgs(),
    color: 'blue',
  },
  argTypes: getDefaultArgsTypes(),
} as Meta<typeof IconContained>;

export const Default: Story = {
  args: {
    name: 'Tower',
  },
};

export const All: Story = {
  render: args => (
    <Grid columnsMinSize="120px" gap={8} isContainer>
      {ICON_NAMES.map(icon => (
        <Stack key={icon} alignItems="center" direction="column" gap={5}>
          <IconContained {...args} name={icon} />
          <Text size="small">{icon}</Text>
        </Stack>
      ))}
    </Grid>
  ),

  parameters: { controls: { exclude: ['name'] } },
};
