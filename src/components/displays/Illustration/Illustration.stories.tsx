import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import {
  ILLUSTRATION_DEFAULT_SIZE,
  ILLUSTRATION_NAMES,
  ILLUSTRATION_SIZES,
} from '@/constants';
import { Grid, Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import Illustration, { type IllustrationProps } from '.';

type Story = StoryObj<typeof Illustration>;

export default {
  title: 'displays/Illustration',
  component: Illustration,
  argTypes: {
    ...addInlineRadio<IllustrationProps>('size', ILLUSTRATION_SIZES),
  },
  args: {
    name: '404Error',
    size: ILLUSTRATION_DEFAULT_SIZE,
  },
} as Meta<typeof Illustration>;

export const All: Story = {
  render: args => {
    const [search, setSearch] = useState('');
    const [illustrations, setIllustrations] = useState([...ILLUSTRATION_NAMES]);

    useEffect(() => {
      setIllustrations(
        !search.length
          ? [...ILLUSTRATION_NAMES]
          : [...ILLUSTRATION_NAMES].filter(name =>
              name.toLowerCase().includes(search.toLowerCase()),
            ),
      );
    }, [search]);

    return (
      <Stack alignItems="stretch" direction="column">
        <input
          onChange={ev => setSearch(ev.target.value)}
          placeholder="Search illustrations"
          style={{ alignSelf: 'center' }}
          type="text"
          value={search}
        />

        <Grid
          columns={3}
          gap={8}
          margin={{ top: 12 }}
          repeatAuto="fill"
          isContainer
        >
          {illustrations.map(illustration => (
            <Stack
              key={illustration}
              alignItems="center"
              direction="column"
              gap={5}
            >
              <Illustration {...args} name={illustration} />
              <Text size="small">{illustration}</Text>
            </Stack>
          ))}
        </Grid>
      </Stack>
    );
  },

  parameters: { controls: { exclude: ['name'] } },
};
