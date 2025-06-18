import type { ControlProps, RankedTester } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Form, Input } from '@/skin/forms';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getRulesFromSchema,
  getSchemaNumberMax,
  getSchemaNumberMin,
  isSliderControl,
} from '../utils';

const SliderControl = ({
  enabled,
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
      rules={getRulesFromSchema(schema)}
      type="number"
    >
      <Input.Slider
        {...getInputPropsFromUiSchema(uischema)}
        data-testid="jsonform-slider-control"
        disabled={!enabled}
        label={label}
        max={getSchemaNumberMax(schema)}
        min={getSchemaNumberMin(schema)}
      />
    </Form.Field>
  );
};

const SliderControlRenderer = withJsonFormsControlProps(SliderControl);

export const sliderControlTester: RankedTester = rankWith(
  2, // Override the custom number control
  isSliderControl,
);

export default SliderControlRenderer;
