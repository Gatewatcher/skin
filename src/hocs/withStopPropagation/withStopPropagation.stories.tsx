import { faker } from '@faker-js/faker';
import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/skin/actions';

import { withStopPropagation } from '.';

faker.seed(10);

export default {
  title: 'hocs/withStopPropagation',
  component: Button,
  parameters: {
    controls: { disabled: true },
  },
} as Meta<typeof Button>;

export const Default: StoryFn<typeof Button> = () => {
  return (
    <div
      style={{
        width: 200,
        height: 200,
        display: 'grid',
        placeItems: 'center',
        border: 'solid 1px var(--text-color)',
      }}
      onClick={() => console.log('container clicked')}
    >
      {withStopPropagation(
        <Button onClick={() => console.log('button clicked')}>Click me</Button>,
      )}
    </div>
  );
};
