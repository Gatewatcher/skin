import { faker } from '@faker-js/faker';
import { useDebouncedCallback } from '@gatewatcher/bistoury/hooks';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { Workspace } from '@/mocks/types';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import Finder from '.';

faker.seed(10);

type Story = StoryObj<typeof Finder>;

export default {
  title: 'displays/Finder',
  component: Finder,
} as Meta<typeof Finder>;

const communities: Workspace[] = [
  { id: '0', name: 'community', type: 'community' },
];

const organisations: Workspace[] = range({ stop: 5 }).map(index => ({
  id: index.toString(),
  name: faker.lorem.words({ min: 2, max: 6 }),
  type: 'organisation',
}));

const groups: Workspace[] = range({ stop: 10 }).map(index => ({
  id: index.toString(),
  name: faker.lorem.words({ min: 2, max: 6 }),
  type: 'group',
}));

export const Default: Story = {
  render: args => {
    const [panel1, setPanel1] = useState<Workspace | undefined>(communities[0]);
    const [panel2, setPanel2] = useState<Workspace | undefined>(
      organisations[1],
    );
    const [panel3, setPanel3] = useState<Workspace | undefined>();

    const [search, setSearch] = useState('');
    const debouncedSetSearch = useDebouncedCallback(setSearch);

    useEffect(() => {
      setPanel3(undefined);
    }, [panel2]);

    return (
      <Stack justifyContent="space-between">
        <Finder.Provider>
          <Finder
            {...args}
            panels={
              <Finder.Panels
                searchResults={
                  search ? (
                    <Finder.SearchResults
                      data={organisations.filter(item =>
                        item.name.includes(search),
                      )}
                      emptyMessage="no data"
                    >
                      {item => <Text key={item.id}>{item.name}</Text>}
                    </Finder.SearchResults>
                  ) : null
                }
                count={3}
                searchBar={<Finder.SearchBar onChange={debouncedSetSearch} />}
              >
                <Finder.Panel
                  data={communities}
                  name={<Finder.PanelName>community</Finder.PanelName>}
                >
                  {item => (
                    <Finder.PanelItem
                      key={item.id}
                      item={item}
                      onSelect={setPanel1}
                      defaultChecked
                      hasChildren
                    />
                  )}
                </Finder.Panel>

                <Finder.Panel
                  key={panel2?.id}
                  allItem={<Finder.PanelItemAll label="All" />}
                  data={organisations}
                  disabled={!panel1}
                  initialPerPage={5}
                  name={<Finder.PanelName>Organisation</Finder.PanelName>}
                  totalItemsCount={organisations.length}
                >
                  {item => (
                    <Finder.PanelItem
                      key={item.id}
                      defaultChecked={panel2?.id === item.id}
                      hasChildren={item.id !== 'all'}
                      item={item}
                      onReset={() => setPanel2(undefined)}
                      onSelect={setPanel2}
                    />
                  )}
                </Finder.Panel>

                <Finder.Panel
                  key={panel3?.id}
                  disabledPlaceholder={
                    <Finder.PanelPlaceholder>
                      Choose an organisation
                    </Finder.PanelPlaceholder>
                  }
                  data={groups}
                  disabled={!panel2}
                  name={<Finder.PanelName>Groups</Finder.PanelName>}
                >
                  {item => (
                    <Finder.PanelItem
                      key={item.id}
                      defaultChecked={item.id === panel3?.id}
                      hasChildren={false}
                      item={item}
                      onSelect={setPanel3}
                    />
                  )}
                </Finder.Panel>
              </Finder.Panels>
            }
            resume={
              <Finder.Resume>
                {panel1?.id && (
                  <Finder.ResumeItem>{panel1?.name}</Finder.ResumeItem>
                )}
                {panel2?.id && (
                  <Finder.ResumeItem>{panel2?.name}</Finder.ResumeItem>
                )}
                {panel3?.id && (
                  <Finder.ResumeItem>{panel3?.name}</Finder.ResumeItem>
                )}
              </Finder.Resume>
            }
          />
          <Finder.OpenButton startIcon="Group">
            Please select a workspace
          </Finder.OpenButton>
        </Finder.Provider>
      </Stack>
    );
  },
};
