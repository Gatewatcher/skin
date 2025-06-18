import type { ControlProps, RankedTester } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { InfoTooltip } from '@/skin/displays';
import { Form, Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  isRadioControl,
} from '../utils';

const RadioControl = ({
  enabled,
  description,
  label,
  required,
  path,
  schema,
  uischema,
}: ControlProps) => {
  const options = schema.oneOf?.map(item => ({
    label: item.title,
    value: item.const,
  }));

  const { direction } = uischema.options ?? {};

  useRegisterSubFieldPath(path);

  return (
    <Stack direction="column" gap={6}>
      <Stack gap={4}>
        <Text weight="medium">
          {label}
          {required && ' *'}
        </Text>
        {description && <InfoTooltip info={description} />}
      </Stack>
      <Stack direction={direction} gap={6}>
        <Form.Field
          {...getFieldPropsFromUiSchema(uischema)}
          messageVariables={{ name: label }}
          name={path}
          required={required}
        >
          {control =>
            options?.map(option => (
              <Input.Radio
                {...getInputPropsFromUiSchema(uischema)}
                key={option.value}
                checked={option.value === control.value}
                data-testid="jsonform-radio-control"
                disabled={!enabled}
                label={option.label}
                onChange={({ target }) => control.onChange(target.value)}
                tooltip={description}
                value={option.value}
                preventAutocomplete
              />
            ))
          }
        </Form.Field>
      </Stack>
    </Stack>
  );
};

const RadioControlRenderer = withJsonFormsControlProps(RadioControl);

export const radioControlTester: RankedTester = rankWith(
  3, // Override the vanilla radio buttons and the custom select control
  isRadioControl,
);

export default RadioControlRenderer;
