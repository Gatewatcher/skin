import type { ControlProps, JsonSchema, RankedTester } from '@jsonforms/core';
import { isOneOfControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Form, Input } from '@/skin/forms';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getSelectOptionsFromSchema,
} from '../utils';

const SelectControl = ({
  enabled,
  description,
  label,
  required,
  path,
  schema,
  uischema,
}: ControlProps) => {
  const options = getSelectOptionsFromSchema(schema);

  useRegisterSubFieldPath(path);

  return (
    <Form.Field
      initialValue={getInitialValue(schema)}
      {...getFieldPropsFromUiSchema(uischema)}
      messageVariables={{ name: label }}
      name={path}
      required={required}
      type="select"
    >
      <Input.Select
        {...getInputPropsFromUiSchema(uischema)}
        data-testid="jsonform-select-control"
        disabled={!enabled}
        info={description}
        label={label}
        options={options}
        preventAutocomplete
      />
    </Form.Field>
  );
};

const getInitialValue = (schema: JsonSchema) => {
  const item = schema.oneOf?.find(item => item.const === schema.default);

  if (item) {
    return {
      label: item.title ?? item.const,
      value: item.const,
    };
  }
};

const SelectControlRenderer = withJsonFormsControlProps(SelectControl);

export const selectControlTester: RankedTester = rankWith(
  2, // Override the custom text control
  isOneOfControl,
);

export default SelectControlRenderer;
