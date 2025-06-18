import { isString } from '@gatewatcher/bistoury/utils-lang';

import type { RuleObject } from '@/skin/forms/Form/interface';
import {
  DATE_REGEXP,
  EMAIL_REGEX,
  HOSTNAME_REGEXP,
  IPV4_REGEXP,
  IPV6_REGEXP,
  TIME_REGEXP,
  UUID_REGEXP,
} from '@/skin/forms/JsonForm/utils/validators/constants';

import { assertJsonType, parseJson } from '../utils';
import { and } from './combinators';
import { type BaseValidator, createValidator } from './validator';

// For more information on JSON Schema formats, see https://json-schema.org/understanding-json-schema/reference/string

const createFieldValidator = (
  validator: BaseValidator<[RuleObject, unknown]>,
) =>
  createValidator(async (rule: RuleObject, value: unknown) => {
    if (!value) {
      return;
    }

    await validator(rule, value);
  });

export const required = () =>
  createValidator(async (rule: RuleObject, value: unknown) => {
    if (rule.required && !value) {
      throw new Error('${name} is required');
    }
  });

export const json = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    if (!isString(value)) {
      throw new TypeError('${name} must be a string');
    }
    JSON.parse(value);
  });

export const object = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    const object = parseJson(value);
    assertJsonType(object, 'object');
  });

export const array = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    const object = parseJson(value);
    assertJsonType(object, 'array');
  });

export const boolean = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    const object = parseJson(value);
    assertJsonType(object, 'boolean');
  });

export const number = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    const object = parseJson(value);
    assertJsonType(object, 'number');
  });

export const dateTime = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    if (!isString(value)) {
      throw new TypeError('${name} must be a string');
    }

    try {
      new Date(value).toISOString();
    } catch (_) {
      throw new Error('${name} must be a date');
    }
  });

export const time = () =>
  createFieldValidator(
    pattern(TIME_REGEXP).message(
      '${name} is not a valid time (HH:MM[:SS][+/-HH[[:]MM]])',
    ),
  );

export const date = () =>
  createFieldValidator(
    and(
      pattern(DATE_REGEXP).message('${name} does not match YYYY-MM-DD'),
      dateTime().message('${name} is not a valid date'),
    ),
  );

export const uuid = () =>
  createFieldValidator(
    pattern(UUID_REGEXP).message('${name} is not a valid UUID'),
  );

export const pattern = (stringOrRegexp: string | RegExp) =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    if (!isString(value)) {
      throw new TypeError('${name} must be a string');
    }

    const regexp = isString(stringOrRegexp)
      ? new RegExp(stringOrRegexp)
      : stringOrRegexp;

    if (!regexp.test(value)) {
      throw new Error();
    }
  });

export const ip = ({ version }: { version: 'v4' | 'v6' }) =>
  createFieldValidator(
    pattern(version === 'v4' ? IPV4_REGEXP : IPV6_REGEXP).message(
      `$\{name} is not a valid IP${version} address`,
    ),
  );

export const ipv6 = () =>
  createFieldValidator(
    pattern(IPV6_REGEXP).message('${name} is not a valid IPv6 address'),
  );

export const email = () =>
  createFieldValidator(
    pattern(EMAIL_REGEX).message('${name} is not a valid email'),
  );

export const hostname = () =>
  createFieldValidator(
    pattern(HOSTNAME_REGEXP).message('${name} is not a valid hostname'),
  );

export const uri = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    if (!isString(value)) {
      throw new TypeError('${name} must be a string');
    }

    new URL(value);
  });

export const jmesPathPartial = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    if (!(isString(value) && value.startsWith('{{'))) {
      throw new Error();
    }
  });

export const jmesPath = () =>
  createFieldValidator(async (_: RuleObject, value: unknown) => {
    if (!(isString(value) && value.match(/{{ .*? }}/))) {
      throw new Error('${name} is not a valid JMESPath');
    }
  });
