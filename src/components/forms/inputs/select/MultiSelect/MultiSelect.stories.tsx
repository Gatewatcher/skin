import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { MultiValue } from 'react-select';

import type { ChipProps } from '@/skin/displays';
import { AvatarUsername, Chip, ChipCustom } from '@/skin/displays';
import { Text } from '@/skin/typography';
import { addBoolean, addInlineRadio, addNumber } from '@/storybook';

import {
  DEFAULT_LABEL_DIRECTION,
  LABEL_DIRECTIONS,
} from '../../InputBaseLabel/constants';
import {
  DEFAULT_HIDE_SELECTED_OPTIONS,
  DEFAULT_IS_CLEARABLE,
} from '../SelectBase/constants';
import type { Option } from '../SelectBase/types';
import {
  DEFAULT_SELECT_ALL_LABEL,
  DEFAULT_UNSELECT_ALL_LABEL,
  DEFAULT_WITH_SELECT_ALL,
} from './constants';
import type { MultiSelectProps } from './index';
import MultiSelect from './index';

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

type Story<T extends string | number = string> = StoryObj<
  typeof MultiSelect<T>
>;

type StoryWithMeta<T extends string | number = string> = StoryObj<
  typeof MultiSelect<T, PriorityOptionsMeta>
>;

export default {
  title: 'forms/inputs/selects/MultiSelect',
  component: MultiSelect,
  argTypes: {
    ...addNumber('displayMaxItems', { min: -1 }),
    ...addInlineRadio<MultiSelectProps>('labelDirection', LABEL_DIRECTIONS),
    ...addBoolean<MultiSelectProps>('menuIsOpen'),
    ...addBoolean<MultiSelectProps>('isClearable'),
    ...addBoolean<MultiSelectProps>('isError'),
    ...addBoolean<MultiSelectProps>('isLoading'),
    ...addBoolean<MultiSelectProps>('required'),
    ...addBoolean<MultiSelectProps>('isSearchable'),
    ...addBoolean<MultiSelectProps>('menuIsOpen'),
    onChange: { action: 'value changed' },
  },
  args: {
    labelDirection: DEFAULT_LABEL_DIRECTION,
    closeMenuOnSelect: undefined,
    hideSelectedOptions: DEFAULT_HIDE_SELECTED_OPTIONS,
    isClearable: DEFAULT_IS_CLEARABLE,
    label: 'MR tags',
    meta: {
      errors: ['This is an error'],
      helpers: ['These tags will be added to your MR'],
      warnings: ['This is a warning'],
    },
    type: 'neutral',
    name: 'mr-tags',
    options: [...typeOptions, ...priorityOptions],
    placeholder: 'Select tags...',
    withSelectAll: DEFAULT_WITH_SELECT_ALL,
    selectAllLabel: DEFAULT_SELECT_ALL_LABEL,
    unselectAllLabel: DEFAULT_UNSELECT_ALL_LABEL,
    defaultValue: [],
  },
} as Meta<typeof MultiSelect<string>>;

export const Default: Story = {};

export const WithOverflow: Story = {
  args: {
    displayMaxItems: 2,
    defaultValue: [
      ...typeOptions.flatMap(({ options }) => options),
      ...priorityOptions.flatMap(({ options }) => options),
    ],
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
    renderMultivalueLabelAs: ({
      value,
      removeProps: { onClick, onTouchEnd, onMouseDown },
    }) => (
      <StatusExample
        onClose={onClick}
        onCloseButtonMouseDown={onMouseDown}
        onCloseButtonTouchEnd={onTouchEnd}
        size="small"
        status={value}
      />
    ),
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
    renderMultivalueLabelAs: ({
      value,
      removeProps: { onClick, onTouchEnd, onMouseDown },
    }) => (
      <Chip
        onClose={onClick}
        onCloseButtonMouseDown={onMouseDown}
        onCloseButtonTouchEnd={onTouchEnd}
        size="small"
        type="neutral"
      >
        <AvatarUsername size="small" username={value} />
      </Chip>
    ),
    options: users.map(user => ({
      label: user,
      value: user,
    })),
  },
};

export const AllSelected: Story = {
  args: {
    value: [
      ...typeOptions.flatMap(({ options }) => options),
      ...priorityOptions.flatMap(({ options }) => options),
    ],
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

        setOptions((prev = []) => [...prev, option]);
        setValue(
          (prev = []) => [...prev, option] as MultiValue<Option<string>>,
        );
      };

      return (
        <Story
          args={{
            ...args,
            value,
            options,
            onChange: option => setValue(option),
            footer: <Text>footer</Text>,
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

export const ReadonlyMode: Story = {
  args: {
    value: ['priority::high', 'type::bug'],
    readonlyMode: {
      enabled: true,
      variant: 'keyValue',
    },
  },
};

export const WithGroupSelection: Story = {
  args: {
    withSelectableGroup: true,
  },
};
