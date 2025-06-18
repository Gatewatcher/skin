import type {
  ControlElement,
  ControlProps,
  JsonSchema,
  RankedTester,
} from '@jsonforms/core';
import { isStringControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { useEffect } from 'react';

import { Form, Input, useWatch } from '@/skin/forms';

import { useJsonFormFormInstance } from '../contexts';
import { useFullPath, useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getRulesFromSchema,
} from '../utils';

const TextControl = ({
  enabled,
  label,
  path,
  required,
  schema,
  uischema,
}: ControlProps) => {
  const { placeholder, readonly } = uischema.options ?? {};
  const form = useJsonFormFormInstance();

  useRegisterSubFieldPath(path);

  const Component = getComponent(schema, uischema);
  const fullPath = useFullPath(path);
  const value = useWatch(fullPath);

  useEffect(() => {
    if (Array.isArray(value)) {
      form?.setFieldValue(fullPath, JSON.stringify(value));
    }
  }, [form, fullPath, value]);

  return (
    <Form.Field
      {...getFieldPropsFromUiSchema(uischema)}
      initialValue={schema.default}
      messageVariables={{ name: label }}
      name={path}
      required={required}
      rules={getRulesFromSchema(schema)}
    >
      {({ value, ...props }, meta) =>
        Component && (
          <Component
            {...getInputPropsFromUiSchema(uischema)}
            {...props}
            data-testid="jsonform-string-control"
            label={label}
            meta={meta}
            placeholder={placeholder}
            readOnly={!enabled || readonly}
            rows={4}
            tooltip={schema.description}
            value={Array.isArray(value) ? JSON.stringify(value) : value}
            preventAutocomplete
          />
        )
      }
    </Form.Field>
  );
};

const getComponent = (schema: JsonSchema, uischema: ControlElement) => {
  const { display } = schema as { display?: string };

  if (display === 'hidden') {
    return null;
  }

  const isSensitive =
    schema.format === 'sensitive' ||
    display === 'sensitive' ||
    !!uischema.options?.sensitive;

  if (isSensitive) {
    return Input.Password;
  }

  const isMulti =
    schema.format === 'long' || display === 'long' || !!uischema.options?.multi;

  return isMulti ? Input.TextArea : Input.Text;
};

const TextControlRenderer = withJsonFormsControlProps(TextControl);

export const textControlTester: RankedTester = rankWith(1, isStringControl);

export default TextControlRenderer;
