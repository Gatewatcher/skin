import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { THEME_COLORS, TYPES } from '@/constants';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { TextProps } from '.';
import Text from '.';
import {
  ALIGNMENT_VARIANTS,
  DEFAULT_VARIANTS,
  SIZE_VARIANTS,
  TRANSFORM_VARIANTS,
  WEIGHT_VARIANTS,
  WHITE_SPACES,
} from '../constants';
import {
  DEFAULT_TAG,
  DEFAULT_TEXT_DISPLAY,
  TEXT_DISPLAYS,
  TEXT_TAGS,
} from './constants';

type Story = StoryObj<typeof Text>;

faker.seed(10);

export default {
  title: 'typography/Text',
  component: Text,
  argTypes: {
    ...addInlineRadio<TextProps>('as', TEXT_TAGS),
    ...addInlineRadio<TextProps>('size', SIZE_VARIANTS),
    ...addInlineRadio<TextProps>('weight', WEIGHT_VARIANTS),
    ...addInlineRadio<TextProps>('type', TYPES),
    ...addInlineRadio<TextProps>('color', THEME_COLORS),
    ...addInlineRadio<TextProps>('alignment', ALIGNMENT_VARIANTS),
    ...addInlineRadio<TextProps>('transform', TRANSFORM_VARIANTS),
    ...addInlineRadio<TextProps>('display', TEXT_DISPLAYS),
    ...addInlineRadio<TextProps>('whiteSpace', WHITE_SPACES),
  },
  args: {
    as: DEFAULT_TAG,
    capitalize: false,
    children: 'Some text',
    italic: false,
    noWrap: false,
    underline: false,
    title: '',
    display: DEFAULT_TEXT_DISPLAY,
    ...DEFAULT_VARIANTS,
  },
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = ({ children, ...args }: TextProps) => (
  <Text {...args}>{children}</Text>
);

export const Default: Story = {
  render: Template,
};

export const LongText: Story = {
  render: Template,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ea fugiat provident quibusdam
  recusandae sed vero? Consequuntur corporis, cumque facilis fugiat ipsa iusto magni minima molestias omnis quibusdam
  repellat repellendus rerum, tempora veritatis voluptate? Ad, aperiam provident? Ad, alias cupiditate eveniet
  expedita ullam veniam! Accusamus dolor id iure nihil provident.`,
  },
};

export const LongWord: Story = {
  render: Template,
  args: {
    children: faker.lorem.sentence(100).replace(/\s/g, ''),
  },
};

export const Variants: Story = {
  render: ({ ...args }: TextProps) => (
    <div>
      <div>
        <Text {...args} size="small">
          Small
        </Text>
      </div>

      <div>
        <Text {...args} size="extra-small">
          extra-small
        </Text>
      </div>

      <div>
        <Text {...args} as="strong">
          Strong tag
        </Text>
      </div>

      <div>
        <Text {...args} weight="medium">
          Medium weight
        </Text>
      </div>

      <div>
        <Text {...args} underline>
          Underline
        </Text>
      </div>

      <div>
        <Text {...args} italic>
          italic
        </Text>
      </div>

      <div>
        <Text {...args} size="small" italic underline>
          Small italic underline
        </Text>
      </div>
    </div>
  ),
  parameters: { controls: { include: ['type'] } },
};

export const ThemeColor: Story = {
  render: Template,
  parameters: { controls: { exclude: ['color', 'type'] } },
  decorators: [
    (Story, { args }) => (
      <Stack direction="column">
        {THEME_COLORS.map(color => (
          <Story key={color} args={{ ...args, color }} />
        ))}
      </Stack>
    ),
  ],
};
