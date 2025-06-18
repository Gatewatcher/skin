import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';

import type { CarouselProps } from '.';
import Carousel from '.';

type Story = StoryObj<typeof Carousel>;

const Template: StoryFn<typeof Carousel> = (args: CarouselProps) => (
  <Carousel {...args} />
);

export const Default: Story = {
  render: Template,
  args: {
    children: (
      <Stack alignItems="center" gap={8}>
        <div style={{ minWidth: 350 }}>Content 1</div>
        <div style={{ minWidth: 350 }}>Content 2</div>
        <div style={{ minWidth: 350 }}>Content 3</div>
        <div style={{ minWidth: 350 }}>Content 4</div>
        <div style={{ minWidth: 350 }}>Content 5</div>
        <div style={{ minWidth: 350 }}>Content 6</div>
        <div style={{ minWidth: 350 }}>Content 7</div>
        <div style={{ minWidth: 350 }}>Content 8</div>
        <div style={{ minWidth: 350 }}>Content 9</div>
        <div style={{ minWidth: 350 }}>Content 10</div>
      </Stack>
    ),
  },
};

export default {
  title: 'displays/Carousel',
  component: Carousel,
  args: {},
} as Meta<typeof Carousel>;
