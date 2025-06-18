import type { ControlProps, JsonSchema, RankedTester } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Form, Input } from '@/skin/forms';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  isMultiSelectControl,
} from '../utils';

const MultiSelectControl = ({
  enabled,
  description,
  label,
  path,
  required,
  schema,
  uischema,
}: ControlProps) => {
  useRegisterSubFieldPath(path);

  return (
    <Form.Field
      {...getFieldPropsFromUiSchema(uischema)}
      messageVariables={{ name: label }}
      name={path}
      required={required}
      type="multiSelect"
    >
      <Input.MultiSelect
        {...getInputPropsFromUiSchema(uischema)}
        data-testid="jsonform-multi-select-control"
        disabled={!enabled}
        info={description}
        label={label}
        options={getOptions(schema)}
        preventAutocomplete
      />
    </Form.Field>
  );
};

const getOptions = (schema: JsonSchema) => {
  if (isOneOfArraySchema(schema)) {
    return schema.items.oneOf?.map(item => ({
      label: item.title ?? item.const,
      value: item.const,
    }));
  }
};

const isOneOfArraySchema = (
  schema: JsonSchema,
): schema is {
  items: { oneOf: [{ title: string; const: string }] };
} => {
  return (
    !!schema.items &&
    'oneOf' in schema.items &&
    (schema.items.oneOf as JsonSchema[]).every(
      entry => entry.const !== undefined,
    ) &&
    !!schema.uniqueItems
  );
};

const MultiSelectControlRenderer =
  withJsonFormsControlProps(MultiSelectControl);

export const multiSelectControlTester: RankedTester = rankWith(
  2,
  isMultiSelectControl,
);

export default MultiSelectControlRenderer;
