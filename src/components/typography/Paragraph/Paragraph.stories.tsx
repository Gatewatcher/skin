import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TYPES } from '@/constants';
import { addInlineRadio } from '@/storybook';

import type { ParagraphProps } from '.';
import Paragraph from '.';
import Text from '../Text';
import {
  ALIGNMENT_VARIANTS,
  DEFAULT_VARIANTS,
  SIZE_VARIANTS,
  TRANSFORM_VARIANTS,
  WEIGHT_VARIANTS,
  WHITE_SPACES,
} from '../constants';

faker.seed(10);

type Story = StoryObj<typeof Paragraph>;

export default {
  title: 'typography/Paragraph',
  component: Paragraph,
  argTypes: {
    ...addInlineRadio<ParagraphProps>('size', SIZE_VARIANTS),
    ...addInlineRadio<ParagraphProps>('weight', WEIGHT_VARIANTS),
    ...addInlineRadio<ParagraphProps>('type', TYPES),
    ...addInlineRadio<ParagraphProps>('alignment', ALIGNMENT_VARIANTS),
    ...addInlineRadio<ParagraphProps>('transform', TRANSFORM_VARIANTS),
    ...addInlineRadio<ParagraphProps>('whiteSpace', WHITE_SPACES),
  },
  args: {
    children: faker.lorem.paragraphs(4),
    ...DEFAULT_VARIANTS,
  },
} as Meta<typeof Paragraph>;

const Template: StoryFn<typeof Paragraph> = ({
  children,
  ...args
}: ParagraphProps) => <Paragraph {...args}>{children}</Paragraph>;

export const Default: Story = {
  render: Template,
};

export const WithExtraMarkup: Story = {
  render: ({ ...args }: ParagraphProps) => (
    <Paragraph {...args}>
      Lorem ipsum <Text italic>sit amet</Text> and{' '}
      <Text as="strong" weight="medium" underline>
        bold and underline
      </Text>
      Normal text here but <Text italic>italic here</Text>. Why not an{' '}
      <Text size="extra-small" underline>
        extra small underlined text
      </Text>
    </Paragraph>
  ),
};

export const MaxLines: Story = {
  render: Template,
  args: {
    children: faker.lorem.paragraph({ min: 10, max: 100 }),
    maxLines: 3,
  },
};
