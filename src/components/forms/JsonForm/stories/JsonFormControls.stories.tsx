import type { JsonSchema } from '@jsonforms/core';
import type { Meta, StoryObj } from '@storybook/react';

import type { FormProps } from '@/skin/forms';
import { Form } from '@/skin/forms';
import { FormStore } from '@/skin/forms/Form/FormStore';
import { Stack } from '@/skin/layout';

import JsonForm, { type JsonFormProps } from '..';
import { controlElement, layoutElement } from '../utils';

type JsonFormsAndFormArgs = JsonFormProps &
  Pick<FormProps, 'initialValues' | 'onFinish'>;

const meta = {
  title: 'forms/JsonForm/controls',
  component: JsonForm,
  render: ({ initialValues, onFinish, ...args }) => {
    const formStore = new FormStore(() => {});
    const form = formStore.getForm();

    return (
      <Form form={form} initialValues={initialValues} onFinish={onFinish}>
        <Stack direction="column" gap={8}>
          <JsonForm {...args} form={form} />
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

export const PlainText = {
  args: {
    schema: {
      type: 'object',
      properties: {
        plainText: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
          description: 'Enter up to 50 characters (optional)',
          default: '',
          display: undefined,
        },
      },
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/plainText',
    }),
  },
} satisfies Story;

export const Username = {
  args: {
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          pattern: '^\\w+\\.\\w+$',
          title: 'Username',
          description: 'Enter your username here',
          default: '',
          display: undefined,
        },
      },
      required: ['username'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Your username',
      scope: '#/properties/username',
      options: {
        placeholder: 'firstName.lastName',
      },
    }),
  },
} satisfies Story;

export const Email = {
  args: {
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          title: 'Email',
          description: 'Enter your email here',
          default: '',
          display: undefined,
        },
      },
      required: ['email'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Your email',
      scope: '#/properties/email',
      options: {
        placeholder: 'some.dev@gatewatcher.com',
      },
    }),
  },
} satisfies Story;

export const Password = {
  args: {
    schema: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          minLength: 8,
          maxLength: 20,
          title: 'Password',
          description: 'Enter your password here',
          default: '',
          display: 'sensitive',
        },
      },
      required: ['password'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Your password',
      scope: '#/properties/password',
      options: {
        placeholder: '••••••••',
        sensitive: true,
      },
    }),
  },
} satisfies Story;

export const MultilineText = {
  args: {
    schema: {
      type: 'object',
      properties: {
        comment: {
          type: 'string',
          maxLength: 160,
          title: 'Comment',
          description:
            'Write everything you want (optional, max. 160 characters)',
          default: '',
          display: 'long',
        },
      },
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Your comment',
      scope: '#/properties/comment',
      options: {
        multi: true,
        placeholder: 'Put down your thoughts here...',
      },
    }),
  },
} satisfies Story;

export const Number = {
  args: {
    schema: {
      type: 'object',
      properties: {
        age: {
          type: 'number',
          minimum: 0,
          maximum: 99,
          default: 0,
          display: undefined,
        },
      },
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/age',
    }),
  },
} satisfies Story;

export const Slider = {
  args: {
    schema: {
      type: 'object',
      properties: {
        retention: {
          type: 'number',
          minimum: 1,
          exclusiveMaximum: 60,
          description: 'Select how long the data should be kept (in minutes)',
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/retention',
      options: {
        format: 'slider',
      },
    }),
  },
} satisfies Story;

export const Checkbox = {
  args: {
    schema: {
      type: 'object',
      properties: {
        proxy: {
          type: 'boolean',
          default: true,
          display: undefined,
        },
      },
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/proxy',
    }),
  },
} satisfies Story;

export const Switch = {
  args: {
    schema: {
      type: 'object',
      properties: {
        proxy: {
          type: 'boolean',
          default: true,
          display: undefined,
        },
      },
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/proxy',
      options: {
        format: 'switch',
      },
    }),
  },
} satisfies Story;

export const Select = {
  args: {
    schema: {
      type: 'object',
      properties: {
        authentication: {
          type: 'string',
          title: 'Authentication',
          description: 'Hello radio!',
          oneOf: [
            {
              const: 'token',
              title: 'API token',
            },
            {
              const: 'login',
              title: 'Login and password',
            },
          ],
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/authentication',
    }),
  },
} satisfies Story;

export const Radio = {
  args: {
    schema: {
      type: 'object',
      properties: {
        authentication: {
          type: 'string',
          title: 'Authentication',
          oneOf: [
            {
              const: 'token',
              title: 'API token',
            },
            {
              const: 'login',
              title: 'Login and password',
            },
          ],
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/authentication',
      options: {
        format: 'radio',
        direction: 'row',
      },
    }),
  },
} satisfies Story;

export const MultiSelect = {
  args: {
    schema: {
      type: 'object',
      properties: {
        gcaps: {
          type: 'array',
          title: 'GCaps',
          uniqueItems: true,
          items: {
            oneOf: [
              {
                const: '1',
                title: 'gcap-1.gatewatcher.com',
              },
              {
                const: '2',
                title: 'gcap-2.gatewatcher.com',
              },
              {
                const: '3',
                title: 'gcap-3.gatewatcher.com',
              },
            ],
          },
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/gcaps',
    }),
  },
} satisfies Story;

export const SingleFile = {
  args: {
    schema: {
      type: 'object',
      properties: {
        logs: {
          type: 'string',
          format: 'file',
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      label: 'Select a file',
      scope: '#/properties/logs',
    }),
  },
} satisfies Story;

export const ArrayOfStrings = {
  args: {
    schema: {
      type: 'object',
      properties: {
        usernameList: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/usernameList',
      options: {
        placeholder: 'name...',
      },
    }),
  },
} satisfies Story;

export const ArrayOfNumbers = {
  args: {
    schema: {
      type: 'object',
      properties: {
        userIdList: {
          type: 'array',
          items: {
            type: 'number',
            pattern: '\\d+',
          },
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      scope: '#/properties/userIdList',
      options: {
        placeholder: '123456...',
      },
    }),
  },
} satisfies Story;

export const ArrayOfFiles = {
  args: {
    schema: {
      type: 'object',
      properties: {
        logs: {
          type: 'array',
          items: {
            type: 'string',
            format: 'file',
          },
        },
      },
    },
    uischema: controlElement({
      type: 'Control',
      label: 'Select files',
      scope: '#/properties/logs',
    }),
  },
} satisfies Story;

export const Range = {
  args: {
    schema: {
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
    },
    uischema: controlElement({
      type: 'Control',
      label: 'Select min and max',
      scope: '#/properties/range',
    }),
  },
} satisfies Story;

export const JsonNumber = {
  args: {
    schema: {
      type: 'object',
      properties: {
        numberString: {
          type: 'string',
          format: 'number',
          title: 'Number String',
          description: 'Enter a number here',
        },
      },
      required: ['numberString'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Number String',
      scope: '#/properties/numberString',
      options: {
        placeholder: '42',
      },
    }),
  },
} satisfies Story;

export const JsonBoolean = {
  args: {
    schema: {
      type: 'object',
      properties: {
        booleanString: {
          type: 'string',
          format: 'boolean',
          title: 'Boolean String',
          description: 'Enter a boolean here',
        },
      },
      required: ['booleanString'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Boolean String',
      scope: '#/properties/booleanString',
      options: {
        placeholder: 'true/false',
      },
    }),
  },
} satisfies Story;

export const Date = {
  args: {
    schema: {
      type: 'object',
      properties: {
        dateString: {
          type: 'string',
          format: 'date',
          title: 'Date String',
          description: 'Enter a date here',
        },
      },
      required: ['dateString'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Date String',
      scope: '#/properties/dateString',
      options: {
        placeholder: '2024-10-14',
      },
    }),
  },
} satisfies Story;

export const Time = {
  args: {
    schema: {
      type: 'object',
      properties: {
        timeString: {
          type: 'string',
          format: 'time',
          title: 'Time String',
          description: 'Enter a time here',
        },
      },
      required: ['timeString'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Time String',
      scope: '#/properties/timeString',
      options: {
        placeholder: '20:20:39+00:00',
      },
    }),
  },
} satisfies Story;

export const DateTime = {
  args: {
    schema: {
      type: 'object',
      properties: {
        dateString: {
          type: 'string',
          format: 'date-time',
          title: 'Date String',
          description: 'Enter a date here',
        },
      },
      required: ['dateString'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Date String',
      scope: '#/properties/dateString',
      options: {
        placeholder: '2024-10-11T08:45:05.598+02:00',
      },
    }),
  },
} satisfies Story;

export const JsonArray = {
  args: {
    schema: {
      type: 'object',
      properties: {
        arrayString: {
          type: 'string',
          format: 'array',
          title: 'Array String',
          description: 'Enter an array here',
        },
      },
      required: ['array'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Array String',
      scope: '#/properties/arrayString',
      options: {
        placeholder: '["example"]',
      },
    }),
  },
} satisfies Story;

export const JsonObject = {
  args: {
    schema: {
      type: 'object',
      properties: {
        objectString: {
          type: 'string',
          format: 'object',
          title: 'Object String',
          description: 'Enter an object here',
        },
      },
      required: ['object'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Object String',
      scope: '#/properties/objectString',
      options: {
        placeholder: '{"message":"example"}',
      },
    }),
  },
} satisfies Story;

export const IPV4 = {
  args: {
    schema: {
      type: 'object',
      properties: {
        ipv4: {
          type: 'string',
          format: 'ipv4',
          title: 'IPv4',
          description: 'Enter an IPv4 address here',
        },
      },
      required: ['ipv4'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'IPv4',
      scope: '#/properties/ipv4',
      options: {
        placeholder: '127.0.0.1',
      },
    }),
  },
} satisfies Story;

export const IPV6 = {
  args: {
    schema: {
      type: 'object',
      properties: {
        ipv6: {
          type: 'string',
          format: 'ipv6',
          title: 'IPv6',
          description: 'Enter an IPv6 address here',
        },
      },
      required: ['ipv6'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'IPv6',
      scope: '#/properties/ipv6',
      options: {
        placeholder: '2001:db8:1f89::/48',
      },
    }),
  },
} satisfies Story;

export const Hostname = {
  args: {
    schema: {
      type: 'object',
      properties: {
        hostname: {
          type: 'string',
          format: 'hostname',
          title: 'Hostname',
          description: 'Enter a hostname here',
        },
      },
      required: ['hostname'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'Hostname',
      scope: '#/properties/hostname',
      options: {
        placeholder: 'en.wikipedia.org',
      },
    }),
  },
} satisfies Story;

export const URL = {
  args: {
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'url',
          title: 'URL',
          description: 'Enter a url here',
        },
      },
      required: ['url'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'URL',
      scope: '#/properties/url',
      options: {
        placeholder: 'https://en.wikipedia.org/wiki/URL',
      },
    }),
  },
} satisfies Story;

export const UUID = {
  args: {
    schema: {
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
          format: 'uuid',
          title: 'UUID',
          description: 'Enter a UUID here',
        },
      },
      required: ['uuid'],
    } as JsonSchema,
    uischema: controlElement({
      type: 'Control',
      label: 'UUID',
      scope: '#/properties/uuid',
      options: {
        placeholder: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      },
    }),
  },
} satisfies Story;

export const JsonAll = {
  args: {
    schema: {
      type: 'object',
      properties: {
        date_from: {
          type: 'string',
          format: 'date-time',
          description: 'Filter events (Use ISO 8601 format)',
        },
        date_to: {
          type: 'string',
          format: 'date-time',
          description: 'Filter events (Use ISO 8601 format)',
        },
        dst_ip: {
          type: 'string',
          format: 'array',
          description:
            'Get all the alerts where this ip is the destination of this alert',
        },
        excluded_tags: {
          type: 'string',
          format: 'array',
          description:
            'Exclude the alerts by tag label (logical OR between the given tags)',
          default: '[]',
        },
        hostname: {
          type: 'string',
          description:
            'Filter alerts by hostname through the source and destination ip addresses',
        },
        included_tags: {
          type: 'string',
          format: 'array',
          description:
            'Filter the alerts by tag label (logical OR between the given tags)',
          default: '[]',
        },
        mitre_tactic: {
          type: 'string',
          description: 'Filter alerts by mitre tactic name',
          default: 'Collection',
          oneOf: [
            {
              const: 'Collection',
            },
            {
              const: 'Collection (ICS)',
            },
            {
              const: 'Collection (Mobile)',
            },
            {
              const: 'Command and Control',
            },
            {
              const: 'Command and Control (ICS)',
            },
            {
              const: 'Command and Control (Mobile)',
            },
            {
              const: 'Credential Access',
            },
            {
              const: 'Credential Access (Mobile)',
            },
            {
              const: 'Defense Evasion',
            },
            {
              const: 'Defense Evasion (Mobile)',
            },
            {
              const: 'Discovery',
            },
            {
              const: 'Discovery (ICS)',
            },
            {
              const: 'Discovery (Mobile)',
            },
            {
              const: 'Evasion',
            },
            {
              const: 'Execution',
            },
            {
              const: 'Execution (ICS)',
            },
            {
              const: 'Execution (Mobile)',
            },
            {
              const: 'Exfiltration',
            },
            {
              const: 'Exfiltration (Mobile)',
            },
            {
              const: 'Impact',
            },
            {
              const: 'Impact (ICS)',
            },
            {
              const: 'Impact (Mobile)',
            },
            {
              const: 'Impair Process Control',
            },
            {
              const: 'Inhibit Response Function',
            },
            {
              const: 'Initial Access',
            },
            {
              const: 'Initial Access (ICS)',
            },
            {
              const: 'Initial Access (Mobile)',
            },
            {
              const: 'Lateral Movement',
            },
            {
              const: 'Lateral Movement (ICS)',
            },
            {
              const: 'Lateral Movement (Mobile)',
            },
            {
              const: 'Persistence',
            },
            {
              const: 'Persistence (ICS)',
            },
            {
              const: 'Persistence (Mobile)',
            },
            {
              const: 'Privilege Escalation',
            },
            {
              const: 'Privilege Escalation (ICS)',
            },
            {
              const: 'Privilege Escalation (Mobile)',
            },
            {
              const: 'Reconnaissance',
            },
            {
              const: 'Resource Development',
            },
          ],
        },
        mitre_tactics: {
          type: 'string',
          format: 'array',
          description: 'Filter alerts by mitre tactic name',
          default: '["Collection","Collection (ICS)","Collection (Mobile)"]',
          oneOf: [
            {
              const: 'Collection',
            },
            {
              const: 'Collection (ICS)',
            },
            {
              const: 'Collection (Mobile)',
            },
            {
              const: 'Command and Control',
            },
            {
              const: 'Command and Control (ICS)',
            },
            {
              const: 'Command and Control (Mobile)',
            },
            {
              const: 'Credential Access',
            },
            {
              const: 'Credential Access (Mobile)',
            },
            {
              const: 'Defense Evasion',
            },
            {
              const: 'Defense Evasion (Mobile)',
            },
            {
              const: 'Discovery',
            },
            {
              const: 'Discovery (ICS)',
            },
            {
              const: 'Discovery (Mobile)',
            },
            {
              const: 'Evasion',
            },
            {
              const: 'Execution',
            },
            {
              const: 'Execution (ICS)',
            },
            {
              const: 'Execution (Mobile)',
            },
            {
              const: 'Exfiltration',
            },
            {
              const: 'Exfiltration (Mobile)',
            },
            {
              const: 'Impact',
            },
            {
              const: 'Impact (ICS)',
            },
            {
              const: 'Impact (Mobile)',
            },
            {
              const: 'Impair Process Control',
            },
            {
              const: 'Inhibit Response Function',
            },
            {
              const: 'Initial Access',
            },
            {
              const: 'Initial Access (ICS)',
            },
            {
              const: 'Initial Access (Mobile)',
            },
            {
              const: 'Lateral Movement',
            },
            {
              const: 'Lateral Movement (ICS)',
            },
            {
              const: 'Lateral Movement (Mobile)',
            },
            {
              const: 'Persistence',
            },
            {
              const: 'Persistence (ICS)',
            },
            {
              const: 'Persistence (Mobile)',
            },
            {
              const: 'Privilege Escalation',
            },
            {
              const: 'Privilege Escalation (ICS)',
            },
            {
              const: 'Privilege Escalation (Mobile)',
            },
            {
              const: 'Reconnaissance',
            },
            {
              const: 'Resource Development',
            },
          ],
        },
        page_size: {
          type: 'string',
          format: 'number',
          description: 'Number of results to return per page',
          default: '10',
        },
        risk_max: {
          type: 'string',
          format: 'number',
          description: 'Get all the alerts with lower risk than this value',
          default: '100',
        },
        risk_min: {
          type: 'string',
          format: 'number',
          description: 'Get all the alerts with greater risk than this value',
          default: '1',
        },
        src_ip: {
          type: 'string',
          format: 'array',
          description:
            'Get all the alerts where this ip is the source of this alert',
        },
        state: {
          type: 'string',
          format: 'array',
          description: 'Filter alerts by state',
          uniqueItems: true,
          items: {
            oneOf: [
              {
                const: 'close',
              },
              {
                const: 'mute',
              },
              {
                const: 'open',
              },
            ],
          },
        },
        type: {
          type: 'string',
          format: 'array',
          description: 'Filter alerts by type',
          uniqueItems: true,
          items: {
            oneOf: [
              {
                const: 'active_cti',
              },
              {
                const: 'beacon_detect',
              },
              {
                const: 'dga_detect',
              },
              {
                const: 'malcore',
              },
              {
                const: 'malcore_retroanalyzer',
              },
              {
                const: 'malicious_powershell_detect',
              },
              {
                const: 'ransomware_detect',
              },
              {
                const: 'retrohunt',
              },
              {
                const: 'shellcode_detect',
              },
              {
                const: 'sigflow_alert',
              },
            ],
          },
        },
      },
    },
    uischema: layoutElement({
      type: 'VerticalLayout',
      elements: [
        controlElement({
          type: 'Control',
          scope: '#/properties/page_size',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/risk_min',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/risk_max',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/date_from',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/date_to',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/src_ip',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/dst_ip',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/hostname',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/included_tags',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/excluded_tags',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/state',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/type',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/mitre_tactic',
        }),
        controlElement({
          type: 'Control',
          scope: '#/properties/mitre_tactics',
        }),
      ],
    }),
    initialValues: {
      alert_count: '10',
      risk_min: '80',
      risk_max: '100',
      included_tags: [],
      excluded_tags: ['Needs investigation'],
      state: ['open'],
      type: ['active_cti', 'beacon_detect'],
      mitre_tactic: 'Collection (ICS)',
    },
  },
} satisfies Story;
