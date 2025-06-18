import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { SectionProps } from '.';
import Section from '.';
import { DEFAULT_VARIANT, SECTION_VARIANTS } from './constants';

type Story = StoryObj<typeof Section>;

export default {
  title: 'displays/Section',
  component: Section,
  args: {
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<SectionProps>('variant', SECTION_VARIANTS),
  },
} as Meta<typeof Section>;

const Template: StoryFn<typeof Section> = ({
  children,
  ...args
}: SectionProps) => <Section {...args}>{children}</Section>;

export const Default: Story = {
  render: Template,

  args: {
    children: (
      <>
        <Section.Header>
          <Section.Title>Section title</Section.Title>
        </Section.Header>
        <Section.Body>
          <Text>Some content</Text>
        </Section.Body>
      </>
    ),
  },
};

export const WithAction: Story = {
  render: Template,

  args: {
    children: (
      <>
        <Section.Header>
          <Section.Title>Section title</Section.Title>
          <Text>action slot</Text>
        </Section.Header>
        <Section.Body>
          <Text>Some content</Text>
        </Section.Body>
      </>
    ),
  },
};

export const WithActionButton: Story = {
  render: Template,

  args: {
    children: (
      <>
        <Section.Header>
          <Section.Title>Section title</Section.Title>
          <Section.Button onClick={() => {}} startIcon="Edit">
            Edit
          </Section.Button>
        </Section.Header>
        <Section.Body>
          <Text>Some content</Text>
        </Section.Body>
      </>
    ),
  },
};
