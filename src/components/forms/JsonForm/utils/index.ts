import { isObject, isString } from '@gatewatcher/bistoury/utils-lang';
import type {
  ControlElement,
  GroupLayout,
  HorizontalLayout,
  JsonSchema,
  UISchemaElement,
  VerticalLayout,
} from '@jsonforms/core';

export const controlElement = (schema: ControlElement): UISchemaElement =>
  schema;

export const layoutElement = (
  schema: GroupLayout | HorizontalLayout | VerticalLayout,
): UISchemaElement => schema;

export const getFieldPropsFromUiSchema = (
  uischema: ControlElement,
): Record<string, unknown> | undefined => {
  if (isObject(uischema.options?.fieldProps)) {
    return uischema.options?.fieldProps;
  }
};

export const getInputPropsFromUiSchema = (
  uischema: ControlElement,
): Record<string, unknown> | undefined => {
  if (isObject(uischema.options?.fieldProps)) {
    return uischema.options?.inputProps;
  }
};

export const extractOneOfSubSchemaNames = (schema: JsonSchema): string[] => {
  return (
    schema.oneOf
      ?.map(({ $ref }) => $ref && extractOneOfSubSchemaName($ref))
      .filter(isString) ?? []
  );
};

const extractOneOfSubSchemaName = (path: string) => {
  const match = path.match(/(?<name>\w+)$/);
  return match?.groups?.name;
};

export * from './rules';
export * from './testers';
export * from './utils';
