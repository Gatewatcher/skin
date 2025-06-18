export type BaseValidator<Args extends unknown[] = []> = {
  (...args: Args): Promise<void>;
};

export type Validator<Args extends unknown[] = []> = BaseValidator<Args> & {
  message: (message: string) => BaseValidator<Args>;
};

export const createValidator = <Args extends unknown[] = []>(
  validateFunction: (...args: Args) => Promise<void>,
): Validator<Args> => {
  const validator = async (...args: Args) => {
    await validateFunction(...args);
  };

  validator.message = (message: string) => {
    return async (...args: Args) => {
      try {
        await validateFunction(...args);
      } catch (_) {
        throw new Error(message);
      }
    };
  };

  return validator;
};
