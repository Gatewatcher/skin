import { isNumber, isString } from '@gatewatcher/bistoury/utils-lang';
import type { JsonSchema } from '@jsonforms/core';

import type { Rule } from '@/skin/forms';
import { type RuleObject } from '@/skin/forms/Form/interface';

import type { BaseValidator } from './validators';
import { validators } from './validators';
import { and, ifElse, or } from './validators/combinators';

const getFormattedStringOrJMESPathRules = (
  formatValidator: BaseValidator<[RuleObject, unknown]>,
  formatName: string,
) => [
  {
    validator: and(
      validators.required(),
      ifElse({
        if: validators.jmesPathPartial(),
        then: validators.jmesPath(),
        else: formatValidator,
      }).message(`$\{name} must be a ${formatName} or a JMESPath string`),
    ),
  },
];

const getFormattedJsonStringOrJMESPathRules = (
  formatValidator: BaseValidator<[RuleObject, unknown]>,
  jsonTypeName: string,
) => [
  {
    validator: and(
      validators.required(),
      or(validators.json(), validators.jmesPathPartial()).message(
        `$\{name} must be a ${jsonTypeName} or a JMESPath string`,
      ),
      ifElse({
        if: validators.json(),
        then: formatValidator,
      }),
      ifElse({
        if: validators.jmesPathPartial(),
        then: validators.jmesPath(),
      }),
    ),
  },
];

export const getRulesFromSchema = (schema: JsonSchema): Rule[] => {
  if (schema.type === 'number') {
    return getNumberRulesFromSchema(schema);
  }
  return getStringRulesFromSchema(schema);
};

export const getStringRulesFromSchema = (schema: JsonSchema): Rule[] => {
  switch (schema.format) {
    case 'email':
      return [{ validator: and(validators.required(), validators.email()) }];
    case 'number':
      return getFormattedJsonStringOrJMESPathRules(
        validators.number(),
        'number',
      );
    case 'boolean':
      return getFormattedJsonStringOrJMESPathRules(
        validators.boolean(),
        'boolean',
      );
    case 'array':
      return getFormattedJsonStringOrJMESPathRules(validators.array(), 'array');
    case 'object':
      return getFormattedJsonStringOrJMESPathRules(
        validators.object(),
        'object',
      );
    case 'date':
      return getFormattedStringOrJMESPathRules(validators.date(), 'date');
    case 'time':
      return getFormattedStringOrJMESPathRules(validators.time(), 'time');
    case 'date-time':
      return getFormattedStringOrJMESPathRules(
        validators.dateTime(),
        'date-time',
      );
    case 'ipv4':
      return getFormattedStringOrJMESPathRules(
        validators.ip({ version: 'v4' }),
        'IPv4',
      );
    case 'ipv6':
      return getFormattedStringOrJMESPathRules(
        validators.ip({ version: 'v6' }),
        'IPv6',
      );
    case 'hostname':
      return getFormattedStringOrJMESPathRules(
        validators.hostname(),
        'hostname',
      );
    case 'url':
      return getFormattedStringOrJMESPathRules(validators.uri(), 'URI');
    case 'uuid':
      return getFormattedStringOrJMESPathRules(validators.uuid(), 'UUID');
  }

  return [
    {
      type: 'string',
      min: schema.minLength,
      max: schema.maxLength,
      pattern: getSchemaRegexpPattern(schema),
    },
  ];
};

export const getNumberRulesFromSchema = (schema: JsonSchema): Rule[] => {
  return [
    {
      type: 'number',
      min: getSchemaNumberMin(schema),
      max: getSchemaNumberMax(schema),
      pattern: getSchemaRegexpPattern(schema),
    },
  ];
};

export const getSchemaNumberMin = (schema: JsonSchema) => {
  const { exclusiveMinimum, minimum } = schema;

  // Such a config does not make sense, but we're covered in case it happens
  if (isNumber(exclusiveMinimum) && isNumber(minimum)) {
    return Math.max(exclusiveMinimum + 1, minimum);
  }

  if (isNumber(exclusiveMinimum)) {
    return exclusiveMinimum + 1;
  }

  return minimum && exclusiveMinimum ? minimum + 1 : minimum;
};

export const getSchemaNumberMax = (schema: JsonSchema) => {
  const { exclusiveMaximum, maximum } = schema;

  // Such a config does not make sense, but we're covered in case it happens
  if (isNumber(exclusiveMaximum) && isNumber(maximum)) {
    return Math.max(exclusiveMaximum - 1, maximum);
  }

  if (isNumber(exclusiveMaximum)) {
    return exclusiveMaximum - 1;
  }

  return maximum && exclusiveMaximum ? maximum - 1 : maximum;
};

const getSchemaRegexpPattern = (schema: JsonSchema): RegExp | undefined => {
  if (isString(schema.pattern)) {
    return new RegExp(schema.pattern);
  }
};
