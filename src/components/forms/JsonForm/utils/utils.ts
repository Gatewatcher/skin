import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { JsonSchema } from '@jsonforms/core';

export const parseJson = (value: unknown) => {
  if (!isString(value)) {
    throw new TypeError('${name} must be a string');
  }

  return JSON.parse(value);
};

const getJsonType = (value: unknown) => {
  if (typeof value !== 'object') {
    return typeof value;
  }

  if (Array.isArray(value)) {
    return 'array';
  }
  if (value === null) {
    return 'null';
  }

  return 'object';
};

export const assertJsonType = (
  object: unknown,
  expectedType: ReturnType<typeof getJsonType>,
) => {
  const type = getJsonType(object);

  if (type !== expectedType) {
    throw new TypeError(
      `\${name} must be a ${expectedType} (current: ${type})`,
    );
  }
};

export const getSelectOptionsFromSchema = (schema: JsonSchema) => {
  return schema.oneOf?.map(item => ({
    label: item.title ?? item.const,
    value: item.const,
  }));
};
