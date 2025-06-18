import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { OverflownParagraphProps } from '.';
import OverflownParagraph from '.';

type Story = StoryObj<typeof OverflownParagraph>;

faker.seed(10);

export default {
  title: 'typography/OverflownParagraph',
  component: OverflownParagraph,
} as Meta<typeof OverflownParagraph>;

const Template: StoryFn<typeof OverflownParagraph> = (
  args: OverflownParagraphProps,
) => <OverflownParagraph {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    children: faker.lorem.paragraphs(10),
    height: 200,
  },
};
