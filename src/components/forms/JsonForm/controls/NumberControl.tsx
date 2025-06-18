import type { ControlProps, RankedTester } from '@jsonforms/core';
import { isNumberControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Form, Input } from '@/skin/forms';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getRulesFromSchema,
} from '../utils';

const NumberControl = ({
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
    <Form.Field
      {...getFieldPropsFromUiSchema(uischema)}
      initialValue={schema.default}
      messageVariables={{ name: label }}
      name={path}
      required={required}
      rules={getRulesFromSchema(schema)}
      type="number"
    >
      {(props, meta) =>
        display !== 'hidden' && (
          <Input.Number
            {...getInputPropsFromUiSchema(uischema)}
            {...props}
            data-testid="jsonform-number-control"
            disabled={!enabled}
            label={label}
            meta={meta}
            tooltip={description}
            preventAutocomplete
          />
        )
      }
    </Form.Field>
  );
};

const NumberControlRenderer = withJsonFormsControlProps(NumberControl);

export const numberControlTester: RankedTester = rankWith(1, isNumberControl);

export default NumberControlRenderer;
