import type { ControlProps, RankedTester } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { InfoTooltip } from '@/skin/displays';
import { Form, Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  isSwitchControl,
} from '../utils';

const SwitchControl = ({
  enabled,
  description,
  label,
  path,
  required,
  schema,
  uischema,
}: ControlProps) => {
  const { display } = schema as { display?: string };

  useRegisterSubFieldPath(path);

  return (
    <Stack direction="row" gap={4}>
      <Form.Field
        {...getFieldPropsFromUiSchema(uischema)}
        initialValue={schema.default}
        messageVariables={{ name: label }}
        name={path}
        required={required}
        type="checked"
      >
        {(props, meta) =>
          display !== 'hidden' && (
            <Input.Switch
              {...getInputPropsFromUiSchema(uischema)}
              {...props}
              data-testid="jsonform-switch-control"
              disabled={!enabled}
              endLabel={label}
              meta={meta}
              preventAutocomplete
            />
          )
        }
      </Form.Field>
      {display !== 'hidden' && !!description && (
        <InfoTooltip info={description} />
      )}
    </Stack>
  );
};

const SwitchControlRenderer = withJsonFormsControlProps(SwitchControl);

export const switchControlTester: RankedTester = rankWith(
  2, // Override the custom checkbox
  isSwitchControl,
);

export default SwitchControlRenderer;
