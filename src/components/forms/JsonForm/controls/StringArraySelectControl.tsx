import { isString } from '@gatewatcher/bistoury/utils-lang';
import {
  type ControlProps,
  type JsonSchema,
  type RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Form, Input } from '@/skin/forms';

import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getSelectOptionsFromSchema,
  isStringArraySelectControl,
} from '../utils';

const StringArraySelectControl = ({
  enabled,
  description,
  label,
  path,
  required,
  schema,
  uischema,
}: ControlProps) => {
  const options = getSelectOptionsFromSchema(schema);

  return (
    <Form.Field
      initialValue={getInitialValue(schema)}
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
        options={options}
        preventAutocomplete
      />
    </Form.Field>
  );
};

const getInitialValue = (schema: JsonSchema) => {
  try {
    const result = isString(schema.default)
      ? JSON.parse(schema.default)
      : schema.default;

    return schema.oneOf
      ?.filter(item => result.includes(item.const))
      .map(item => ({
        label: item.title ?? item.const,
        value: item.const,
      }));
  } catch (error) {
    return [];
  }
};

const StringArraySelectControlRenderer = withJsonFormsControlProps(
  StringArraySelectControl,
);

export const stringArraySelectControlTester: RankedTester = rankWith(
  3, // Override SelectControl
  isStringArraySelectControl,
);

export default StringArraySelectControlRenderer;
