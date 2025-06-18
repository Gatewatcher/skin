import { faker } from '@faker-js/faker/locale/fr';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import type { ApiError, PaginatedApiResponse, User } from '@/mocks/types';
import { Link } from '@/skin/actions';
import { Card } from '@/skin/displays';
import { Form, Input } from '@/skin/forms';
import type { ListField } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { DEFAULT_REPEAT_AUTO, GRID_REPEAT } from '@/skin/layout/Grid/constants';
import { useEncodeUrl, usePagination } from '@/skin/pagination';
import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from '@/skin/pagination/ItemsPerPage/constants';
import {
  DEFAULT_INITIAL_PER_PAGE,
  DEFAULT_LOAD_MORE_TYPE,
  LOAD_MORE_TYPES,
} from '@/skin/pagination/LoadMore/constants';
import { useDecodeUrl } from '@/skin/pagination/LoadMore/hooks';
import type { LoadMoreParams } from '@/skin/pagination/LoadMore/types';
import { Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { ListProps } from '.';
import List from '.';
import { useSort } from '../Listing/hooks';
import type { DataItem } from '../Listing/types';

faker.seed(42);

const generateData = (count = 100): User[] =>
  range({ stop: count }).map((_, id) => {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();

    return {
      id,
      firstname,
      lastname,
      avatar: faker.internet.avatar(),
      age: faker.number.int({ min: 1, max: 99 }),
      email: faker.internet.email({ firstName: firstname, lastName: lastname }),
    };
  });

type Story = StoryObj<typeof List<User>>;

export default {
  title: 'listings/List',
  component: List,
  args: {
    gap: 12,
    emptyMessage: 'EMPTY DATA',
    loadMoreType: DEFAULT_LOAD_MORE_TYPE,
    onParamsChange: undefined,
    columnsMinSize: '300px',
    perPage: DEFAULT_INITIAL_PER_PAGE,
    repeatAuto: DEFAULT_REPEAT_AUTO,
    error: 'Some error message',
    onReady: () => {},
    children: row => (
      <Stack key={row.email} alignItems="center" gap={8}>
        <div
          style={{
            height: 48,
            width: 48,
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            flexShrink: 0,
          }}
        />

        <Stack direction="column">
          <Text>
            {row.firstname} {row.lastname}
          </Text>
          <Link to={`mailto:${row.email}`}>{row.email}</Link>
        </Stack>
      </Stack>
    ),
  },
  argTypes: {
    ...addInlineRadio<ListProps<DataItem>>('loadMoreType', LOAD_MORE_TYPES),
    ...addInlineRadio<ListProps<DataItem>>('repeatAuto', GRID_REPEAT),
    ...addInlineRadio<ListProps<DataItem>>(
      'initialPerPage',
      DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    ),
  },
  decorators: [withRouter],
} as Meta<typeof List<User>>;

export const Default: Story = {
  render: ({ data, ...args }) => {
    const [pageParams, setParams] = useState<LoadMoreParams>();

    const slicedData = usePagination(data as User[], pageParams);

    return <List {...args} data={slicedData} onParamsChange={setParams} />;
  },
  args: {
    data: generateData(100),
    totalItemsCount: 100,
  },
};

export const WithListItem: Story = {
  args: {
    data: generateData(10),
    columns: 1,
    columnsMinSize: undefined,
    gap: 0,
    children: row => (
      <List.Item key={row.id}>
        <Stack direction="column">
          <Text>
            {row.firstname} {row.lastname}
          </Text>
          <Link to={`mailto:${row.email}`}>{row.email}</Link>
        </Stack>
      </List.Item>
    ),
  },
};

export const WithActiveListItem: Story = {
  args: {
    data: generateData(10),
    columns: 1,
    columnsMinSize: undefined,
    gap: 0,
    children: row => (
      <List.Item active={row.firstname === 'Emmelie'}>
        <Stack direction="column">
          <Text>
            {row.firstname} {row.lastname}
          </Text>
          <Link to={`mailto:${row.email}`}>{row.email}</Link>
        </Stack>
      </List.Item>
    ),
  },
};

export const WithoutPagination: Story = {
  args: {
    initialPerPage: 0,
    data: generateData(100),
  },
};

export const WithFetchPagination: Story = {
  render: args => {
    const [data, setData] = useState<User[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async ({ page, perPage }: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(`/users?page=${page}&page_size=${perPage}`);
      const data = (await res.json()) as PaginatedApiResponse<User>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <List
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
  },
};

export const WithForm: Story = {
  args: {
    data: generateData(10),
    initialPerPage: 0,
    children: row => <WithFormChildren {...row} />,
  },
};

const WithFormChildren = (row: User) => {
  return (
    <Form>
      <Form.Field initialValue={row.firstname} name="username">
        <Input.Text placeholder="username" />
      </Form.Field>
    </Form>
  );
};

export const WithFormList: Story = {
  render: args => {
    return (
      <Form onValuesChange={(_, values) => console.log(values)}>
        <Form.List initialValue={args.data} name="users">
          {(fields: ListField[]) => {
            return (
              <List {...args}>
                {(row, { index }) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { key, ...field } = fields[index];
                  return (
                    <Stack key={row.email} gap={10}>
                      <Form.Field {...field} name={[field.name, 'firstname']}>
                        <Input.Text />
                      </Form.Field>

                      <Form.Field {...field} name={[field.name, 'email']}>
                        <Input.Text />
                      </Form.Field>
                    </Stack>
                  );
                }}
              </List>
            );
          }}
        </Form.List>
      </Form>
    );
  },
  args: {
    data: generateData(4),
    columnsMinSize: undefined,
    columns: 1,
  },
};

export const WithFetch: Story = {
  render: args => {
    const [data, setData] = useState<User[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(
        `/users?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = (await res.json()) as PaginatedApiResponse<User>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <List
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
  },
};

export const WithFetchInfinite: Story = {
  render: args => {
    const [allData, setAllData] = useState<User[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(
        `/users?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = (await res.json()) as PaginatedApiResponse<User>;
      console.log(data, allData);
      setAllData(prevData => [...(prevData || []), ...data.results]);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <List
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
    data: [],
    loadMoreType: 'infiniteScroll',
  },
};

export const WithReactQuery: Story = {
  render: args => {
    const [params, setParams] = useState<LoadMoreParams>();

    const fetchData = async () => {
      if (!params) return;

      const res = await fetch(
        `/users?page=${params.page}&page_size=${params.perPage}`,
      );
      return await res.json();
    };

    const { data, isLoading } = useQuery({
      queryKey: ['users', params?.page, params?.perPage],
      queryFn: fetchData,
      staleTime: Infinity,
      enabled: !!params,
    });

    return (
      <List
        {...args}
        data={data?.results}
        isLoading={isLoading}
        onParamsChange={setParams}
        onReady={setParams}
        totalItemsCount={data?.count}
      />
    );
  },
  args: {
    data: [],
  },
};

export const FetchEmpty: Story = {
  render: args => {
    const [data, setData] = useState<User[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (params: LoadMoreParams) => {
      setIsLoading(true);
      const res = await fetch(
        `/users-empty?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = (await res.json()) as PaginatedApiResponse<User>;
      setData(data.results);
      setIsLoading(false);
      setTotalCount(data.count);
    };

    return (
      <List
        {...args}
        columns={3}
        data={data}
        isLoading={isLoading}
        onParamsChange={fetchData}
        onReady={fetchData}
        totalItemsCount={totalCount}
      />
    );
  },
  args: {
    data: undefined,
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    data: [],
    columnsMinSize: '400px',
    repeatAuto: 'fill',
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
        `/users-error?page=${params.page}&page_size=${params.perPage}`,
      );
      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return data;
    };

    const { data, isLoading, isError, error } = useQuery<
      PaginatedApiResponse<User>,
      ApiError
    >({
      queryKey: ['todos', params?.page],
      queryFn: fetchData,
      staleTime: Infinity,
      retry: false,
    });

    return (
      <List
        {...args}
        error={error?.detail}
        isError={isError}
        isLoading={isLoading}
        onParamsChange={setParams}
        totalItemsCount={data?.count}
      />
    );
  },
};

export const WithPersistence: Story = {
  render: ({ data, ...args }) => {
    const [params, setParams] = useState<LoadMoreParams>();

    const slicedData = usePagination<User>(data as User[], params);
    const sortedData = useSort<User>(slicedData as User[], params?.sort?.[0]);

    const encode = useEncodeUrl();
    const decode = useDecodeUrl();

    return (
      <List
        {...args}
        data={sortedData}
        encode={encode}
        onParamsChange={setParams}
        onReady={setParams}
        {...decode()}
      />
    );
  },
  args: {
    data: generateData(200),
    totalItemsCount: 200,
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

export const WithCards: Story = {
  args: {
    data: generateData(3),
    children: item => (
      <Card key={item.id}>
        <Card.Header>
          <Card.Title>{`${item.firstname} ${item.lastname}`}</Card.Title>
        </Card.Header>
        <Card.Body>{faker.lorem.paragraphs({ min: 1, max: 3 })}</Card.Body>
        <Card.Footer>{item.email}</Card.Footer>
      </Card>
    ),
  },
};
