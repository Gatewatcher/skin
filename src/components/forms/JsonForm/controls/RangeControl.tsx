import type { ControlProps, RankedTester } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Form, Input } from '@/skin/forms';
import { useRegisterSubFieldPath } from '@/skin/forms/JsonForm/hooks/useRegisterSubFieldPath';

import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getSchemaNumberMax,
  getSchemaNumberMin,
  isRangeControl,
} from '../utils';

const RangeControl = ({
  enabled,
  label,
  path,
  required,
  schema,
  uischema,
}: ControlProps) => {
  const min = getSchemaNumberMin(schema);
  const max = getSchemaNumberMax(schema);

  useRegisterSubFieldPath(path);

  return (
    <Form.Field
      {...getFieldPropsFromUiSchema(uischema)}
      messageVariables={{ name: label }}
      name={path}
      required={required}
    >
      <Input.Range
        {...getInputPropsFromUiSchema(uischema)}
        data-testid="jsonform-range-control"
        disabled={!enabled}
        label={label}
        max={max}
        min={min}
      />
    </Form.Field>
  );
};

const RangeControlRenderer = withJsonFormsControlProps(RangeControl);

export const rangeControlTester: RankedTester = rankWith(
  2, // Override the custom array controller
  isRangeControl,
);

export default RangeControlRenderer;
