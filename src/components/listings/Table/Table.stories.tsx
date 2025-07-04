import { faker } from '@faker-js/faker/locale/en';
import {
  useDebouncedCallback,
  useDidMountEffect,
} from '@gatewatcher/bistoury/hooks';
import { first, range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useSearchParams } from 'react-router-dom';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router';

import type { ApiError, PaginatedApiResponse, Todo, User } from '@/mocks/types';
import {
  ButtonIcon,
  FloatingActions,
  LinkExternal,
  LinkInternal,
} from '@/skin/actions';
import OverflownLink from '@/skin/actions/links/OverflownLink';
import {
  Chip,
  DateTimeAbsolute,
  DateTimeRelative,
  Dropdown,
  Modal,
  Tabs,
} from '@/skin/displays';
import StatusIndicator from '@/skin/displays/StatusIndicator';
import { Toastr, useToasts } from '@/skin/feedback';
import { Form, Input, SearchBar, useForm } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import type { TableColumn } from '@/skin/listings';
import { convertSortValueToOrdering, useSort } from '@/skin/listings';
import type { LoadMoreParams } from '@/skin/pagination';
import { calcOffset, usePagination } from '@/skin/pagination';
import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from '@/skin/pagination/ItemsPerPage/constants';
import {
  DEFAULT_INITIAL_PER_PAGE,
  DEFAULT_LOAD_MORE_TYPE,
  LOAD_MORE_TYPES,
} from '@/skin/pagination/LoadMore/constants';
import { useDecodeUrl, useEncodeUrl } from '@/skin/pagination/LoadMore/hooks';
import { OverflownText } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { TableProps, TableRowsProps } from '.';
import Table from '.';
import {
  DEFAULT_PLACEHOLDER_SIZE,
  PLACEHOLDER_SIZES,
} from '../Listing/constants';
import { useBatchSelection } from '../Listing/hooks';
import type { TableDataItem } from '../Listing/types';
import { DEFAULT_LAYOUT, DEFAULT_VARIANT, LAYOUTS } from './constants';

faker.seed(10);

type NetworkSetting = {
  interface: string;
  link: boolean;
  mac: string;
  status: boolean;
  ip?: string;
  mask?: string;
  gateway?: string;
  mtu: number;
  mss: number;
};

function generateTodos<Todo>(count = 100): Todo[] {
  return range({ stop: count }).map(nb => ({
    id: nb,
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean(),
  })) as Todo[];
}

function generateUsers<User>(count = 100): User[] {
  return range({ stop: count }).map(nb => ({
    id: nb,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 1, max: 99 }),
  })) as User[];
}

type Story<T extends TableDataItem = Todo> = StoryObj<typeof Table<T>>;
type RowStory<T extends TableDataItem = Todo> = StoryObj<TableRowsProps<T>>;

export default {
  title: 'Listings/Table',
  component: Table,
  args: {
    persistenceKey: 'table',
    onParamsChange: undefined,
    emptyMessage: 'EMPTY DATA',
    perPage: DEFAULT_INITIAL_PER_PAGE,
    loadMoreType: DEFAULT_LOAD_MORE_TYPE,
    error: 'some error message',
    layout: DEFAULT_LAYOUT,
    variant: DEFAULT_VARIANT,
    placeholderSize: DEFAULT_PLACEHOLDER_SIZE,
    onReady: () => {},
    children: row => (
      <Table.Row key={row.id} id={row.id}>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
      </Table.Row>
    ),
  },
  argTypes: {
    ...addInlineRadio<TableProps<TableDataItem>>(
      'loadMoreType',
      LOAD_MORE_TYPES,
    ),
    ...addInlineRadio<TableProps<TableDataItem>>('layout', LAYOUTS),
    ...addInlineRadio<TableProps<TableDataItem>>(
      'placeholderSize',
      PLACEHOLDER_SIZES,
    ),
    ...addInlineRadio<TableProps<TableDataItem>>(
      'initialPerPage',
      DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    ),
  },
  parameters: {
    controls: {
      exclude: /^initial/,
    },
  },
  decorators: [withRouter],
} as Meta<typeof Table<Todo>>;

export const Default: Story = {
  args: {
    data: generateTodos(4),
  },
};

export const OneAction: Story = {
  args: {
    data: generateTodos(4),
    persistenceKey: 'table',
    children: row => (
      <Table.Row key={row.id} id={row.id} onClick={console.log}>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
        <Table.Actions>
          <Table.ActionEdit id={row.id} />
        </Table.Actions>
      </Table.Row>
    ),
  },
};

export const MultipleActions: Story = {
  args: {
    data: generateTodos(4),
    children: row => (
      <Table.Row key={row.id} id={row.id} onClick={console.log}>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
        <Table.Actions>
          <Table.ActionGroup>
            <Table.ActionEdit id={row.id} />
            <Table.ActionButton icon="Copy" onClick={() => alert('copy')}>
              Custom icon
            </Table.ActionButton>
          </Table.ActionGroup>
          <Table.ActionGroup>
            <Table.ActionLink to="https://www.google.com">
              Link
            </Table.ActionLink>
            <Table.ActionButton icon="Delete" type="danger">
              Delete
            </Table.ActionButton>
          </Table.ActionGroup>
        </Table.Actions>
      </Table.Row>
    ),
  },
};

export const WithHeaders: Story = {
  args: {
    data: generateTodos(4),
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>title ici</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const WithHeadersAndActions: Story = {
  args: {
    data: generateTodos(4),
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Headers>
    ),
    children: row => (
      <Table.Row key={row.id} id={row.id}>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
        <Table.Actions>
          <Table.ActionButton icon="Delete" onClick={() => alert('delete')}>
            Delete
          </Table.ActionButton>
          <Table.ActionEdit id={row.id} />
          <Table.ActionButton icon="Add">
            <Modal content={<Modal.Body>body</Modal.Body>}>
              <div>ok</div>
            </Modal>
          </Table.ActionButton>
        </Table.Actions>
      </Table.Row>
    ),
  },
};

export const WithoutPagination: Story = {
  args: {
    initialPerPage: 0,
    data: generateTodos(100),
  },
};

export const WithPerPage: Story = {
  render: ({ data: dataProps, ...args }) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(dataProps as Todo[], pageParams);

    return (
      <Table
        {...args}
        data={slicedData}
        onParamsChange={setPageParams}
        onReady={setPageParams}
      />
    );
  },
  args: {
    data: generateTodos(45),
    totalItemsCount: 45,
  },
};

export const WithInfiniteScroll: Story = {
  render: ({ data: dataProps, ...args }: TableProps<Todo>) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(dataProps as Todo[], pageParams);

    return (
      <Table
        {...args}
        data={slicedData}
        onParamsChange={setPageParams}
        onReady={setPageParams}
      />
    );
  },
  args: {
    loadMoreType: 'infiniteScroll',
    data: generateTodos(200),
    totalItemsCount: 200,
  },
};

export const WithFetchPagination: Story = {
  render: args => {
    const [data, setData] = useState<Todo[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

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
        {...args}
        data={data}
        initialPerPage={10}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
      />
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title', initialOrder: 'asc' }}>
          Title
        </Table.HeaderCell>
        <Table.HeaderCell>completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const WithFetchInfinite: Story = {
  render: args => {
    const [allData, setAllData] = useState<Todo[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(
        `/todos?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = (await res.json()) as PaginatedApiResponse<Todo>;
      setAllData(prevData => [...(prevData || []), ...data.results]);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <Table
        {...args}
        data={allData}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
      />
    );
  },
  args: {
    loadMoreType: 'infiniteScroll',
  },
};

export const WithReactQuery: Story = {
  render: args => {
    const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();

    const fetchData = async () => {
      if (!loadMoreParams) return;

      const res = await fetch(
        `/todos?page=${loadMoreParams.page}&page_size=${loadMoreParams.perPage}`,
      );
      return await res.json();
    };

    const { data, isLoading } = useQuery({
      queryKey: ['todos', loadMoreParams?.page, loadMoreParams?.perPage],
      queryFn: fetchData,
      staleTime: Infinity,
      enabled: !!loadMoreParams,
    });

    return (
      <Table
        {...args}
        data={data?.results}
        isLoading={isLoading}
        onParamsChange={setLoadMoreParams}
        onReady={setLoadMoreParams}
        totalItemsCount={data?.count}
      />
    );
  },
  args: {
    data: [],
    headers: (
      <Table.Headers>
        <Table.HeaderCell sort={{ id: 'id', initialOrder: 'asc' }}>
          Id
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const Large: Story<NetworkSetting> = {
  args: {
    data: [
      ...range({ stop: 4 }).map(number => ({
        interface: `gct${number}`,
        link: number % 2 === 0,
        mac: '00:35:15:CA:45:24',
        status: number % 2 === 0,
        ip: '10.10.10.52',
        mask: '255.255.255.0',
        gateway: '10.10.10.254',
        mtu: 1500,
        mss: 1500,
      })),
      {
        interface: `gct4`,
        link: true,
        mac: '00:35:15:CA:45:24',
        status: true,
        ip: '',
        mask: '',
        gateway: '',
        mtu: 1500,
        mss: 1500,
      },
    ],
    emptyCellFallback: '-',
    minWidth: '150vw',
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Interface</Table.HeaderCell>
        <Table.HeaderCell>Link</Table.HeaderCell>
        <Table.HeaderCell>MAC</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>IP</Table.HeaderCell>
        <Table.HeaderCell>Mask</Table.HeaderCell>
        <Table.HeaderCell>Gateway</Table.HeaderCell>
        <Table.HeaderCell>MTU</Table.HeaderCell>
        <Table.HeaderCell>MSS</Table.HeaderCell>
      </Table.Headers>
    ),
    children: row => (
      <Table.Row key={row.interface} id={row.interface}>
        <Table.Cell>{row.interface}</Table.Cell>
        <Table.Cell>
          <Chip type={row.link ? 'success' : 'danger'}>
            {row.link ? 'Up' : 'Down'}
          </Chip>
        </Table.Cell>
        <Table.Cell>{row.mac}</Table.Cell>
        <Table.Cell>{row.status ? 'enabled' : 'disabled'}</Table.Cell>
        <Table.Cell>{row.ip}</Table.Cell>
        <Table.Cell>{row.mask}</Table.Cell>
        <Table.Cell>{row.gateway}</Table.Cell>
        <Table.Cell>{row.mtu}</Table.Cell>
        <Table.Cell>{row.mss}</Table.Cell>
      </Table.Row>
    ),
  },
};

export const WithExternalAPI: Story = {
  render: args => {
    const [data, setData] = useState<Todo[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);

      const sort = first(params.sort);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=${
          params.perPage
        }&_start=${params.offset}${
          sort && `&_sort=${sort.id}&_order=${sort.order}`
        }`,
      );
      const data = (await res.json()) as Todo[];
      setData(data);
      setIsLoading(false);
      setTotalCount(Number(res?.headers?.get('x-total-count') || data.length));
    };

    return (
      <Table
        {...args}
        data={data}
        initialSort={[{ id: 'id', order: 'desc' }]}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
      />
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell sort={{ id: 'id', initialOrder: 'asc' }}>
          Id
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const FetchEmpty: Story = {
  render: args => {
    const [data, setData] = useState<Todo[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(
        `/todos-empty?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = (await res.json()) as PaginatedApiResponse<Todo>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <Table
        {...args}
        data={data}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
      />
    );
  },
  args: {
    data: [],
    headers: (
      <Table.Headers>
        <Table.HeaderSelectCell />
        <Table.HeaderCell sort={{ id: 'id', initialOrder: 'asc' }}>
          Id
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    data: [],
  },
};

export const EmptyCustom: Story = {
  args: {
    isLoading: false,
    data: [],
    emptyElement: <div>custom no data</div>,
  },
};

export const WithErrors: Story = {
  args: {
    isError: true,
  },
};

export const WithFetchErrors: Story = {
  render: args => {
    const [params, setParams] = useState<LoadMoreParams>();

    const fetchData = async () => {
      if (!params) return;

      const res = await fetch(
        `/todos-error?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return data;
    };

    const { data, isLoading, isError, error } = useQuery<
      PaginatedApiResponse<Todo>,
      ApiError
    >({
      queryKey: ['todos', params?.page],
      queryFn: fetchData,
      staleTime: Infinity,
      retry: false,
      enabled: !!params,
    });

    return (
      <Table
        {...args}
        error={error?.detail}
        isError={isError}
        isLoading={isLoading}
        onParamsChange={setParams}
        onReady={setParams}
        totalItemsCount={data?.count}
      />
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>cell</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const CustomControls: Story = {
  render: ({ data, ...args }: TableProps<Todo>) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(data as Todo[], pageParams);

    return (
      <Table
        {...args}
        controlsBottom={() => <div>custom controls</div>}
        data={slicedData}
        onParamsChange={setPageParams}
      />
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
  },
};

export const Sortable: Story<User> = {
  render: ({ data, ...args }) => {
    const [params, setParams] = useState<LoadMoreParams>();
    const sortedData = useSort(data as User[], params?.sort?.[0]);

    return (
      <Table
        {...args}
        data={sortedData}
        initialSort={[{ id: 'age', order: 'desc' }]}
        onParamsChange={setParams}
        onReady={setParams}
      />
    );
  },
  args: {
    data: generateUsers(20),
    totalItemsCount: 20,
    headers: (
      <Table.Headers>
        <Table.HeaderCell sort={{ id: 'firstname' }}>
          Firstname
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'lastname', initialOrder: 'desc' }}>
          Lastname
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'age', initialOrder: 'desc' }}>
          Age
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'email' }}>Email</Table.HeaderCell>
      </Table.Headers>
    ),
    children: row => (
      <Table.Row key={row.email} id={row.id}>
        <Table.Cell>{row.firstname}</Table.Cell>
        <Table.Cell>{row.lastname}</Table.Cell>
        <Table.Cell>{row.age}</Table.Cell>
        <Table.Cell>{row.email}</Table.Cell>
      </Table.Row>
    ),
  },
};

export const SortableFetch: Story = {
  render: args => {
    const [data, setData] = useState<Todo[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);

      const searchParams = new URLSearchParams({
        _limit: params.perPage.toString(),
        _start: params.offset.toString(),
        ...(first(params.sort) && {
          _sort: params.sort.at(0)?.id,
          _order: params.sort.at(0)?.order,
        }),
      });

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?${searchParams.toString()}`,
      );
      const data = (await res.json()) as Todo[];
      setData(data);
      setIsLoading(false);
      setTotalCount(+(res?.headers?.get('x-total-count') || data.length));
    };

    return (
      <Table
        {...args}
        data={data}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
      />
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell sort={{ id: 'id' }}>ID</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'completed' }}>
          Completed
        </Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const Selectable: Story = {
  render: ({ data: dataProps, ...args }) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(dataProps as Todo[], pageParams);

    return (
      <Table
        {...args}
        data={slicedData}
        onBatchSelect={console.log}
        onParamsChange={setPageParams}
      />
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    headers: (
      <Table.Headers>
        <Table.HeaderSelectCell />
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
    children: row => (
      <Table.Row
        key={row.id}
        id={row.id}
        onClick={() => console.log('Row clicked')}
      >
        <Table.SelectCell id={row.id} />
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
      </Table.Row>
    ),
  },
};

export const WithForm: RowStory = {
  render: ({ data, ...args }) => {
    const { addToast } = useToasts();

    const handleOnFinish = (values: unknown) => {
      addToast({
        title: 'Form sent',
        content: 'Log in console',
        type: 'success',
      });
      console.log('values sent', values);
    };

    return (
      <Form onFinish={handleOnFinish}>
        <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
        <Form.List initialValue={data} name="todos">
          {() => {
            return (
              <Table {...args} data={data} persistenceKey="table">
                {row => (
                  <Table.Row key={row.id} id={row.id}>
                    {({ editing }) => (
                      <>
                        <Table.Cell>
                          <Form.Field
                            initialValue={row.title}
                            name={[row.id, 'title']}
                          >
                            <Input.Text
                              readonlyMode={{ enabled: !editing }}
                              withLabel={false}
                            />
                          </Form.Field>
                        </Table.Cell>
                        <Table.Cell>
                          <Form.Field
                            initialValue={row.completed}
                            name={[row.id, 'completed']}
                            valuePropName="checked"
                          >
                            {({ checked, onChange }) => (
                              <Input.Switch
                                readonlyMode={{
                                  enabled: !editing,
                                  label: checked ? 'Enabled' : 'Disabled',
                                }}
                                checked={checked}
                                endLabel="Enabled"
                                onChange={onChange}
                              />
                            )}
                          </Form.Field>
                        </Table.Cell>

                        <Table.Actions>
                          <Table.ActionEdit id={row.id} />
                        </Table.Actions>
                      </>
                    )}
                  </Table.Row>
                )}
              </Table>
            );
          }}
        </Form.List>
      </Form>
    );
  },

  args: {
    data: generateTodos(10),
    initialPerPage: 10,
    totalItemsCount: 10,
  },
  decorators: [
    Story => (
      <Toastr>
        <Story />
      </Toastr>
    ),
  ],
};

export const WithFormAndFetch: RowStory = {
  render: args => {
    const { addToast } = useToasts();
    const [data, setData] = useState<Todo[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

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

    const handleOnFinish = (values: unknown) => {
      addToast({
        title: 'Form sent',
        content: 'Log in console',
        type: 'success',
      });
      console.log('values sent', values);
    };

    return (
      <Form onFinish={handleOnFinish}>
        <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
        <Form.List initialValue={data} name="todos">
          {() => {
            return (
              <Table
                {...args}
                columns={undefined}
                data={data}
                isLoading={isLoading}
                onParamsChange={fetchData}
                onReady={fetchData}
                persistenceKey="table"
                totalItemsCount={totalCount}
              >
                {row => (
                  <Table.Row key={row.id} id={row.id}>
                    {({ editing }) => (
                      <>
                        <Table.Cell>
                          <Form.Field
                            initialValue={row.title}
                            name={[row.id, 'title']}
                          >
                            <Input.Text
                              readonlyMode={{ enabled: !editing }}
                              withLabel={false}
                            />
                          </Form.Field>
                        </Table.Cell>
                        <Table.Cell>
                          <Form.Field
                            initialValue={row.completed}
                            name={[row.id, 'completed']}
                            valuePropName="checked"
                          >
                            {({ checked, onChange }) => (
                              <Input.Switch
                                readonlyMode={{
                                  enabled: !editing,
                                  label: checked ? 'Enabled' : 'Disabled',
                                }}
                                checked={checked}
                                endLabel="Enabled"
                                onChange={onChange}
                              />
                            )}
                          </Form.Field>
                        </Table.Cell>

                        <Table.Actions>
                          <Table.ActionEdit id={row.id} />
                        </Table.Actions>
                      </>
                    )}
                  </Table.Row>
                )}
              </Table>
            );
          }}
        </Form.List>
      </Form>
    );
  },
  args: {
    initialPerPage: 10,
  },
  decorators: [
    Story => (
      <Toastr>
        <Story />
      </Toastr>
    ),
  ],
};

export const WithPersistence: Story = {
  render: ({ data, ...args }) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(data as Todo[], pageParams);
    const sortedData = useSort<Todo>(
      slicedData as Todo[],
      pageParams?.sort?.[0],
    );

    const encode = useEncodeUrl();
    const decode = useDecodeUrl();

    return (
      <Table
        {...args}
        data={sortedData}
        encode={encode}
        onParamsChange={setPageParams}
        onReady={setPageParams}
        {...decode()}
      />
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { page: '3', page_size: '10', sort: '-title' },
      },
    }),
  },
  decorators: [
    Story => (
      <Routes>
        <Route element={<Story />} path="/" />
      </Routes>
    ),
  ],
};

export const WithPersistenceAndFetch: Story = {
  render: args => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Todo[]>();
    const [totalCount, setTotalCount] = useState<number>();

    const fetchData = async ({ page, perPage, sort }: LoadMoreParams) => {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('page_size', perPage.toString());
      const firstSort = sort.at(0);
      sort &&
        firstSort &&
        params.append('sort', convertSortValueToOrdering(firstSort));

      const res = await fetch(`/todos?${params.toString()}`);
      const data = (await res.json()) as PaginatedApiResponse<Todo>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    const encode = useEncodeUrl();
    const decode = useDecodeUrl();

    return (
      <Table
        {...args}
        data={data}
        encode={encode}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
        {...decode()}
      />
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { page: '3', page_size: '10', sort: '-title' },
      },
    }),
  },
  decorators: [
    Story => (
      <Routes>
        <Route element={<Story />} path="/" />
      </Routes>
    ),
  ],
};

export const WithPersistenceAndFetchWithURL: Story = {
  render: args => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Todo[]>();
    const [totalCount, setTotalCount] = useState<number>();

    const fetchData = async () => {
      setIsLoading(true);

      const res = await fetch(`/todos?${searchParams.toString()}`);
      const data = (await res.json()) as PaginatedApiResponse<Todo>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    const encode = useEncodeUrl();
    const decode = useDecodeUrl();

    useDidMountEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
      <Table
        {...args}
        data={data}
        isLoading={isLoading}
        onParamsChange={encode}
        onReady={encode}
        totalItemsCount={totalCount}
        {...decode()}
      />
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { page: '3', page_size: '10', sort: '-title' },
      },
    }),
  },
  decorators: [
    Story => (
      <Routes>
        <Route element={<Story />} path="/" />
      </Routes>
    ),
  ],
};

export const WithInitalPageAndPerPage: Story = {
  render: ({ data, ...args }) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(data as Todo[], pageParams);

    return (
      <Table
        {...args}
        data={slicedData}
        onParamsChange={setPageParams}
        onReady={setPageParams}
      />
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    initialPage: 4,
    initialPerPage: 10,
  },
};

export const WithPersistenceAndCustomUrl: Story = {
  render: ({ data, totalItemsCount, ...args }) => {
    const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();
    const slicedData = usePagination<Todo>(data as Todo[], loadMoreParams);
    const sortedData = useSort(slicedData, loadMoreParams?.sort?.[0]);

    const decode = useDecodeUrl({
      page: {
        decode: (_, url) => {
          const start = Number(url.get('start'));
          const perPage = Number(url.get('limit'));
          return start / perPage;
        },
      },
      perPage: { name: 'limit' },
      sort: { name: 'ordering' },
    });

    const encode = useEncodeUrl({
      perPage: { name: 'limit' },
      sort: { name: 'ordering' },
      page: {
        name: 'start',
        encode: (_, params) =>
          calcOffset({ page: params.page, perPage: params.perPage }),
      },
    });

    return (
      <Table
        {...args}
        data={sortedData}
        encode={encode}
        onParamsChange={setLoadMoreParams}
        onReady={setLoadMoreParams}
        totalItemsCount={totalItemsCount}
        {...decode()}
      />
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    headers: (
      <Table.Headers>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Headers>
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { start: '30', limit: '10', ordering: '-title' },
      },
    }),
  },
};

export const WithPersistenceAndPrefix: RowStory = {
  render: ({ data, totalItemsCount, ...args }) => {
    const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();
    const slicedData = usePagination<Todo>(data as Todo[], loadMoreParams);
    const sortedData = useSort(slicedData, loadMoreParams?.sort?.[0]);

    const decode = useDecodeUrl({}, { prefix: 'test' });
    const encode = useEncodeUrl({}, { prefix: 'test' });

    return (
      <Table
        {...args}
        data={sortedData}
        encode={encode}
        onParamsChange={setLoadMoreParams}
        onReady={setLoadMoreParams}
        persistenceKey="table"
        totalItemsCount={totalItemsCount}
        {...decode()}
      />
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    headers: (
      <Table.Headers>
        <Table.HeaderCell sort={{ id: 'id', initialOrder: 'desc' }}>
          ID
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Headers>
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          test_page: '4',
          test_page_size: '10',
          test_sort: '-title',
        },
      },
    }),
  },
};

export const Hovering: RowStory = {
  render: args => {
    return (
      <Table {...args} columns={undefined} persistenceKey="table">
        {row => (
          <Table.Row key={row.id} id={row.id}>
            {({ hovering }) => (
              <>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>
                  {row.completed ? 'completed' : 'not completed'}
                </Table.Cell>
                <Table.Cell>
                  {hovering ? 'hovering' : 'not hovering'}
                </Table.Cell>
              </>
            )}
          </Table.Row>
        )}
      </Table>
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    headers: (
      <Table.Headers>
        <Table.HeaderCell sort={{ id: 'id', initialOrder: 'desc' }}>
          ID
        </Table.HeaderCell>
        <Table.HeaderCell sort={{ id: 'title' }}>Title</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Hovering</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

export const WithMutedCells: Story = {
  args: {
    data: generateTodos(4),
    children: (row, { index }) => (
      <Table.Row key={row.id} id={row.id}>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell isMuted={index < 2}>
          <Stack alignItems="center" gap={4}>
            <StatusIndicator type={index < 2 ? 'neutral' : 'info'} />
            {row.title}
          </Stack>
        </Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
      </Table.Row>
    ),
  },
};

export const WithClickableRows: Story = {
  args: {
    data: generateTodos(4),
    children: row => (
      <Table.Row
        key={row.id}
        id={row.id}
        onClick={() => alert('Row.onClick()')}
      >
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
      </Table.Row>
    ),
  },
};

type TodoJsonPlaceholder = Todo & { userId: number };
export const WithMultipleSort: RowStory<TodoJsonPlaceholder> = {
  render: args => {
    const [data, setData] = useState<TodoJsonPlaceholder[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const decode = useDecodeUrl();
    const encode = useEncodeUrl();

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);

      const searchParams = new URLSearchParams({
        _limit: params.perPage.toString(),
        _start: params.offset.toString(),
        ...(params.sort?.length && {
          _sort: params.sort.map(item => item.id).join(','),
          _order: params.sort.map(item => item.order).join(','),
        }),
      });

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?${searchParams.toString()}`,
      );
      const data = (await res.json()) as TodoJsonPlaceholder[];
      setData(data);
      setIsLoading(false);
      setTotalCount(Number(res?.headers?.get('x-total-count')) || data.length);
    };

    return (
      <Table
        {...args}
        headers={
          <Table.Headers isMultipleSorting>
            <Table.HeaderCell sort={{ id: 'id', priority: 2 }}>
              Id
            </Table.HeaderCell>
            <Table.HeaderCell sort={{ id: 'title' }}>title</Table.HeaderCell>
            <Table.HeaderCell sort={{ id: 'userId', priority: 1 }}>
              User id
            </Table.HeaderCell>
            <Table.HeaderCell>Completed</Table.HeaderCell>
          </Table.Headers>
        }
        data={data}
        encode={encode}
        initialPerPage={10}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        persistenceKey="table"
        totalItemsCount={totalCount}
        {...decode()}
      />
    );
  },
  args: {
    children: row => (
      <Table.Row key={row.id} id={row.id}>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.userId}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
      </Table.Row>
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { page: '4', test_page_size: '10', sort: '-id,userId' },
      },
    }),
  },
};

export const Batch: Story = {
  render: ({ data: dataProps, ...args }) => {
    const [pageParams, setPageParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<Todo>(dataProps as Todo[], pageParams);

    return (
      <>
        <Table
          {...args}
          data={slicedData}
          onBatchSelect={console.log}
          onParamsChange={setPageParams}
        />
      </>
    );
  },
  args: {
    data: generateTodos(200),
    totalItemsCount: 200,
    headers: (
      <Table.Headers>
        <Table.HeaderSelectCell />
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
    children: row => (
      <Table.Row key={row.id} id={row.id}>
        <Table.SelectCell id={row.id} />
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.title}</Table.Cell>
        <Table.Cell>{row.completed ? 'completed' : 'not completed'}</Table.Cell>
      </Table.Row>
    ),
  },
  decorators: [
    (Story, { args }) => {
      const [isOpened, setIsOpened] = useState(false);

      return (
        <div>
          <Story
            args={{
              ...args,
              batch: {
                actions: () => (
                  <Table.BatchActions.Actions>
                    <Table.BatchActions.MainActions>
                      <Table.BatchActions.Action
                        onClick={console.log}
                        startIcon="CircleHelp"
                      >
                        Action 1
                      </Table.BatchActions.Action>
                      <Table.BatchActions.Action
                        onClick={() => setIsOpened(true)}
                        startIcon="CircleHelp"
                        withResetOnClick={false}
                      >
                        Action 2
                      </Table.BatchActions.Action>
                      <Table.BatchActions.MoreActions
                        actions={
                          <Dropdown.Content>
                            <Dropdown.Button
                              icon="Add"
                              onClick={console.log}
                              size="small"
                            >
                              Add
                            </Dropdown.Button>

                            <Dropdown.Button
                              icon="AddComment"
                              onClick={console.log}
                              size="small"
                            >
                              Comment
                            </Dropdown.Button>
                          </Dropdown.Content>
                        }
                      />
                    </Table.BatchActions.MainActions>
                    <Table.BatchActions.AsideActions>
                      <Table.BatchActions.Action
                        onClick={console.log}
                        startIcon="Delete"
                        type="danger"
                      >
                        Delete
                      </Table.BatchActions.Action>
                    </Table.BatchActions.AsideActions>
                  </Table.BatchActions.Actions>
                ),
              },
            }}
          />
          <Modal
            content={
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>modal title</Modal.Title>
                  <Modal.Close />
                </Modal.Header>
                <Modal.Body>content </Modal.Body>
              </Modal.Content>
            }
            isOpened={isOpened}
            setIsOpened={setIsOpened}
          />
        </div>
      );
    },
  ],
};

export const BatchWithDelete: Story = {
  render: () => {
    const [tableData, setTableData] = useState(generateTodos(200) as Todo[]);

    const DeleteAction = ({ row }: { row: Todo }) => {
      const { deleteItem } = useBatchSelection();

      const handleDeleteClick = (todo: Todo) => {
        const id = todo.id.toString();
        const filteredData = tableData.filter(item => item.id !== todo.id);

        deleteItem(id);
        setTableData(filteredData);
      };

      return (
        <ButtonIcon
          icon="Delete"
          onClick={() => handleDeleteClick(row)}
          variant="ghosted"
        />
      );
    };

    return (
      <>
        <Table
          batch={{
            actions: () => (
              <Table.BatchActions.Actions>
                <Table.BatchActions.MainActions>
                  <Table.BatchActions.Action
                    onClick={console.log}
                    startIcon="Delete"
                    type="danger"
                  >
                    Delete
                  </Table.BatchActions.Action>
                </Table.BatchActions.MainActions>
              </Table.BatchActions.Actions>
            ),
          }}
          headers={
            <Table.Headers>
              <Table.HeaderSelectCell />
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Completed</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Headers>
          }
          data={tableData}
          onBatchSelect={console.log}
          persistenceKey="table"
          totalItemsCount={tableData.length}
        >
          {row => (
            <Table.Row key={row.id} id={row.id}>
              <Table.SelectCell id={row.id} />
              <Table.Cell>{row.id}</Table.Cell>
              <Table.Cell>{row.title}</Table.Cell>
              <Table.Cell>
                {row.completed ? 'completed' : 'not completed'}
              </Table.Cell>
              <Table.Cell>
                <DeleteAction key={row.id} row={row} />
              </Table.Cell>
            </Table.Row>
          )}
        </Table>
      </>
    );
  },
};

export const WithTabs: Story = {
  render: args => {
    const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();

    const fetchData = async () => {
      if (!loadMoreParams) return;

      const res = await fetch(
        `/todos-empty?page=${loadMoreParams.page}&page_size=${loadMoreParams.perPage}`,
      );
      return await res.json();
    };

    const { data, isLoading } = useQuery({
      queryKey: ['todos', loadMoreParams?.page, loadMoreParams?.perPage],
      queryFn: fetchData,
      staleTime: Infinity,
      enabled: !!loadMoreParams,
    });

    return (
      <Tabs>
        <Tabs.TitleList>
          <Tabs.Title icon="Add">title 1</Tabs.Title>
          <Tabs.Title icon="Add">title 2</Tabs.Title>
        </Tabs.TitleList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <Table
              {...args}
              data={data?.results}
              isLoading={isLoading}
              onParamsChange={setLoadMoreParams}
              onReady={setLoadMoreParams}
              totalItemsCount={data?.count}
            />
          </Tabs.Panel>
          <Tabs.Panel>panel 2</Tabs.Panel>
        </Tabs.PanelList>
      </Tabs>
    );
  },
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>header 1</Table.HeaderCell>
        <Table.HeaderCell>header 2</Table.HeaderCell>
        <Table.HeaderCell>header 3</Table.HeaderCell>
      </Table.Headers>
    ),
  },
};

const Todos = () => {
  const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();

  const fetchData = async () => {
    if (!loadMoreParams) return;

    const res = await fetch(
      `/todos?page=${loadMoreParams.page}&page_size=${loadMoreParams.perPage}`,
    );
    return await res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['todos', loadMoreParams?.page, loadMoreParams?.perPage],
    queryFn: fetchData,
    staleTime: Infinity,
    enabled: !!loadMoreParams,
  });

  return (
    <Table<Todo>
      headers={
        <Table.Headers>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Headers>
      }
      data={data?.results}
      isLoading={isLoading}
      onParamsChange={setLoadMoreParams}
      onReady={setLoadMoreParams}
      persistenceKey="table"
      totalItemsCount={data?.count}
    >
      {row => (
        <Table.Row key={row.id} id={row.id}>
          <Table.Cell>{row.id}</Table.Cell>
          <Table.Cell>{row.title}</Table.Cell>
          <Table.Cell>
            {row.completed ? 'completed' : 'not completed'}
          </Table.Cell>
        </Table.Row>
      )}
    </Table>
  );
};

export const WithRouter: Story = {
  render: () => {
    return (
      <Stack direction="column" gap={7}>
        <Stack gap={7}>
          <LinkInternal data-testid="link-todos" to="/todos">
            Todos
          </LinkInternal>
          <LinkInternal data-testid="link-empty" to="/empty">
            Todos empty
          </LinkInternal>
        </Stack>

        <Outlet />
      </Stack>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/todos',
      },
      routing: reactRouterOutlets([
        {
          path: '/todos',
          Component: () => <Todos />,
        },
        {
          path: '/empty',
          element: 'empty',
        },
      ]),
    }),
  },
};

export const WithCellActions: Story = {
  args: {
    layout: 'auto',
    children: row => {
      const domain = `http://${faker.internet.domainName()}`;

      return (
        <Table.Row key={row.id} id={row.id}>
          <Table.Cell>{row.id}</Table.Cell>
          <Table.Cell
            actions={
              <FloatingActions.Content>
                <FloatingActions.Actions>
                  <FloatingActions.CopyToClipboard clipText={row.title} />
                  <FloatingActions.Button
                    icon="CircleHelp"
                    onClick={() => alert(`Help for ${row.title}`)}
                  />
                </FloatingActions.Actions>
              </FloatingActions.Content>
            }
            data-testid="cell-actions"
          >
            {row.title}
          </Table.Cell>
          <Table.Cell
            actions={
              <FloatingActions.Content>
                <FloatingActions.Actions>
                  <FloatingActions.Link to={domain} />
                  <FloatingActions.CopyToClipboard clipText={domain} />
                </FloatingActions.Actions>
              </FloatingActions.Content>
            }
          >
            <LinkExternal to={domain} withIcon={false}>
              {domain}
            </LinkExternal>
          </Table.Cell>
          <Table.Cell>
            {row.completed ? 'completed' : 'not completed'}
          </Table.Cell>
        </Table.Row>
      );
    },
    data: generateTodos(25),
    totalItemsCount: 25,
  },
  decorators: [
    Story => (
      <Toastr>
        <Story />
      </Toastr>
    ),
  ],
};

export const WithCellActionsAndEllipsis: Story = {
  args: {
    layout: 'fixed',
    children: row => {
      const domain = `http://${faker.internet.domainName()}`;

      return (
        <Table.Row key={row.id} id={row.id}>
          <Table.Cell width={50}>{row.id}</Table.Cell>
          <Table.Cell
            actions={
              <FloatingActions.Content>
                <FloatingActions.Header>{row.title}</FloatingActions.Header>
                <FloatingActions.Actions>
                  <FloatingActions.CopyToClipboard clipText={row.title} />
                  <FloatingActions.Button
                    icon="CircleHelp"
                    onClick={() => alert(`Help for ${row.title}`)}
                  />
                </FloatingActions.Actions>
              </FloatingActions.Content>
            }
            data-testid="cell-actions"
            width={300}
          >
            <OverflownText isDisabled>{row.title}</OverflownText>
          </Table.Cell>
          <Table.Cell width={300}>
            <OverflownText>{row.title}</OverflownText>
          </Table.Cell>
          <Table.Cell
            actions={
              <FloatingActions.Content>
                <FloatingActions.Header>{domain}</FloatingActions.Header>
                <FloatingActions.Actions>
                  <FloatingActions.Link to={domain} />
                  <FloatingActions.CopyToClipboard clipText={domain} />
                </FloatingActions.Actions>
              </FloatingActions.Content>
            }
            width={200}
          >
            <OverflownLink to={domain} withIcon={false} isDisabled>
              {domain}
            </OverflownLink>
          </Table.Cell>
          <Table.Cell>
            {row.completed ? 'completed' : 'not completed'}
          </Table.Cell>
        </Table.Row>
      );
    },
    data: generateTodos(25),
    totalItemsCount: 25,
  },
  decorators: [
    Story => (
      <Toastr>
        <Story />
      </Toastr>
    ),
  ],
};

export const EventPropagation: Story = {
  args: {
    layout: 'fixed',
    data: generateTodos(10),
    initialPerPage: 10,
    totalItemsCount: 10,
    children: item => (
      <Table.Row key={item.id} id={item.id} onClick={() => alert('alert')}>
        <Table.Cell>{item.title}</Table.Cell>
        <Table.Cell width={250}>
          <OverflownText>{item.title}</OverflownText>
        </Table.Cell>
        <Table.Cell>
          <DateTimeAbsolute date={faker.date.anytime()} />
        </Table.Cell>
      </Table.Row>
    ),
  },
};

export const NoWrap: Story<User> = {
  args: {
    data: generateUsers(10),
    totalItemsCount: 10,
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell noWrap>First name</Table.HeaderCell>
        <Table.HeaderCell noWrap>Last name</Table.HeaderCell>
        <Table.HeaderCell noWrap>Birth date</Table.HeaderCell>
      </Table.Headers>
    ),
    children: user => (
      <Table.Row key={user.id} id={user.id}>
        <Table.Cell>{user.id}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.firstname}</Table.Cell>
        <Table.Cell>{user.lastname}</Table.Cell>
        <Table.Cell>
          <DateTimeRelative date={faker.date.birthdate()} whiteSpace="nowrap" />
        </Table.Cell>
      </Table.Row>
    ),
  },
};

export const WithInfiniteQuery: Story = {
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
    loadMoreType: 'infiniteScroll',
  },
  decorators: [
    (Story, { args }) => {
      const fetchData = async (
        page = 1,
      ): Promise<PaginatedApiResponse<Todo>> => {
        const res = await fetch(`/todos?page=${page}&page_size=25`);
        return res.json();
      };

      const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
      } = useInfiniteQuery<PaginatedApiResponse<Todo>>({
        queryKey: ['todos'],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        getNextPageParam: lastPage => lastPage.next,
      });

      return (
        <Story
          args={{
            ...args,
            data: data?.pages.flatMap(item => item.results),
            isLoading: isLoading || isFetchingNextPage,
            onParamsChange: () => fetchNextPage(),
            totalItemsCount: data?.pages[0].count,
            hasNextPage,
          }}
        />
      );
    },
  ],
};

export const WithSearch: Story = {
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
  },
  decorators: [
    (Story, { args }) => {
      const [search, setSearch] = useState('');
      const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();
      const debouncedSetSearch = useDebouncedCallback(setSearch);

      const fetchData = async () => {
        if (!loadMoreParams) return;

        const res = await fetch(
          `/todos-search?term=${search}&page=${loadMoreParams.page}&page_size=${loadMoreParams.perPage}`,
        );
        return await res.json();
      };

      const { data, isLoading } = useQuery({
        queryKey: [
          'todos',
          loadMoreParams?.page,
          loadMoreParams?.perPage,
          search,
        ],
        queryFn: fetchData,
        enabled: !!loadMoreParams,
      });

      return (
        <>
          <SearchBar onChange={debouncedSetSearch} />
          <Story
            args={{
              ...args,
              data: data?.results,
              totalItemsCount: data?.count,
              isLoading,
              onReady: setLoadMoreParams,
              onParamsChange: setLoadMoreParams,
            }}
          />
        </>
      );
    },
  ],
};

export const WithInfiniteQueryEmpty: Story = {
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
    loadMoreType: 'infiniteScroll',
  },
  decorators: [
    (Story, { args }) => {
      const fetchData = async (
        page = 1,
      ): Promise<PaginatedApiResponse<Todo>> => {
        const res = await fetch(`/todos-empty?page=${page}&page_size=25`);
        return res.json();
      };

      const { data, isLoading, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery<PaginatedApiResponse<Todo>>({
          queryKey: ['todos'],
          queryFn: ({ pageParam }) => fetchData(pageParam),
          getNextPageParam: lastPage => lastPage.next,
        });

      return (
        <Story
          args={{
            ...args,
            data: data?.pages.flatMap(item => item.results),
            isLoading: isLoading || isFetchingNextPage,
            onParamsChange: () => fetchNextPage(),
            totalItemsCount: data?.pages[0].count,
          }}
        />
      );
    },
  ],
};

export const WithSelectCellField: Story = {
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
    data: generateTodos(10),
    totalItemsCount: 10,
    children: todo => (
      <Table.Row key={todo.id} id={todo.id}>
        <Table.SelectCell id={todo.id} />
        <Table.Cell>{todo.id}</Table.Cell>
        <Table.Cell>{todo.title}</Table.Cell>
        <Table.Cell>
          {todo.completed ? 'completed' : 'not completed'}
        </Table.Cell>
      </Table.Row>
    ),
  },
  decorators: [
    Story => {
      const [form] = useForm();

      return (
        <Form onFinish={console.log}>
          <Story />

          <Form.Actions form={form} />
        </Form>
      );
    },
  ],
};

export const WithSearchInfinite: Story = {
  args: {
    headers: (
      <Table.Headers>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
      </Table.Headers>
    ),
    loadMoreType: 'infiniteScroll',
  },
  decorators: [
    (Story, { args }) => {
      const [search, setSearch] = useState('');
      const debouncedSetSearch = useDebouncedCallback(setSearch);

      const fetchData = async (
        page = 1,
      ): Promise<PaginatedApiResponse<Todo>> => {
        const res = await fetch(
          `/todos-search?page=${page}&page_size=25&term=${search}`,
        );
        return res.json();
      };

      const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
      } = useInfiniteQuery<PaginatedApiResponse<Todo>>({
        queryKey: ['todos', search],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        getNextPageParam: lastPage => lastPage.next,
      });

      return (
        <Stack direction="column" gap={4}>
          <SearchBar isLoading={isLoading} onChange={debouncedSetSearch} />{' '}
          <Story
            args={{
              ...args,
              data: data?.pages.flatMap(item => item.results),
              isLoading: isLoading || isFetchingNextPage,
              onParamsChange: () => fetchNextPage(),
              totalItemsCount: data?.pages[0].count,
              hasNextPage,
            }}
          />
        </Stack>
      );
    },
  ],
};

export const TableWithResizableColumns: Story = {
  args: {
    persistenceKey: 'resizableTable',
    isResizable: true,
    elasticColumnKey: 'title',
  },
  decorators: [
    (Story, { args }) => {
      const [data, setData] = useState<Todo[]>([]);
      const [columns, setColumns] = useState<TableColumn<Todo>[]>([
        {
          key: 'id',
          header: () => (
            <Table.HeaderSelectCell
              settings={{
                columnKey: 'id',
                columnPinConfig: {
                  isPinned: true,
                  direction: 'left',
                },
              }}
            />
          ),
          render: todo => <Table.SelectCell columnKey="id" id={todo.id} />,
        },
        {
          key: 'title',
          header: () => (
            <Table.HeaderCell
              settings={{
                columnKey: 'title',
                columnPinConfig: {
                  direction: 'left',
                  userCanPin: true,
                },
              }}
            >
              Title
            </Table.HeaderCell>
          ),
          render: todo => (
            <Table.Cell columnKey="title" maxWidth={300}>
              <OverflownText>{`${todo.title} ${todo.title} ${todo.title} ${todo.title}`}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'completed',
          header: 'Completed',
          render: todo => (
            <Table.Cell>
              <OverflownText>
                {todo.completed ? 'Completed' : 'Not completed'}
              </OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'action',
          header: () => (
            <Table.HeaderCell
              settings={{
                columnKey: 'action',
                columnPinConfig: {
                  direction: 'right',
                  isPinned: true,
                },
              }}
            >
              Action
            </Table.HeaderCell>
          ),
          render: todo => (
            <Table.Actions columnKey="action">{todo.id}</Table.Actions>
          ),
        },
        {
          key: 'title2',
          header: () => (
            <Table.HeaderCell
              maxWidth="10ch"
              settings={{ columnKey: 'title2' }}
            >
              Title 2
            </Table.HeaderCell>
          ),
          render: todo => (
            <Table.Cell columnKey="title2">
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'title3',
          header: () => (
            <Table.HeaderCell
              settings={{
                columnKey: 'title3',
                columnPinConfig: {
                  direction: 'right',
                  userCanPin: true,
                },
              }}
            >
              Title 3
            </Table.HeaderCell>
          ),
          render: todo => (
            <Table.Cell columnKey="title3">
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'title4',
          header: () => (
            <Table.HeaderCell
              settings={{
                columnKey: 'title4',
                columnPinConfig: {
                  direction: 'right',
                  userCanPin: true,
                },
              }}
            >
              Title 4
            </Table.HeaderCell>
          ),
          render: todo => (
            <Table.Cell columnKey="title4">
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'title5',
          header: 'Title 5',
          render: todo => (
            <Table.Cell>
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'title6',
          header: 'Title 6',
          render: todo => (
            <Table.Cell>
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'title7',
          header: 'Title 7',
          render: todo => (
            <Table.Cell>
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
        {
          key: 'title8',
          header: () => (
            <Table.HeaderCell
              settings={{
                columnKey: 'title8',
                columnPinConfig: {
                  isPinned: true,
                  direction: 'right',
                },
              }}
            >
              Title 8
            </Table.HeaderCell>
          ),
          render: todo => (
            <Table.Cell columnKey="title8">
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        },
      ]);

      useEffect(() => {
        setTimeout(() => {
          setData(generateTodos(4));
        }, 500);
      }, []);

      const addNewColumn = () => {
        const newColumn = {
          key: 'aaa',
          header: () => (
            <Table.HeaderCell minWidth={300}>New Title</Table.HeaderCell>
          ),
          render: (todo: Todo) => (
            <Table.Cell>
              <OverflownText>{todo.title}</OverflownText>
            </Table.Cell>
          ),
        };
        if (columns !== undefined) {
          setColumns([...columns, newColumn]);
        }
      };

      return (
        <Stack direction="column">
          <ButtonIcon icon="Add" onClick={addNewColumn} />

          <Story
            args={{
              ...args,
              children: undefined,
              data,
              headers: undefined,
              columns,
            }}
          />
        </Stack>
      );
    },
  ],
};

export const TableWithPinnedColumns: Story = {
  args: {
    persistenceKey: 'pinnedColumnsTable',
    onRowClick: todo => {
      console.log('click!');
      console.log('todo', todo);
    },
    onRowDoubleClick: todo => {
      console.log('double click!');
      console.log('todo', todo);
    },
    columns: [
      {
        key: 'id',
        header: () => (
          <Table.HeaderCell
            settings={{
              columnKey: 'id',
              columnPinConfig: {
                isPinned: true,
                direction: 'left',
              },
            }}
          >
            Id
          </Table.HeaderCell>
        ),
        render: todo => <Table.Cell columnKey="id">{todo.id}</Table.Cell>,
      },
      {
        key: 'title',
        header: () => (
          <Table.HeaderCell
            settings={{
              columnKey: 'title',
              columnPinConfig: {
                direction: 'left',
                userCanPin: true,
              },
            }}
          >
            Title
          </Table.HeaderCell>
        ),
        render: todo => (
          <Table.Cell columnKey="title" maxWidth={300}>
            <OverflownText>{`${todo.title} ${todo.title} ${todo.title} ${todo.title}`}</OverflownText>
          </Table.Cell>
        ),
      },
      {
        key: 'completed',
        header: () => (
          <Table.HeaderCell
            settings={{
              columnKey: 'completed',
              columnPinConfig: {
                direction: 'right',
                userCanPin: true,
              },
            }}
          >
            Title
          </Table.HeaderCell>
        ),
        render: todo => (
          <Table.Cell columnKey="completed">
            <OverflownText>
              {todo.completed ? 'Completed' : 'Not completed'}
            </OverflownText>
          </Table.Cell>
        ),
      },
      {
        key: 'title2',
        header: () => (
          <Table.HeaderCell
            settings={{
              columnKey: 'title2',
              columnPinConfig: {
                direction: 'left',
                userCanPin: true,
              },
            }}
          >
            Title2
          </Table.HeaderCell>
        ),
        render: todo => (
          <Table.Cell columnKey="title2" maxWidth={300}>
            <OverflownText>{`${todo.title} ${todo.title} ${todo.title} ${todo.title}`}</OverflownText>
          </Table.Cell>
        ),
      },
      {
        key: 'title3',
        header: () => (
          <Table.HeaderCell
            settings={{
              columnKey: 'title3',
              columnPinConfig: {
                direction: 'left',
                userCanPin: true,
              },
            }}
          >
            Title3
          </Table.HeaderCell>
        ),
        render: todo => (
          <Table.Cell columnKey="title3" maxWidth={300}>
            <OverflownText>{`${todo.title} ${todo.title} ${todo.title} ${todo.title}`}</OverflownText>
          </Table.Cell>
        ),
      },
    ],
  },
  decorators: [
    (Story, { args }) => {
      const [data, setData] = useState<Todo[]>([]);

      useEffect(() => {
        setTimeout(() => {
          setData(generateTodos(4));
        }, 500);
      }, []);

      return (
        <Stack direction="column">
          <Story
            args={{
              ...args,
              children: undefined,
              data,
              headers: undefined,
            }}
          />
        </Stack>
      );
    },
  ],
};
