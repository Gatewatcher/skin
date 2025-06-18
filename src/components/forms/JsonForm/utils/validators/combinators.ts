import {
  type BaseValidator,
  type Validator,
  createValidator,
} from './validator';

export const and = <Args extends unknown[] = []>(
  ...validators: BaseValidator<Args>[]
): Validator<Args> => {
  return createValidator(async (...args) => {
    for (const fn of validators) {
      await fn(...args);
    }
  });
};

export const or = <Args extends unknown[] = []>(
  ...validators: BaseValidator<Args>[]
): Validator<Args> => {
  return createValidator(async (...args) => {
    let lastError: unknown = null;

    for (const fn of validators) {
      try {
        await fn(...args);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  });
};

export const not = <Args extends unknown[] = []>(
  validator: BaseValidator<Args>,
): Validator<Args> => {
  return createValidator(async (...args) => {
    let shouldFail: Boolean;

    try {
      await validator(...args);
      shouldFail = true;
    } catch (_) {
      shouldFail = false;
    }

    if (shouldFail) {
      throw new Error();
    }
  });
};

export const ifElse = <Args extends unknown[] = []>(params: {
  if: BaseValidator<Args>;
  then: BaseValidator<Args>;
  else?: BaseValidator<Args>;
}): Validator<Args> => {
  return createValidator(async (...args) => {
    let conditionIsTrue: boolean;

    try {
      await params.if(...args);
      conditionIsTrue = true;
    } catch (_) {
      conditionIsTrue = false;
    }

    if (conditionIsTrue) {
      await params.then(...args);
    } else {
      await params.else?.(...args);
    }
  });
};
