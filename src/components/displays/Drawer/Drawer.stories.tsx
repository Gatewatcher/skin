import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import type { PaginatedApiResponse, Todo } from '@/mocks/types';
import { ButtonActions, LinkInternal } from '@/skin/actions';
import { ScoreIndicator } from '@/skin/displays';
import type { FormInstance } from '@/skin/forms';
import { Form, Input } from '@/skin/forms';
import { Layout, Stack } from '@/skin/layout';
import { Table } from '@/skin/listings';
import type { LoadMoreParams } from '@/skin/pagination';
import { Title } from '@/skin/typography';

import Drawer from '.';
import { drawerPersistence } from '..';
import Section from '../Section';
import Tabs from '../Tabs';
import { Test as DrawerTest } from './__tests__/Test';
import { useDrawer } from './hooks/useDrawer';
import { useDrawerPersistence } from './hooks/useDrawerPersistence';

type Story = StoryObj<typeof Drawer>;

export default {
  title: 'displays/Drawer',
  component: Drawer,
  decorators: [
    withRouter,
    Story => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const { open } = useDrawer('demo', {
      keepOn: drawerPersistence.keepEverywhere,
    });
    return (
      <Stack direction="column" gap={8}>
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 2</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 3</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 4</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'demo',
        },
      },
    }),
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              demo: (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Documentation</Drawer.Title>

                    <Drawer.Actions>
                      <ButtonActions
                        actions={
                          <ButtonActions.Actions>
                            <ButtonActions.Button>
                              action 1
                            </ButtonActions.Button>
                            <ButtonActions.Button>
                              action 2
                            </ButtonActions.Button>
                          </ButtonActions.Actions>
                        }
                        variant="ghosted"
                      >
                        Actions
                      </ButtonActions>
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Body gap={8}>
                    <Section>
                      <Section.Header>
                        <Section.Title>Doc Section 1</Section.Title>
                      </Section.Header>
                      <Section.Body>Some doc</Section.Body>
                    </Section>

                    <Form.Field name="test">
                      <Input.Text />
                    </Form.Field>
                  </Drawer.Body>
                  <Drawer.Footer>Footer</Drawer.Footer>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
};

export const WithUrl: Story = {
  render: () => {
    const [data, setData] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const persistence = useDrawerPersistence();

    const { open: openDetail } = useDrawer<Todo>('detail', {
      ...persistence,
      keepOn: drawerPersistence.keepEverywhere,
    });
    const { open: openForm } = useDrawer<Todo>('form', {
      ...persistence,
      keepOn: drawerPersistence.keepEverywhere,
    });

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(
        `/todos?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = (await res.json()) as PaginatedApiResponse<Todo>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <Table
        headers={
          <Table.Headers>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Headers>
        }
        data={data}
        initialPerPage={10}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        persistenceKey="table"
        totalItemsCount={totalCount}
      >
        {todo => {
          const item = {
            id: todo.id,
            title: todo.title,
            completed: false,
          };

          return (
            <Table.Row key={todo.id} id={todo.id}>
              <Table.Cell>{todo.id}</Table.Cell>
              <Table.Cell>{todo.title}</Table.Cell>
              <Table.Actions>
                <Table.ActionButton
                  icon="Binoculars"
                  onClick={() => openDetail(item)}
                >
                  Detail
                </Table.ActionButton>
                <Table.ActionButton icon="Edit" onClick={() => openForm(item)}>
                  Edit
                </Table.ActionButton>
              </Table.Actions>
            </Table.Row>
          );
        }}
      </Table>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer_id: '3',
        },
      },
    }),
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              detail: ({ id }: Todo) => (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Todo n° {id}</Drawer.Title>
                    <Drawer.Actions>
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Body>Body</Drawer.Body>
                </Drawer.Content>
              ),
              form: (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Edit</Drawer.Title>
                    <Drawer.Actions>
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Body>Edit</Drawer.Body>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
};

export const WithWrapper: Story = {
  render: () => {
    const { open } = useDrawer('demo', {
      keepOn: drawerPersistence.keepEverywhere,
    });
    return (
      <Stack direction="column" gap={8}>
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 2</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 3</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 4</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              demo: (
                <Drawer.Content>
                  <Drawer.Fill>
                    <Form
                      initialValues={{ firstname: 'John', lastname: 'Doe' }}
                    >
                      <Drawer.Header>
                        <Drawer.Title>Documentation</Drawer.Title>

                        <Drawer.Actions>
                          <ButtonActions
                            actions={
                              <ButtonActions.Actions>
                                <ButtonActions.Button>
                                  action 1
                                </ButtonActions.Button>
                                <ButtonActions.Button>
                                  action 2
                                </ButtonActions.Button>
                              </ButtonActions.Actions>
                            }
                            variant="ghosted"
                          >
                            Actions
                          </ButtonActions>
                          <Drawer.Close />
                        </Drawer.Actions>
                      </Drawer.Header>
                      <Drawer.Body gap={8}>
                        <Section>
                          <Section.Header>
                            <Section.Title>Doc Section 1</Section.Title>
                          </Section.Header>
                          <Section.Body>Some doc</Section.Body>
                        </Section>
                        <Section>
                          <Section.Header>
                            <Section.Title>User</Section.Title>
                          </Section.Header>
                          <Section.Body>
                            <Form.Field name="firstname">
                              <Input.Text />
                            </Form.Field>
                            <Form.Field name="lastname">
                              <Input.Text />
                            </Form.Field>
                          </Section.Body>
                        </Section>
                      </Drawer.Body>
                      <Drawer.Footer justifyContent="flex-end">
                        <Form.Actions form={{} as FormInstance} />
                      </Drawer.Footer>
                    </Form>
                  </Drawer.Fill>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'demo',
        },
      },
    }),
  },
};

export const WithTabs: Story = {
  render: () => {
    const { open } = useDrawer('demo', {
      keepOn: drawerPersistence.keepEverywhere,
    });
    return (
      <Stack direction="column" gap={8}>
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 2</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 3</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 4</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              demo: (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Drawer title</Drawer.Title>
                    <Drawer.Actions>
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>

                  <Drawer.Body padding={0}>
                    <Drawer.Fill>
                      <Tabs>
                        <Tabs.TitleList variant="secondary" full>
                          <Tabs.Title>title 1</Tabs.Title>
                          <Tabs.Title>title 2</Tabs.Title>
                        </Tabs.TitleList>

                        <Drawer.Fill>
                          <Tabs.PanelList>
                            <Tabs.Panel>
                              <Drawer.Fill>
                                <Form
                                  initialValues={{
                                    firstname: 'John',
                                    lastname: 'Doe',
                                  }}
                                >
                                  <Drawer.Body>
                                    <Form.Section>
                                      <Form.SectionBody>
                                        <Form.Field name="firstname">
                                          <Input.Text />
                                        </Form.Field>
                                        <Form.Field name="lastname">
                                          <Input.Text />
                                        </Form.Field>
                                      </Form.SectionBody>
                                    </Form.Section>
                                  </Drawer.Body>
                                  <Drawer.Footer justifyContent="flex-end">
                                    <Form.Actions form={{} as FormInstance} />
                                  </Drawer.Footer>
                                </Form>
                              </Drawer.Fill>
                            </Tabs.Panel>

                            <Tabs.Panel>
                              <Drawer.Body>Panel 2</Drawer.Body>
                            </Tabs.Panel>
                          </Tabs.PanelList>
                        </Drawer.Fill>
                      </Tabs>
                    </Drawer.Fill>
                  </Drawer.Body>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'demo',
        },
      },
    }),
  },
};

export const WithCloseOn: Story = {
  render: () => {
    const { open } = useDrawer('demo', { keepOn: /^\/demo/ });
    return (
      <Stack direction="column" gap={8}>
        <Stack gap={6}>
          <LinkInternal to="/">Home</LinkInternal>
          <LinkInternal to="/demo">Demo</LinkInternal>
          <LinkInternal to="/other">Other</LinkInternal>
          <LinkInternal to="/test">Test</LinkInternal>
        </Stack>

        <Outlet />
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Title>Doc Section 2</Section.Title>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Title>Doc Section 3</Section.Title>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Title>Doc Section 4</Section.Title>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: '/',
          element: 'Home',
        },
        {
          path: '/demo',
          element: 'demo',
        },
        {
          path: '/other',
          element: 'other',
        },
        {
          path: '/test',
          element: 'test',
        },
      ]),
      location: {
        path: '/',
      },
    }),
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              demo: (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Documentation</Drawer.Title>

                    <Drawer.Actions>
                      <ButtonActions
                        actions={
                          <ButtonActions.Actions>
                            <ButtonActions.Button>
                              action 1
                            </ButtonActions.Button>
                            <ButtonActions.Button>
                              action 2
                            </ButtonActions.Button>
                          </ButtonActions.Actions>
                        }
                        variant="ghosted"
                      >
                        Actions
                      </ButtonActions>
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Body gap={8}>
                    <Section>
                      <Section.Title>Doc Section 1</Section.Title>
                      <Section.Body>Some doc</Section.Body>
                    </Section>

                    <Form.Field name="test">
                      <Input.Text />
                    </Form.Field>
                  </Drawer.Body>
                  <Drawer.Footer>Footer</Drawer.Footer>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
};

export const WithMaximize: Story = {
  render: () => {
    const { open } = useDrawer('demo', {
      keepOn: drawerPersistence.keepEverywhere,
    });
    return (
      <Stack direction="column" gap={8}>
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 2</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 3</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>

        <Section>
          <Section.Header>
            <Section.Title>Doc Section 4</Section.Title>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'demo',
        },
      },
    }),
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              demo: (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Documentation</Drawer.Title>

                    <Drawer.Actions>
                      <ButtonActions
                        actions={
                          <ButtonActions.Actions>
                            <ButtonActions.Button>
                              action 1
                            </ButtonActions.Button>
                            <ButtonActions.Button>
                              action 2
                            </ButtonActions.Button>
                          </ButtonActions.Actions>
                        }
                        variant="ghosted"
                      >
                        Actions
                      </ButtonActions>
                      <Drawer.Maximize maximizeSize="large" />
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Body gap={8}>
                    <Section>
                      <Section.Header>
                        <Section.Title>Doc Section 1</Section.Title>
                      </Section.Header>
                      <Section.Body>Some doc</Section.Body>
                    </Section>

                    <Form.Field name="test">
                      <Input.Text />
                    </Form.Field>
                  </Drawer.Body>
                  <Drawer.Footer>Footer</Drawer.Footer>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
};

export const WithStickyHeader: Story = {
  render: () => {
    const { open } = useDrawer('demo', {
      keepOn: drawerPersistence.keepEverywhere,
    });
    return (
      <Stack direction="column" gap={8}>
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'demo',
        },
      },
    }),
  },
  decorators: [
    Story => {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <Layout
          drawer={
            <Drawer
              matches={{
                demo: (
                  <Drawer.Content ref={ref} fitContent>
                    <Drawer.HeaderSticky
                      customContent={isSticky => (
                        <Stack alignItems="center" gap={6}>
                          <ScoreIndicator
                            sectors={['low', 'danger']}
                            size={isSticky ? 'small' : 'medium'}
                            value={42}
                          />
                          <Title>This is a title</Title>
                        </Stack>
                      )}
                      gap={9}
                      parentRef={ref}
                    >
                      <Drawer.Title>Documentation</Drawer.Title>
                      <Drawer.Actions>
                        <Drawer.Close />
                      </Drawer.Actions>
                    </Drawer.HeaderSticky>
                    <Drawer.Body gap={8}>
                      <Section>
                        <Section.Header>
                          <Section.Title>Doc Section 1</Section.Title>
                        </Section.Header>
                        <Section.Body>
                          <Stack style={{ height: 1500 }}>Big</Stack>
                        </Section.Body>
                      </Section>
                    </Drawer.Body>
                  </Drawer.Content>
                ),
              }}
            />
          }
        >
          <Layout.Row>
            <Story />
          </Layout.Row>
        </Layout>
      );
    },
  ],
};

export const WithMuchContent: Story = {
  render: () => {
    const { open } = useDrawer('demo', {
      keepOn: drawerPersistence.keepEverywhere,
    });
    return (
      <Stack direction="column" gap={8}>
        <Section>
          <Section.Header>
            <Section.Title>Doc Section 1</Section.Title>
            <Section.Button onClick={() => open()}>Help</Section.Button>
          </Section.Header>
          <Section.Body>Some doc</Section.Body>
        </Section>
      </Stack>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'demo',
        },
      },
    }),
  },
  decorators: [
    Story => (
      <Layout
        drawer={
          <Drawer
            matches={{
              demo: (
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Documentation</Drawer.Title>

                    <Drawer.Actions>
                      <ButtonActions
                        actions={
                          <ButtonActions.Actions>
                            <ButtonActions.Button>
                              action 1
                            </ButtonActions.Button>
                            <ButtonActions.Button>
                              action 2
                            </ButtonActions.Button>
                          </ButtonActions.Actions>
                        }
                        variant="ghosted"
                      >
                        Actions
                      </ButtonActions>
                      <Drawer.Maximize maximizeSize="large" />
                      <Drawer.Close />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Fill>
                    <Drawer.Body gap={8}>
                      {range({ start: 1, stop: 21 }).map(value => (
                        <Section key={value}>
                          <Section.Header>
                            <Section.Title>Doc Section {value}</Section.Title>
                          </Section.Header>
                          <Section.Body>Some doc</Section.Body>
                        </Section>
                      ))}
                    </Drawer.Body>
                  </Drawer.Fill>
                  <Drawer.Footer>Footer</Drawer.Footer>
                </Drawer.Content>
              ),
            }}
          />
        }
      >
        <Layout.Row>
          <Story />
        </Layout.Row>
      </Layout>
    ),
  ],
};

export const Test: Story = {
  render: DrawerTest,
};
