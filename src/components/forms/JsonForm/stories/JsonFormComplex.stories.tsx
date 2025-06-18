import type { Meta, StoryObj } from '@storybook/react';

import type { FormProps } from '@/skin/forms';
import { Form } from '@/skin/forms';
import { FormStore } from '@/skin/forms/Form/FormStore';
import { Stack } from '@/skin/layout';

import type { JsonFormProps } from '..';
import JsonForm from '..';
import { controlElement, layoutElement } from '../utils';

type JsonFormsAndFormArgs = JsonFormProps &
  Pick<FormProps, 'initialValues' | 'onFinish'>;

const meta = {
  title: 'forms/JsonForm/complex',
  component: JsonForm,
  render: ({ onFinish, initialValues, ...args }) => {
    const formStore = new FormStore(() => {});
    const form = formStore.getForm();

    return (
      <Form form={form} initialValues={initialValues} onFinish={onFinish}>
        <Stack direction="column" gap={8}>
          <Form.Group name="credentials">
            <JsonForm {...args} form={form} />
          </Form.Group>
          <Stack.Item alignSelf="flex-end">
            <Form.Actions form={form} />
          </Stack.Item>
        </Stack>
      </Form>
    );
  },
  args: { readonly: false, onOptionsChange: () => {} },
  argTypes: { onFinish: { action: 'finish' } },
} satisfies Meta<JsonFormsAndFormArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneOf = {
  args: {
    schema: {
      type: 'object',
      properties: {
        credentials: {
          oneOf: [
            { $ref: '#/definitions/api_key' },
            { $ref: '#/definitions/basic_auth' },
          ],
          description:
            'You must provide either an API token or a username and a password.',
        },
      },
      definitions: {
        api_key: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              format: 'sensitive',
              title: 'GCenter API token',
            },
            timeout: {
              type: 'number',
              title: 'Lifetime of the token',
            },
          },
          required: ['token'],
          title: 'API key',
        },
        basic_auth: {
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
      },
    },
    uischema: layoutElement({
      type: 'VerticalLayout',
      elements: [
        controlElement({
          type: 'Control',
          label: 'Credentials',
          scope: '#/properties/credentials',
        }),
      ],
    }),
  },
} satisfies Story;

export const OneOfWithInitialOptions = {
  args: {
    ...OneOf.args,
    initialOptions: {
      credentials: 'basic_auth',
    },
    initialValues: {
      credentials: {
        username: 'username',
        password: 'password',
      },
    },
  },
} satisfies Story;
