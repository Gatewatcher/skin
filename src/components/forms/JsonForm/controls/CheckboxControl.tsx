import type { ControlProps, RankedTester } from '@jsonforms/core';
import { isBooleanControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { InfoTooltip } from '@/skin/displays';
import { Form, Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { useRegisterSubFieldPath } from '../hooks';
import { getFieldPropsFromUiSchema, getInputPropsFromUiSchema } from '../utils';

const CheckboxControl = ({
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
            <Input.Checkbox
              {...getInputPropsFromUiSchema(uischema)}
              {...props}
              data-testid="jsonform-checkbox-control"
              disabled={!enabled}
              label={label}
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

const CheckboxControlRenderer = withJsonFormsControlProps(CheckboxControl);

export const checkboxControlTester: RankedTester = rankWith(
  1,
  isBooleanControl,
);

export default CheckboxControlRenderer;
