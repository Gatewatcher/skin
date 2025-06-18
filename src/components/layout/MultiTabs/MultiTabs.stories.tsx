import { generateUniqId } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { Button, ButtonIcon } from '@/skin/actions';
import { Dropdown } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { OverflownText, Paragraph, Text, Title } from '@/skin/typography';

import MultiTabs from '.';
import { useMultiTabs } from './hooks';
import type { Tab } from './types';

const meta = {
  title: 'Layout/MultiTabs',
  component: MultiTabs,
  render: args => {
    const multiTabs = useMultiTabs(args.tabs);

    const handleCreateTab = () =>
      multiTabs.add(tabs => generateNewTab(`Playbook ${tabs.length}`));

    return (
      <MultiTabs
        {...args}
        {...multiTabs.props}
        quickActions={
          <MultiTabs.QuickActions>
            <MultiTabs.AddTabButton onClick={handleCreateTab} />
          </MultiTabs.QuickActions>
        }
      >
        {({ id, title = 'Default title' }) => (
          <ExamplePanel id={id} title={title} />
        )}
      </MultiTabs>
    );
  },
  args: {
    customDropdownActions: [
      [
        <Dropdown.Button key="save" icon="Save" size="small">
          Save
        </Dropdown.Button>,
        <Dropdown.Button key="saveAll" icon="Save" size="small">
          Save all
        </Dropdown.Button>,
      ],
      [
        <Dropdown.Button key="other" icon="Button" size="small">
          Some other action
        </Dropdown.Button>,
      ],
    ],
    dropdownEnabled: true,
    keepAllPanelsMounted: true,
    placeholder: 'Open a tab',
    toolbar: (
      <MultiTabs.Toolbar>
        <MultiTabs.Toolbar.Group>
          <OverflownText color="grey" italic>
            Last saved: 2 hours ago.
          </OverflownText>
        </MultiTabs.Toolbar.Group>
        <MultiTabs.Toolbar.Group>
          <ButtonIcon icon="Undo" variant="ghosted" />
          <ButtonIcon icon="Redo" variant="ghosted" />
        </MultiTabs.Toolbar.Group>
        <MultiTabs.Toolbar.Group>
          <Button size="small" variant="outlined">
            Save all
          </Button>
          <Button size="small">Save</Button>
        </MultiTabs.Toolbar.Group>
      </MultiTabs.Toolbar>
    ),
    tabs: [
      {
        id: 'e429-56c8-8b6a-9619-1e48-cbd2-7378-330e',
        iconColor: 'blue',
        iconName: 'GridMenu',
        isEditable: false,
      },
      {
        id: '9ce0-50e6-7449-0329-c1ea-5123-449f-6234',
        title: 'Playbook 1',
        iconName: 'ParentChildAlt',
        isEditable: true,
        isPinned: true,
      },
      {
        id: '6ce7-d48e-7222-16ea-22cf-186a-95d6-d9b7',
        title: 'Playbook 2',
        iconName: 'ParentChildAlt',
        iconColor: 'yellow',
        isEditable: true,
      },
      {
        id: '4291-76ed-c7e6-2f01-49cc-f356-1cb3-2b80',
        title: 'Playbook 3 with long name',
        iconName: 'ParentChildAlt',
        iconColor: 'yellow',
        isEditable: true,
      },
    ],
    withBorderBottom: false,
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          resize: 'both',
          overflow: 'auto',
          width: 1400,
          maxWidth: '100%',
          height: 600,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiTabs>;

type Story = StoryObj<typeof MultiTabs>;

export const Default: Story = {};

const generateNewTab = (title: string): Tab => {
  return {
    id: generateUniqId(),
    title,
    iconName: 'Template',
    iconColor: 'green',
    isEditable: true,
  };
};

const ExamplePanel = ({ id, title }: Tab) => {
  useEffect(() => {
    console.log(`MOUNT PANEL ${id}`);
    return () => console.log(`UNMOUNT PANEL ${id}`);
  }, [id]);

  return (
    <Stack direction="column" gap={8} margin={{ x: 6, y: 8 }}>
      <Title>{title}</Title>
      <Text color="grey">ID: {id}</Text>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi
        consequatur cupiditate debitis, delectus ducimus eaque iure nam nihil
        nobis nostrum officiis repellendus reprehenderit soluta, temporibus
        ullam vel veritatis. Ab atque id magnam modi nulla possimus ratione,
        temporibus! Accusantium aspernatur beatae dignissimos dolore, eligendi
        fugiat itaque magni minima nemo nulla pariatur quisquam quo quod
        recusandae reprehenderit sequi similique tempore unde? Aperiam dolores
        minus, officia repudiandae ut vitae voluptate. Ab ad animi debitis,
        dignissimos dolor expedita maiores maxime nemo neque optio perferendis,
        perspiciatis qui recusandae rem repellat sit voluptas? Dolor earum
        facere, fuga incidunt ipsa iure maxime officia omnis quisquam, ratione
        recusandae tenetur. Commodi cum cumque dolor dolore earum eos
        exercitationem facere fuga fugit impedit, inventore ipsa ipsam iusto,
        labore magni minima mollitia nisi odio omnis placeat provident quaerat
        quis reiciendis repellat saepe tempora totam vel veniam voluptates
        voluptatum? Animi aspernatur dolor est exercitationem fuga iure minima
        porro quas quia voluptate!
      </Paragraph>
    </Stack>
  );
};

export default meta;
