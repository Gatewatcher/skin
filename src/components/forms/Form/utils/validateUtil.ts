import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import RawAsyncValidator from 'async-validator';
import { cloneElement, isValidElement } from 'react';

import type {
  InternalNamePath,
  RuleError,
  RuleObject,
  StoreValue,
  ValidateOptions,
} from '../interface';
import { defaultValidateMessages } from './messages';
import { setValues } from './valueUtil';

// Remove incorrect original ts define
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AsyncValidator: any = RawAsyncValidator;

// Replace with template.
//   `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
const replaceMessage = (
  template: string,
  kv: Record<string, string>,
): string => {
  return template.replace(/\$\{\w+\}/g, (str: string) => {
    const key = str.slice(2, -1);
    return kv[key];
  });
};

const CODE_LOGIC_ERROR = 'CODE_LOGIC_ERROR';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationError = { errors: { message: any }[] };

const validateRule = async (
  name: string,
  value: StoreValue,
  rule: RuleObject,
  options: ValidateOptions,
  messageVariables?: Record<string, string>,
): Promise<string[]> => {
  const cloneRule = { ...rule };

  // Bug of `async-validator`
  // https://github.com/react-component/field-form/issues/316
  // https://github.com/react-component/field-form/issues/313
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (cloneRule as any).ruleIndex;

  if (cloneRule.validator) {
    const originValidator = cloneRule.validator;
    cloneRule.validator = (...args) => {
      try {
        return originValidator(...args);
      } catch (error) {
        console.error(error);
        return Promise.reject(CODE_LOGIC_ERROR);
      }
    };
  }

  // We should special handle array validate
  let subRuleField: RuleObject | null = null;
  if (cloneRule && cloneRule.type === 'array' && cloneRule.defaultField) {
    subRuleField = cloneRule.defaultField;
    delete cloneRule.defaultField;
  }

  const validator = new AsyncValidator({
    [name]: [cloneRule],
  });

  const messages = setValues(
    {},
    defaultValidateMessages,
    options.validateMessages,
  );
  validator.messages(messages);

  let result: string[] = [];

  try {
    await Promise.resolve(
      validator.validate({ [name]: value }, { ...options }),
    );
  } catch (errObj) {
    if ((errObj as ValidationError).errors) {
      result = (errObj as ValidationError).errors.map(
        ({ message }, index: number) => {
          const mergedMessage =
            message === CODE_LOGIC_ERROR ? messages?.default : message;

          return isValidElement(mergedMessage)
            ? // Wrap ReactNode with `key`
              cloneElement(mergedMessage, { key: `error_${index}` })
            : mergedMessage;
        },
      );
    }
  }

  if (!result.length && subRuleField) {
    const subResults: string[][] = await Promise.all(
      (value as StoreValue[]).map((subValue: StoreValue, i: number) =>
        validateRule(
          `${name}.${i}`,
          subValue,
          subRuleField as RuleObject,
          options,
          messageVariables,
        ),
      ),
    );

    return subResults.reduce((prev, errors) => [...prev, ...errors], []);
  }

  // Replace message with variables
  const kv = {
    ...(rule as Record<string, string | number>),
    name,
    enum: (rule.enum || []).join(', '),
    ...messageVariables,
  };

  const fillVariableResult: string[] = result.map((error: string) => {
    if (typeof error === 'string') {
      return replaceMessage(error, kv);
    }
    return error;
  });

  return fillVariableResult;
};

// We use `async-validator` to validate the value.
// But only check one value in a time to avoid namePath validate issue.
export const validateRules = (
  namePath: InternalNamePath,
  value: StoreValue,
  rules: RuleObject[],
  options: ValidateOptions,
  validateFirst: boolean | 'parallel',
  messageVariables?: Record<string, string>,
) => {
  const name = namePath.join('.');

  // Fill rule with context
  const filledRules: RuleObject[] = rules
    .map((currentRule, ruleIndex) => {
      const originValidatorFunc = currentRule.validator;
      const cloneRule = {
        ...currentRule,
        ruleIndex,
      };

      // Replace validator if needed
      if (originValidatorFunc) {
        cloneRule.validator = (
          rule: RuleObject,
          val: StoreValue,
          callback: (error?: string) => void,
        ) => {
          let hasPromise: boolean | void = false;

          // Wrap callback only accept when promise not provided
          const wrappedCallback = (...args: string[]) => {
            // Wait a tick to make sure return type is a promise
            Promise.resolve().then(() => {
              consoleWarn(
                'Your validator function has already return a promise. `callback` will be ignored.',
              );
              if (!hasPromise) {
                callback(...args);
              }
            });
          };

          // Get promise
          const promise = originValidatorFunc(
            rule,
            val,
            wrappedCallback as (error?: string | undefined) => void,
          );
          hasPromise =
            promise && isFunction(promise.then) && isFunction(promise.catch);

          // 1. Use promise as the first priority.
          // 2. If promise not exist, use callback with warning instead
          if (!hasPromise) {
            consoleWarn(
              '`callback` is deprecated. Please return a promise instead.',
            );
          }

          if (hasPromise) {
            (promise as Promise<void>)
              .then(() => {
                callback();
              })
              .catch(err => {
                callback(err || ' ');
              });
          }
        };
      }

      return cloneRule;
    })
    .sort(
      (
        { warningOnly: w1, ruleIndex: i1 },
        { warningOnly: w2, ruleIndex: i2 },
      ) => {
        if (!!w1 === !!w2) {
          // Let keep origin order
          return i1 - i2;
        }

        if (w1) {
          return 1;
        }

        return -1;
      },
    );

  // Do validate rules
  let summaryPromise: Promise<RuleError[]>;

  if (validateFirst === true) {
    // >>>>> Validate by serialization
    /* eslint-disable no-async-promise-executor */
    summaryPromise = new Promise(async (resolve, reject) => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < filledRules.length; i += 1) {
        const rule = filledRules[i];
        const errors = await validateRule(
          name,
          value,
          rule,
          options,
          messageVariables,
        );
        if (errors.length) {
          reject([{ errors, rule }]);
          return;
        }
      }
      /* eslint-enable */

      resolve([]);
    });
  } else {
    // >>>>> Validate by parallel
    const rulePromises: Promise<RuleError>[] = filledRules.map(rule =>
      validateRule(name, value, rule, options, messageVariables).then(
        errors => ({ errors, rule }),
      ),
    );

    summaryPromise = (
      validateFirst
        ? finishOnFirstFailed(rulePromises)
        : finishOnAllFailed(rulePromises)
    ).then((errors: RuleError[]): RuleError[] | Promise<RuleError[]> => {
      // Always change to rejection for Field to catch
      return Promise.reject<RuleError[]>(errors);
    });
  }

  // Internal catch error to avoid console error log.
  summaryPromise.catch(e => e);

  return summaryPromise;
};

const finishOnAllFailed = async (
  rulePromises: Promise<RuleError>[],
): Promise<RuleError[]> => {
  return Promise.all(rulePromises).then(
    (errorsList: RuleError[]): RuleError[] | Promise<RuleError[]> => {
      const errors: RuleError[] = ([] as RuleError[]).concat(...errorsList);

      return errors;
    },
  );
};

const finishOnFirstFailed = async (
  rulePromises: Promise<RuleError>[],
): Promise<RuleError[]> => {
  let count = 0;

  return new Promise(resolve => {
    rulePromises.forEach(promise => {
      promise.then(ruleError => {
        if (ruleError.errors.length) {
          resolve([ruleError]);
        }

        count += 1;
        if (count === rulePromises.length) {
          resolve([]);
        }
      });
    });
  });
};
