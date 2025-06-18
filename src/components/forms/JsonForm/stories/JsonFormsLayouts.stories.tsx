import type { Meta, StoryObj } from '@storybook/react';

import type { FormProps } from '@/skin/forms';
import { Form } from '@/skin/forms';
import { FormStore } from '@/skin/forms/Form/FormStore';
import { Stack } from '@/skin/layout';

import type { JsonFormProps } from '../index';
import JsonForm from '../index';
import { controlElement, layoutElement } from '../utils';

type JsonFormsAndFormArgs = JsonFormProps & Pick<FormProps, 'onFinish'>;

const meta = {
  title: 'forms/JsonForm/layouts',
  component: JsonForm,
  render: ({ onFinish, ...args }) => {
    const formStore = new FormStore(() => {});
    const form = formStore.getForm();

    return (
      <Form initialValues={{ range: [] }} onFinish={onFinish}>
        <Stack direction="column" gap={8}>
          <JsonForm {...args} />
          <Stack.Item alignSelf="flex-end">
            <Form.Actions form={form} />
          </Stack.Item>
        </Stack>
      </Form>
    );
  },
  args: { readonly: false },
  argTypes: { onFinish: { action: 'finish' } },
} satisfies Meta<JsonFormsAndFormArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Group = {
  args: {
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'GCenter username',
        },
        password: {
          type: 'string',
          format: 'sensitive',
          title: 'GCenter password',
        },
      },
      required: ['username', 'password'],
    },
    uischema: layoutElement({
      type: 'Group',
      label: 'Credentials',
      options: {
        variant: 'primary',
      },
      elements: [
        controlElement({
          type: 'Control',
          scope: '#/properties/username',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/password',
        }),
      ],
    }),
  },
} satisfies Story;

export const HorizontalLayout = {
  args: {
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'GCenter username',
        },
        password: {
          type: 'string',
          format: 'sensitive',
          title: 'GCenter password',
        },
      },
      required: ['username', 'password'],
      title: 'Login and password',
    },
    uischema: layoutElement({
      type: 'HorizontalLayout',
      elements: [
        controlElement({
          type: 'Control',
          scope: '#/properties/username',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/password',
        }),
      ],
    }),
  },
} satisfies Story;

export const VerticalLayout = {
  args: {
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'GCenter username',
        },
        password: {
          type: 'string',
          format: 'sensitive',
          title: 'GCenter password',
        },
      },
      required: ['username', 'password'],
      title: 'Login and password',
    },
    uischema: layoutElement({
      type: 'VerticalLayout',
      elements: [
        controlElement({
          type: 'Control',
          scope: '#/properties/username',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/password',
        }),
      ],
    }),
  },
} satisfies Story;
