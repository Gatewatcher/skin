import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { Todo } from '@/mocks/types';
import { Illustration } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import type { TableColumn } from '@/skin/listings';
import { Table } from '@/skin/listings';
import { OverflownText, Text } from '@/skin/typography';

import type { DropzoneProps } from '.';
import Dropzone from '.';

type Story = StoryObj<typeof Dropzone>;

const chatGPTSupportedFiles = {
  'text/x-c': ['.c'],
  'text/x-c++': ['.cpp'],
  'text/x-csharp': ['.cs'],
  'text/css': ['.css'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'text/x-golang': ['.go'],
  'text/html': ['.html'],
  'text/x-java': ['.java'],
  'text/javascript': ['.js'],
  'application/json': ['.json'],
  'text/markdown': ['.md'],
  'application/pdf': ['.pdf'],
  'text/x-php': ['.php'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
    '.pptx',
  ],
  'text/x-python': ['.py'],
  'text/x-ruby': ['.rb'],
  'application/x-sh': ['.sh'],
  'text/x-tex': ['.tex'],
  'application/typescript': ['.ts'],
  'text/plain': ['.txt'],
};

function generateTodos<Todo>(count = 100): Todo[] {
  return range({ stop: count }).map(nb => ({
    id: nb,
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean(),
  })) as Todo[];
}

export default {
  title: 'forms/inputs/Dropzone',
  component: Dropzone,
  args: {
    onDrop: files => {
      console.log(files);
    },
  },
} as Meta<typeof Dropzone>;

const Template: StoryFn<typeof Dropzone> = (args: DropzoneProps) => {
  return <Dropzone {...args} />;
};

export const Default: Story = {
  render: Template,
};

export const WithExtraElements: Story = {
  render: Template,
  args: {
    innerOptions: {
      startElement: <Text data-testid="start">Start element</Text>,
      endElement: <Text data-testid="end">End element</Text>,
    },
  },
};

export const WithAccept: Story = {
  render: Template,
  args: {
    accept: chatGPTSupportedFiles,
    maxSize: 5000000,
  },
};

const TableColumns: TableColumn<Todo>[] = [
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
        <OverflownText>{todo.title}</OverflownText>
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
];

export const WithTable: Story = {
  render: Template,
  args: {
    accept: chatGPTSupportedFiles,
    maxSize: 5000000,
    withDropAnimation: true,
    innerComponent: (
      <Table columns={TableColumns} data={generateTodos(4) as Todo[]} />
    ),
  },
};

export const WithFullScreenDropzone: Story = {
  render: Template,
  args: {
    accept: chatGPTSupportedFiles,
    maxSize: 5000000,
    withFullScreenDropzone: true,
    withDropAnimation: true,
    innerComponent: (
      <Table columns={TableColumns} data={generateTodos(4) as Todo[]} />
    ),
  },
};

export const WithCenteredAnimation: Story = {
  render: Template,
  args: {
    accept: chatGPTSupportedFiles,
    maxSize: 5000000,
    withDropAnimation: true,
    innerComponent: (
      <Table columns={TableColumns} data={generateTodos(40) as Todo[]} />
    ),
    dropAnimationOptions: {
      position: 'center',
    },
  },
};

export const WithEmptyTable: Story = {
  render: Template,
  args: {
    accept: chatGPTSupportedFiles,
    maxSize: 5000000,
    withDropAnimation: true,
    innerComponent: (
      <Table
        emptyElement={
          <Stack alignItems="center" direction="column" justifyContent="center">
            <Dropzone.Instructions
              startElement={<Illustration name="FileUploading" size="large" />}
            />
          </Stack>
        }
        columns={TableColumns}
        data={[] as Todo[]}
      />
    ),
  },
};
