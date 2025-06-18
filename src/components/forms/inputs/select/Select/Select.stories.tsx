import { useDebouncedCallback } from '@gatewatcher/bistoury/hooks';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { withStopPropagation } from '@/hocs';
import type { PaginatedApiResponse, User } from '@/mocks/types';
import type { ChipProps } from '@/skin/displays';
import {
  AvatarUsername,
  Chip,
  ChipCustom,
  Icon,
  Popover,
} from '@/skin/displays';
import type { SelectOption } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { addBoolean, addInlineRadio } from '@/storybook';

import {
  DEFAULT_LABEL_DIRECTION,
  LABEL_DIRECTIONS,
} from '../../InputBaseLabel/constants';
import {
  DEFAULT_HIDE_SELECTED_OPTIONS,
  DEFAULT_IS_CLEARABLE,
} from '../SelectBase/constants';
import type { SelectProps } from './index';
import Select from './index';

const typeOptions = [
  {
    label: 'type',
    options: [
      { value: 'type::bug', label: 'bug' },
      { value: 'type::feature', label: 'feature' },
      { value: 'type::refactor', label: 'refactor' },
    ],
  },
];

const priorityOptions = [
  {
    label: 'priority',
    options: [
      { value: 'priority::high', label: 'high' },
      { value: 'priority::medium', label: 'medium' },
      { value: 'priority::low', label: 'low' },
    ],
  },
];

const priorityOptionsWithMeta = [
  {
    label: 'priority',
    options: [
      {
        value: 'priority::high',
        label: 'high',
        meta: { color: 'red', backgroundColor: 'black' },
      },
      {
        value: 'priority::medium',
        label: 'medium',
        meta: { color: 'orange', backgroundColor: 'yellow' },
      },
      {
        value: 'priority::low',
        label: 'low',
        meta: { color: 'cyan', backgroundColor: 'blue' },
      },
    ],
  },
];

type PriorityOptionsMeta = {
  color: string;
  backgroundColor: string;
};

type Story<T extends string | number = string> = StoryObj<typeof Select<T>>;

type StoryWithMeta<T extends string | number = string> = StoryObj<
  typeof Select<T, PriorityOptionsMeta>
>;

export default {
  title: 'forms/inputs/selects/Select',
  component: Select,
  argTypes: {
    ...addInlineRadio<SelectProps>('labelDirection', LABEL_DIRECTIONS),
    ...addBoolean<SelectProps>('isClearable'),
    ...addBoolean<SelectProps>('isError'),
    ...addBoolean<SelectProps>('isLoading'),
    ...addBoolean<SelectProps>('required'),
    ...addBoolean<SelectProps>('isSearchable'),
    ...addBoolean<SelectProps>('menuIsOpen'),
    onChange: { action: 'value changed' },
  },
  args: {
    labelDirection: DEFAULT_LABEL_DIRECTION,
    closeMenuOnSelect: undefined,
    hideSelectedOptions: DEFAULT_HIDE_SELECTED_OPTIONS,
    isClearable: DEFAULT_IS_CLEARABLE,
    defaultValue: undefined,
    label: 'MR tags',
    meta: {
      errors: ['This is an error'],
      helpers: ['These tags will be added to your MR'],
      warnings: ['This is a warning'],
    },
    name: 'mr-tags',
    options: [...typeOptions, ...priorityOptions],
    placeholder: 'Select tags...',
  },
} as Meta<typeof Select<string>>;

export const Default: Story = {
  args: {
    footer: <div>footer</div>,
  },
};

const StatusExample = (
  props: { status: 'open' | 'close' } & Omit<ChipProps, 'children'>,
) => {
  const { onClose, status, ...rest } = props;

  const matches: Record<
    'open' | 'close',
    { type: ChipProps['type']; label: string }
  > = {
    open: { type: 'info', label: 'info label' },
    close: { type: 'critical', label: 'close label' },
  };

  const { type, label } = matches[status];

  return (
    <Chip onClose={onClose} type={type} {...rest} size="small">
      {label}
    </Chip>
  );
};

const STATUSES = ['open', 'close'] as const;
type StatusType = typeof STATUSES[number];
export const RenderLabelAs: Story<StatusType> = {
  args: {
    renderLabelAs: ({ value }) => <StatusExample status={value} />,
    options: STATUSES.map(item => ({
      label: item,
      value: item,
    })),
  },
};

const users = ['John Doe', 'Dark Vador', 'Indiana Jones', 'Sarah Connor'];

export const Users: Story = {
  args: {
    renderLabelAs: ({ value }) => <AvatarUsername username={value} />,
    options: users.map(user => ({
      label: user,
      value: user,
    })),
  },
};

export const ValueAsString: Story = {
  args: {
    value: 'type::feature',
  },
};

export const Creatable: Story = {
  args: {
    options: range({ stop: 5 }).map(item => ({
      label: `item ${item}`,
      value: item.toString(),
    })),
  },
  decorators: [
    (Story, { args }) => {
      const [options, setOptions] = useState(args.options);
      const [value, setValue] = useState(args.value);

      const handleCreate = (value: string) => {
        const option = { label: value, value: value };

        setOptions(prev => [...(prev || []), option]);
        setValue(option);
      };

      return (
        <Story
          args={{
            ...args,
            value,
            options,
            onChange: option => setValue(option),
            createOptions: {
              onCreate: handleCreate,
            },
          }}
        />
      );
    },
  ],
};

export const WithMeta: StoryWithMeta = {
  args: {
    options: priorityOptionsWithMeta,
    renderOptionLabelAs: option => {
      return (
        <ChipCustom
          backgroundColor={option.meta.backgroundColor}
          color={option.meta.color}
        >
          {option.label}
        </ChipCustom>
      );
    },
  },
};

export const WithFooter: Story = {
  args: {
    options: users.map(user => ({
      label: user,
      value: user,
    })),
    footer: <div>footer component</div>,
  },
};

export const CreatableAndFooter: Story = {
  args: {
    options: range({ stop: 5 }).map(item => ({
      label: `item ${item}`,
      value: item.toString(),
    })),
    footer: <div>footer component</div>,
  },
  decorators: [
    (Story, { args }) => {
      const [options, setOptions] = useState(args.options);
      const [value, setValue] = useState(args.value);

      const handleCreate = (value: string) => {
        const option = { label: value, value: value };

        setOptions(prev => [...(prev || []), option]);
        setValue(option);
      };

      return (
        <Story
          args={{
            ...args,
            value,
            options,
            onChange: option => setValue(option),
            createOptions: {
              onCreate: handleCreate,
            },
          }}
        />
      );
    },
  ],
};

export const WithChip: Story = {
  args: {
    renderOptionLabelAs: ({ label }) => (
      <Stack alignItems="center" gap={4}>
        <Chip type="blue">{label}</Chip>
        {withStopPropagation(
          <Popover content="edit component here" placement="bottom">
            <Icon name="Edit" />
          </Popover>,
        )}
      </Stack>
    ),
  },
};

export const WithNullValue: Story = {
  args: {
    value: null,
  },
};

export const ReadonlyMode: Story = {
  args: {
    value: 'priority::high',
    readonlyMode: {
      enabled: true,
      variant: 'keyValue',
    },
  },
};

export const Async: Story = {
  render: () => {
    const [term, setTerm] = useState('');
    const setTermDebounced = useDebouncedCallback(setTerm);

    const fetchData = async (
      page = 1,
      term: string,
    ): Promise<PaginatedApiResponse<User>> => {
      const res = await fetch(
        `/users-search?term=${term}&page_size=25&page=${page}`,
      );
      return await res.json();
    };

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useInfiniteQuery({
        queryKey: ['todos', term],
        queryFn: ({ pageParam }) => fetchData(pageParam, term),
        getNextPageParam: lastPage => lastPage.next,
        staleTime: 100_000,
      });

    const options: SelectOption<number>[] =
      data?.pages
        .flatMap(item => item.results)
        .map(item => ({
          label: `${item.firstname} ${item.lastname}`,
          value: item.id,
        })) || [];

    return (
      <Select
        blurInputOnSelect={false}
        hasNextPage={hasNextPage}
        isLoading={isLoading || isFetchingNextPage}
        onInputChange={setTermDebounced}
        onLoadMore={() => fetchNextPage()}
        options={options}
      />
    );
  },
};
