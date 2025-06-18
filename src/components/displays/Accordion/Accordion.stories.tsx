import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';

import Accordion from '.';
import { DEFAULT_DEFAULT_EXPANDED } from './constants';

faker.seed(10);

type Story = StoryObj<typeof Accordion>;

export default {
  title: 'displays/Accordion',
  component: Accordion,
  args: {
    defaultExpanded: DEFAULT_DEFAULT_EXPANDED,
  },
} as Meta<typeof Accordion>;

export const Default: Story = {
  args: {
    children: faker.lorem.paragraph(),
    title: 'Title',
  },
};

export const Group: Story = {
  render: () => (
    <Accordion.Group>
      <Accordion title="titre 1">{faker.lorem.paragraph()}</Accordion>
      <Accordion title="titre 2">{faker.lorem.paragraph()}</Accordion>
      <Accordion title="titre 3">{faker.lorem.paragraph()}</Accordion>
      <Accordion title="titre 4">{faker.lorem.paragraph()}</Accordion>
    </Accordion.Group>
  ),

  parameters: {
    controls: { exclude: ['defaultExpended'] },
  },
};

export const SelectableList: Story = {
  render: () => (
    <Accordion.Group>
      <Accordion title="titre 1">
        <Stack direction="column">
          <Accordion.SelectableItem
            onClick={() => console.log('Hello, world!')}
          >
            {faker.lorem.word()}
          </Accordion.SelectableItem>
          <Accordion.SelectableItem
            onClick={() => console.log('Hello, world!')}
          >
            {faker.lorem.word()}
          </Accordion.SelectableItem>
          <Accordion.SelectableItem
            onClick={() => console.log('Hello, world!')}
          >
            {faker.lorem.word()}
          </Accordion.SelectableItem>
        </Stack>
      </Accordion>
      <Accordion title="titre 2">
        <Accordion.SelectableItem onClick={() => console.log('Hello, world!')}>
          {faker.lorem.word()}
        </Accordion.SelectableItem>
        <Accordion.SelectableItem onClick={() => console.log('Hello, world!')}>
          {faker.lorem.word()}
        </Accordion.SelectableItem>
        <Accordion.SelectableItem onClick={() => console.log('Hello, world!')}>
          {faker.lorem.word()}
        </Accordion.SelectableItem>
      </Accordion>
    </Accordion.Group>
  ),

  parameters: {
    controls: { exclude: ['defaultExpended'] },
  },
};
