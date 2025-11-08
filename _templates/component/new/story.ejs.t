---
to: <%= componentPath %><%= componentName %>/<%= componentName %>.stories.tsx
---
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import <%= componentName %>, { <%= componentName %>Props } from '.';

type Story = StoryObj<typeof <%= componentName %>>;

export default {
  title: '<%= storyPrefix %><%= componentName %>',
  component: <%= componentName %>,
} as Meta<typeof <%= componentName %>>;

const Template: StoryFn<typeof <%= componentName %>> = (args: <%= componentName %>Props) => (
  <<%= componentName %> {...args} />
);

export const Default: Story = {
  render: Template,
};
