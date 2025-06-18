import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '@/skin/displays';

import SelectableTree from '.';

faker.seed(42);

type Story = StoryObj<typeof SelectableTree>;

export default {
  title: 'displays/tree/SelectableTree',
  component: SelectableTree,
  args: {
    resetOnFold: false,
  },
} as Meta<typeof SelectableTree>;

export const Default: Story = {
  render: args => {
    return (
      <SelectableTree {...args} onChange={console.log}>
        <SelectableTree.Node id={0} label="All data elements" defaultExpanded>
          <SelectableTree.Node id={1} label="Elasticsearchdata" defaultExpanded>
            <SelectableTree.Node id={2} label="Sigflow" />
            <SelectableTree.Node id={3} label="Malcore" />
            <SelectableTree.Node id={4} label="Codebreaker" />
          </SelectableTree.Node>
          <SelectableTree.Node id={5} label="Processed data" defaultExpanded>
            <SelectableTree.Node id={6} label="Risk and alerts board" />
            <SelectableTree.Node id={7} label="Assets and users" />
          </SelectableTree.Node>
        </SelectableTree.Node>
      </SelectableTree>
    );
  },
};

export const AllSelected: Story = {
  render: args => {
    return (
      <SelectableTree {...args} onChange={console.log}>
        <SelectableTree.Node
          id={0}
          label="All data elements"
          defaultChecked
          defaultExpanded
        >
          <SelectableTree.Node id={1} label="Elasticsearchdata" defaultExpanded>
            <SelectableTree.Node id={2} label="Sigflow" />
            <SelectableTree.Node id={3} label="Malcore" />
            <SelectableTree.Node id={4} label="Codebreaker" />
          </SelectableTree.Node>
          <SelectableTree.Node id={5} label="Processed data" defaultExpanded>
            <SelectableTree.Node id={6} label="Risk and alerts board" />
            <SelectableTree.Node id={7} label="Assets and users" />
          </SelectableTree.Node>
        </SelectableTree.Node>
      </SelectableTree>
    );
  },
};

export const PartiallySelected: Story = {
  render: args => {
    return (
      <SelectableTree {...args} onChange={console.log} value={[1]}>
        <SelectableTree.Node id={0} label="All data elements" defaultExpanded>
          <SelectableTree.Node id={1} label="Elasticsearchdata" defaultExpanded>
            <SelectableTree.Node id={2} label="Sigflow" />
            <SelectableTree.Node id={3} label="Malcore" />
            <SelectableTree.Node id={4} label="Codebreaker" />
          </SelectableTree.Node>
          <SelectableTree.Node id={5} label="Processed data" defaultExpanded>
            <SelectableTree.Node id={6} label="Risk and alerts board" />
            <SelectableTree.Node id={7} label="Assets and users" />
          </SelectableTree.Node>
        </SelectableTree.Node>
      </SelectableTree>
    );
  },
};

export const WithRidiculouslyLongLabels: Story = {
  render: args => {
    const label = faker.lorem.paragraphs(5);

    return (
      <SelectableTree {...args} onChange={console.log} value={[1]}>
        <SelectableTree.Node id={0} label={label} defaultExpanded>
          <SelectableTree.Node id={1} label={label} defaultExpanded>
            <SelectableTree.Node id={2} label={label} />
            <SelectableTree.Node id={3} label={label} />
            <SelectableTree.Node id={4} label={label} />
          </SelectableTree.Node>
          <SelectableTree.Node id={5} label={label} defaultExpanded>
            <SelectableTree.Node id={6} label={label} />
            <SelectableTree.Node id={7} label={label} />
          </SelectableTree.Node>
        </SelectableTree.Node>
      </SelectableTree>
    );
  },
};

export const WithChips: Story = {
  render: args => {
    return (
      <SelectableTree {...args} onChange={console.log} value={[1]}>
        <SelectableTree.Node id={0} label="All data elements" defaultExpanded>
          <SelectableTree.Node
            afterLabel={<Chip type="error">Suspicious</Chip>}
            id={1}
            label="Elasticsearchdata"
            defaultExpanded
          >
            <SelectableTree.Node
              afterLabel={<Chip type="info">Safe</Chip>}
              id={2}
              label="Sigflow"
            />
            <SelectableTree.Node id={3} label="Malcore" />
            <SelectableTree.Node id={4} label="Codebreaker" />
          </SelectableTree.Node>
          <SelectableTree.Node id={5} label="Processed data" defaultExpanded>
            <SelectableTree.Node id={6} label="Risk and alerts board" />
            <SelectableTree.Node id={7} label="Assets and users" />
          </SelectableTree.Node>
        </SelectableTree.Node>
      </SelectableTree>
    );
  },
};

export const WithDisabledElements: Story = {
  render: args => {
    return (
      <SelectableTree {...args} onChange={console.log}>
        <SelectableTree.Node
          id={0}
          label="All data elements"
          defaultExpanded
          disabled
        >
          <SelectableTree.Node
            id={1}
            label="Elasticsearchdata"
            defaultExpanded
            disabled
          >
            <SelectableTree.Node id={2} label="Sigflow" />
            <SelectableTree.Node id={3} label="Malcore" />
            <SelectableTree.Node id={4} label="Codebreaker" />
          </SelectableTree.Node>
          <SelectableTree.Node
            id={5}
            label="Processed data"
            defaultExpanded
            disabled
          >
            <SelectableTree.Node id={6} label="Risk and alerts board" />
            <SelectableTree.Node id={7} label="Assets and users" />
          </SelectableTree.Node>
        </SelectableTree.Node>
      </SelectableTree>
    );
  },
};
