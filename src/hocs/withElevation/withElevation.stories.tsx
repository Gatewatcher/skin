import { faker } from '@faker-js/faker';
import type { Meta } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import { withElevation } from '.';
import { ELEVATIONS } from './constants';
import type { Elevation } from './types';

faker.seed(10);

export default {
  title: 'hocs/withElevation',
  component: Stack,
  args: {
    elevation: 1,
  },
  argTypes: {
    ...addInlineRadio('elevation', ELEVATIONS),
  },
  parameters: {
    controls: { include: ['elevation'] },
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '100%',
          height: '400px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Stack>;

export const Default = {
  render: ({ elevation }: { elevation: Elevation }) => {
    return withElevation(
      <Stack
        style={{
          borderRadius: 'var(--border-radius-large)',
        }}
        padding={10}
      >
        Elevation
      </Stack>,
      elevation,
    );
  },
};
