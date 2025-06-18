import type { Meta, StoryObj } from '@storybook/react';

import { Section } from '@/skin/displays';

import TreeComponent from '.';

type Story = StoryObj<typeof TreeComponent>;

export default {
  title: 'displays/tree/Tree',
  component: TreeComponent,
} as Meta<typeof TreeComponent>;

export const Default: Story = {
  render: args => {
    return (
      <TreeComponent {...args}>
        <TreeComponent.Node element="All data elements" id={0} defaultExpanded>
          <TreeComponent.Node
            element="Elasticsearchdata"
            id={1}
            defaultExpanded
          >
            <TreeComponent.Node element="Sigflow" id={3} />
            <TreeComponent.Node element="Malcore" id={4} />
            <TreeComponent.Node element="Codebreaker" id={5} />
          </TreeComponent.Node>
          <TreeComponent.Node element="Processed data" id={6} defaultExpanded>
            <TreeComponent.Node element="Risk and alerts board" id={7} />
            <TreeComponent.Node
              element="Assets and users"
              id={8}
              defaultExpanded
            />
          </TreeComponent.Node>
        </TreeComponent.Node>
      </TreeComponent>
    );
  },

  args: {
    resetOnFold: false,
  },
};

export const WithExpandedElement: Story = {
  render: args => {
    return (
      <TreeComponent {...args}>
        <TreeComponent.Node
          expandedElement={
            <Section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores at autem ducimus eum, fuga ipsa neque pariatur quis
              rerum totam!
            </Section>
          }
          element="All data elements"
          id={0}
          defaultExpanded
        >
          <TreeComponent.Node
            expandedElement={
              <Section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores at autem ducimus eum, fuga ipsa neque pariatur quis
                rerum totam!
              </Section>
            }
            element="Elasticsearchdata"
            id={1}
            defaultExpanded
          >
            <TreeComponent.Node element="Sigflow" id={3} />
            <TreeComponent.Node element="Malcore" id={4} />
            <TreeComponent.Node element="Codebreaker" id={5} />
          </TreeComponent.Node>
          <TreeComponent.Node
            expandedElement={
              <Section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores at autem ducimus eum, fuga ipsa neque pariatur quis
                rerum totam!
              </Section>
            }
            element="Processed data"
            id={6}
            defaultExpanded
          >
            <TreeComponent.Node
              element="Risk and alerts board"
              id={7}
              defaultExpanded
            />
            <TreeComponent.Node
              element="Assets and users"
              id={8}
              defaultExpanded
            />
          </TreeComponent.Node>
        </TreeComponent.Node>
      </TreeComponent>
    );
  },

  args: {
    resetOnFold: false,
  },
};
