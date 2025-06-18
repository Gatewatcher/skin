import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form, useForm } from '@/skin/forms';

import JsonForm from '..';
import { controlElement, layoutElement } from '../utils';

describe('JsonForm unit tests', () => {
  describe('text controls', () => {
    it('should render a plain text control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                plainText: {
                  type: 'string',
                  description: 'Enter up to 50 characters (optional)',
                  minLength: 1,
                  maxLength: 50,
                  default: 'hello',
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/plainText',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-control');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveAttribute('type', 'text');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveAttribute('minlength', '1');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveAttribute('maxlength', '50');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveValue('hello');
    });

    it('should render an email control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/email',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-control');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveAttribute('type', 'text');
    });

    it("should render a password control with schema.display='sensitive'", async () => {
      render(
        <Form>
          <JsonForm
            schema={
              {
                type: 'object',
                properties: {
                  password: {
                    type: 'string',
                    display: 'sensitive',
                  },
                },
              } as JsonSchema
            }
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/password',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-control');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveAttribute('type', 'text');
    });

    it('should render a password control with UI schema options', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                password: {
                  type: 'string',
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/password',
              options: {
                sensitive: true,
              },
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-control');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('input'),
      ).toHaveAttribute('type', 'text');
    });

    it("should render a multi-line text control with schema.display='long'", async () => {
      render(
        <Form>
          <JsonForm
            schema={
              {
                type: 'object',
                properties: {
                  password: {
                    type: 'string',
                    display: 'long',
                  },
                },
              } as JsonSchema
            }
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/password',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-control');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('textarea'),
      ).toBeVisible();
    });

    it('should render a multi-line text control with UI schema options', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                password: {
                  type: 'string',
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/password',
              options: {
                multi: true,
              },
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-control');
      expect(
        screen.getByTestId('jsonform-string-control').querySelector('textarea'),
      ).toBeVisible();
    });

    it('should render a file control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                log: {
                  type: 'string',
                  format: 'file',
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/log',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-file-control');
      expect(
        screen.getByTestId('jsonform-file-control').querySelector('input'),
      ).toHaveAttribute('type', 'file');
    });

    it('should be hidden with a default value', async () => {
      const [form] = renderHook(() => useForm()).result.current;
      render(
        <Form form={form}>
          <JsonForm
            schema={
              {
                type: 'object',
                properties: {
                  plainText: {
                    type: 'string',
                    display: 'hidden',
                    default: 'hello',
                  },
                },
              } as JsonSchema
            }
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/plainText',
            })}
          />
        </Form>,
      );
      await expectNotToBeVisibleInTheDocument('jsonform-string-control');
      expect(form.getFieldsValue()).toEqual({ plainText: 'hello' });
    });
  });

  describe('number controls', () => {
    it('should render a number control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                age: {
                  type: 'number',
                  minimum: 0,
                  maximum: 50,
                  default: 42,
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/age',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-number-control');
      expect(
        screen.getByTestId('jsonform-number-control').querySelector('input'),
      ).toHaveAttribute('type', 'number');
      expect(
        screen.getByTestId('jsonform-number-control').querySelector('input'),
      ).toHaveValue(42);
    });

    it('should render a slider control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                duration: {
                  type: 'number',
                  minimum: 1,
                  maximum: 59,
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/duration',
              options: {
                format: 'slider',
              },
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-slider-control');
    });

    it('should be hidden with a default value', async () => {
      const [form] = renderHook(() => useForm()).result.current;
      render(
        <Form form={form}>
          <JsonForm
            schema={
              {
                type: 'object',
                properties: {
                  age: {
                    type: 'number',
                    default: 42,
                    display: 'hidden',
                  },
                },
              } as JsonSchema
            }
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/age',
            })}
          />
        </Form>,
      );
      await expectNotToBeVisibleInTheDocument('jsonform-number-control');
      expect(form.getFieldsValue()).toEqual({ age: 42 });
    });
  });

  describe('boolean controls', () => {
    it('should render a checkbox control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                proxy: {
                  type: 'boolean',
                  default: true,
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/proxy',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-checkbox-control');
      expect(
        screen.getByTestId('jsonform-checkbox-control').querySelector('input'),
      ).toHaveAttribute('type', 'checkbox');
      expect(
        screen.getByTestId('jsonform-checkbox-control').querySelector('input'),
      ).toBeChecked();
    });

    it('should render a switch control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                proxy: {
                  type: 'boolean',
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/proxy',
              options: {
                format: 'switch',
              },
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-switch-control');
    });

    it('should be hidden with a default value', async () => {
      const [form] = renderHook(() => useForm()).result.current;
      render(
        <Form form={form}>
          <JsonForm
            schema={
              {
                type: 'object',
                properties: {
                  proxy: {
                    type: 'boolean',
                    default: true,
                    display: 'hidden',
                  },
                },
              } as JsonSchema
            }
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/proxy',
            })}
          />
        </Form>,
      );
      await expectNotToBeVisibleInTheDocument('jsonform-checkbox-control');
      expect(form.getFieldsValue()).toEqual({ proxy: true });
    });
  });

  describe('enum controls', () => {
    it('should render a select control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                foobar: {
                  type: 'string',
                  oneOf: [
                    { const: 0, title: 'foo' },
                    { const: 1, title: 'bar' },
                  ],
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/foobar',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-select-control');
      expect(
        screen.getByTestId('jsonform-select-control').querySelector('input'),
      ).toHaveAttribute('type', 'text');
      // Can't test that it's really a Select, but we now that the correct control is rendered.
    });

    it('should render a radio control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                foobar: {
                  type: 'string',
                  oneOf: [
                    { const: 0, title: 'foo' },
                    { const: 1, title: 'bar' },
                  ],
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/foobar',
              options: {
                format: 'radio',
              },
            })}
          />
        </Form>,
      );
      expect(screen.getAllByTestId('jsonform-radio-control')).toHaveLength(2);
      const radioElements = screen.getAllByTestId('jsonform-radio-control');
      radioElements.forEach(radioElement => {
        expect(radioElement.querySelector('input')).toHaveAttribute(
          'type',
          'radio',
        );
      });
    });
  });

  describe('array controls', () => {
    it('should render a multi-select control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                foobar: {
                  type: 'array',
                  uniqueItems: true,
                  items: {
                    oneOf: [
                      { const: 0, title: 'foo' },
                      { const: 1, title: 'bar' },
                    ],
                  },
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/foobar',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-multi-select-control');
      // Can't test that it's really a MultiSelect, but we now that the correct control is rendered.
    });

    it('should render an array of strings control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                usernames: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/usernames',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-string-array-control');
    });

    it('should render an array of numbers control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                values: {
                  type: 'array',
                  items: {
                    type: 'number',
                  },
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/values',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-number-array-control');
    });

    it('should render a range control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                range: {
                  type: 'array',
                  items: {
                    type: 'number',
                  },
                  minItems: 2,
                  maxItems: 2,
                  minimum: 1,
                  maximum: 99,
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/range',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-range-control');
    });

    it('should render an array of numbers control', async () => {
      render(
        <Form>
          <JsonForm
            schema={{
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'file',
                  },
                },
              },
            }}
            uischema={controlElement({
              type: 'Control',
              scope: '#/properties/files',
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-file-array-control');
    });
  });

  describe('oneOf controls', () => {
    const SCHEMA: JsonSchema = {
      type: 'object',
      properties: {
        credentials: {
          oneOf: [
            { $ref: '#/definitions/api_key' },
            { $ref: '#/definitions/basic_auth' },
          ],
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
              description:
                'You must provide either an API token or a username and a password.',
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
    };
    const UI_SCHEMA: UISchemaElement = controlElement({
      type: 'Control',
      label: 'Credentials',
      scope: '#/properties/credentials',
    });

    it('should render the first option by default, which is "api key")', async () => {
      render(
        <Form>
          <JsonForm schema={SCHEMA} uischema={UI_SCHEMA} />
        </Form>,
      );
      expect(screen.getByText(/api key/i)).toBeVisible();
      expect(screen.getByLabelText(/gcenter api token/i)).toBeVisible();
    });

    it('should switch from "api key" to "basic auth"', async () => {
      render(
        <Form>
          <JsonForm schema={SCHEMA} uischema={UI_SCHEMA} />
        </Form>,
      );
      const user = userEvent.setup();
      await user.click(screen.getByRole('combobox', { name: /credentials/i }));
      await user.click(screen.getByText(/login and password/i));
      expect(screen.getByLabelText(/gcenter username/i)).toBeVisible();
      expect(screen.getByLabelText(/gcenter password/i)).toBeVisible();
    });

    it('should initially render with "basic auth" selected', async () => {
      render(
        <Form>
          <JsonForm
            initialOptions={{ credentials: 'basic_auth' }}
            schema={SCHEMA}
            uischema={UI_SCHEMA}
          />
        </Form>,
      );
      expect(screen.getByLabelText(/gcenter username/i)).toBeVisible();
      expect(screen.getByLabelText(/gcenter password/i)).toBeVisible();
    });

    it('should call `onOptionsChange(options)` on user selection', async () => {
      const onOptionsChange = jest.fn();
      render(
        <Form>
          <JsonForm
            initialOptions={{ credentials: 'basic_auth' }}
            onOptionsChange={onOptionsChange}
            schema={SCHEMA}
            uischema={UI_SCHEMA}
          />
        </Form>,
      );
      const user = userEvent.setup();
      await user.click(screen.getByRole('combobox', { name: /credentials/i }));
      await user.click(screen.getByText(/api key/i));

      expect(onOptionsChange).toHaveBeenCalledTimes(2);
      expect(onOptionsChange).toHaveBeenNthCalledWith(2, {
        credentials: 'api_key',
      });
    });

    it('should call `onOptionsChange(options)` on mount', async () => {
      const onOptionsChange = jest.fn();
      render(
        <Form>
          <JsonForm
            initialOptions={{ credentials: 'basic_auth' }}
            onOptionsChange={onOptionsChange}
            schema={SCHEMA}
            uischema={UI_SCHEMA}
          />
        </Form>,
      );
      expect(onOptionsChange).toHaveBeenCalledTimes(1);
      expect(onOptionsChange).toHaveBeenCalledWith({
        credentials: 'basic_auth',
      });
    });

    it('should call `onOptionsChange(options)` on unmount', async () => {
      const onOptionsChange = jest.fn();
      const { unmount } = render(
        <Form>
          <JsonForm
            onOptionsChange={onOptionsChange}
            schema={SCHEMA}
            uischema={UI_SCHEMA}
          />
        </Form>,
      );
      unmount();
      expect(onOptionsChange).toHaveBeenCalledTimes(2);
      expect(onOptionsChange).toHaveBeenNthCalledWith(2, {});
    });
  });

  describe('layout controls', () => {
    it('should render a Group', async () => {
      render(
        <Form>
          <JsonForm
            uischema={layoutElement({
              type: 'Group',
              elements: [],
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-group-control');
    });

    it('should render a VerticalLayout', async () => {
      render(
        <Form>
          <JsonForm
            uischema={layoutElement({
              type: 'VerticalLayout',
              elements: [],
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument('jsonform-vertical-layout-control');
    });

    it('should render a HorizontalLayout', async () => {
      render(
        <Form>
          <JsonForm
            uischema={layoutElement({
              type: 'HorizontalLayout',
              elements: [],
            })}
          />
        </Form>,
      );
      await expectToBeVisibleInTheDocument(
        'jsonform-horizontal-layout-control',
      );
    });
  });
});
