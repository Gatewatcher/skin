import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ShimmerText } from '@/skin/typography';

import type { ShimmerEffectProps } from '.';
import ShimmerEffect from '.';

type Story = StoryObj<typeof ShimmerEffect>;

export default {
  title: 'displays/ShimmerEffect',
  component: ShimmerEffect,
} as Meta<typeof ShimmerEffect>;

const Template: StoryFn<typeof ShimmerEffect> = (args: ShimmerEffectProps) => (
  <ShimmerEffect {...args} />
);

export const Default: Story = {
  render: Template,
  args: {
    children: <div>Searching in 3 websites</div>,
  },
};

export const ShimmerColorChange: Story = {
  render: args => {
    const [shimmerColor, setShimmerColor] = useState('red');

    useEffect(() => {
      setTimeout(() => {
        setShimmerColor('green');
      }, 6_000);
    }, []);
    return (
      <Template key={shimmerColor} {...args} shimmerColor={shimmerColor} />
    );
  },
  args: {
    children: <div>Searching in 3 websites</div>,
  },
};

export const WithShimmerText: Story = {
  render: args => {
    return (
      <Template {...args}>
        <ShimmerText>This is Shimmer Text</ShimmerText>
      </Template>
    );
  },
};
