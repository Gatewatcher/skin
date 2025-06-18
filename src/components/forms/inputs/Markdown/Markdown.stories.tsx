import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { withControlledValue } from '@/hocs';
import { Markdown as MDViewer } from '@/skin/displays';
import { Grid } from '@/skin/layout';

import type { MarkdownProps } from '.';
import Markdown from '.';

type Story = StoryObj<typeof Markdown>;

export default {
  title: 'forms/inputs/Markdown',
  component: Markdown,
  args: {
    label: 'Markdown',
    defaultValue: `# Mardown editor`,
  },
} as Meta<typeof Markdown>;

const ControlledMarkdown = withControlledValue(Markdown, {
  valuePropName: 'value',
});

const Template: StoryFn<typeof Markdown> = (args: MarkdownProps) => (
  <ControlledMarkdown {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithViewer: Story = {
  render: Template,
  decorators: [
    (Story, { args }) => {
      const [value, setValue] = useState<string>(args.defaultValue || '');

      return (
        <Grid columns={2} gap={9} isContainer>
          <Grid isItem>
            <Story
              args={{
                ...args,
                value,
                onValueChange: setValue,
              }}
            />
          </Grid>
          <Grid isItem>
            <MDViewer>{value}</MDViewer>
          </Grid>
        </Grid>
      );
    },
  ],
};
