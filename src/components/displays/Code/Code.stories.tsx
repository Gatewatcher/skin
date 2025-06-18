import type { Meta, StoryObj } from '@storybook/react';

import Code from './index';

const meta: Meta<typeof Code> = {
  title: 'displays/Code',
  component: Code,
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: '<code />',
    inline: true,
  },
};

const MULTILINE = `<pre>
  <code>
    ...
  </code>
</pre>`;

export const Multiline: Story = {
  args: {
    children: MULTILINE,
    inline: false,
    language: 'javascript',
  },
};

export const All: Story = {
  render: () => {
    return (
      <>
        <Code inline>&lt;code /&gt;</Code> <Code inline>{MULTILINE}</Code>
        <br />
        <br />
        <Code>&lt;code /&gt;</Code>
        <br />
        <Code>{MULTILINE}</Code>
        <br />
        <Code language="html">{MULTILINE}</Code>
      </>
    );
  },
};
