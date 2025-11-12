import type { Meta, StoryObj } from '@storybook/react';

import CodeBlock from '.';

type Story = StoryObj<typeof CodeBlock>;

export default {
  title: 'displays/CodeBlock',
  component: CodeBlock,
} as Meta<typeof CodeBlock>;

const typescript = `let message: string = "Hello, World!";
console.log(message);`;

const yaml = `name: John Doe
age: 30
isAdmin: false`;

export const Default: Story = {
  args: {
    code: typescript,
    language: 'Typescript',
  },
};

export const Yaml: Story = {
  args: {
    code: yaml,
    language: 'YAML',
  },
};

export const Typescript: Story = {
  args: {
    code: typescript,
    language: 'Typescript',
  },
};
