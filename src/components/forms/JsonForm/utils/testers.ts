import { isObject } from '@gatewatcher/bistoury/utils-lang';
import {
  type JsonSchema,
  type Tester,
  and,
  hasType,
  isBooleanControl,
  isNumberControl,
  isOneOfControl,
  isPrimitiveArrayControl,
  isStringControl,
  optionIs,
  schemaMatches,
  schemaSubPathMatches,
  uiTypeIs,
} from '@jsonforms/core';

export const isFileControl: Tester = and(
  isStringControl,
  schemaMatches(({ format }) => format === 'file'),
);

export const isFileArrayControl: Tester = and(
  isPrimitiveArrayControl,
  schemaMatches(
    ({ items }) =>
      !!items &&
      !Array.isArray(items) &&
      items.type === 'string' &&
      items.format === 'file',
  ),
);

export const isOneOfRefControl: Tester = and(
  isOneOfControl,
  schemaMatches(
    schema =>
      !hasType(schema, 'array') &&
      !!schema.oneOf?.every(item => '$ref' in item),
  ),
);

export const isStringArraySelectControl: Tester = and(
  uiTypeIs('Control'),
  schemaMatches(
    schema =>
      hasType(schema, 'string') &&
      schema.format === 'array' &&
      hasOneOfItems(schema),
  ),
);

// @jsonforms/material-renderers/src/complex/MaterialEnumArrayRenderer.tsx
export const isMultiSelectControl: Tester = and(
  uiTypeIs('Control'),
  and(
    schemaMatches(
      schema =>
        (hasType(schema, 'array') &&
          !Array.isArray(schema.items) &&
          schema.uniqueItems === true) ||
        (hasType(schema, 'string') && schema.format === 'array'),
    ),
    schemaSubPathMatches(
      'items',
      schema => hasOneOfItems(schema) || hasEnumItems(schema),
    ),
  ),
);

export const hasOneOfItems = (schema: JsonSchema): boolean =>
  schema.oneOf !== undefined &&
  schema.oneOf.length > 0 &&
  (schema.oneOf as JsonSchema[]).every((entry: JsonSchema) => {
    return entry.const !== undefined;
  });

export const hasEnumItems = (schema: JsonSchema): boolean =>
  schema.type === 'string' && schema.enum !== undefined;

export const isRadioControl: Tester = and(
  isOneOfControl,
  optionIs('format', 'radio'),
);

export const isSliderControl: Tester = and(
  isNumberControl,
  optionIs('format', 'slider'),
);

export const isSwitchControl: Tester = and(
  isBooleanControl,
  optionIs('format', 'switch'),
);

export const isRangeControl: Tester = and(
  schemaMatches(schema => {
    return (
      hasType(schema, 'array') &&
      !Array.isArray(schema.items) &&
      isObject(schema.items) &&
      schema.items.type === 'number' &&
      schema.minItems === 2 &&
      schema.maxItems === 2
    );
  }),
);
