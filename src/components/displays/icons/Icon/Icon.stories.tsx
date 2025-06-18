import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ICON_NAMES } from '@/constants';
import { Grid, Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import Icon from '.';
import { DEFAULT_CURRENT_COLOR } from '../constants';
import { getDefaultArgs, getDefaultArgsTypes } from '../utils';

type Story = StoryObj<typeof Icon>;

export default {
  title: 'displays/icons/Icon',
  component: Icon,
  args: {
    ...getDefaultArgs(),
    currentColor: DEFAULT_CURRENT_COLOR,
  },
  argTypes: getDefaultArgsTypes(),
} as Meta<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'Add',
  },
};

export const All: Story = {
  render: args => {
    const [search, setSearch] = useState('');
    const [icons, setIcons] = useState([...ICON_NAMES]);

    useEffect(() => {
      setIcons(
        !search.length
          ? [...ICON_NAMES]
          : [...ICON_NAMES].filter(name =>
              name.toLowerCase().includes(search.toLowerCase()),
            ),
      );
    }, [search]);

    return (
      <Stack alignItems="stretch" direction="column">
        <input
          onChange={ev => setSearch(ev.target.value)}
          placeholder="Search icons"
          style={{ alignSelf: 'center' }}
          type="text"
          value={search}
        />

        <Grid
          columnsMinSize="120px"
          gap={8}
          margin={{ top: 12 }}
          repeatAuto="fill"
          isContainer
        >
          {icons.map(icon => (
            <Stack key={icon} alignItems="center" direction="column" gap={5}>
              <Icon {...args} name={icon} />
              <Text size="small">{icon}</Text>
            </Stack>
          ))}
        </Grid>
      </Stack>
    );
  },

  parameters: { controls: { exclude: ['name'] } },
};
