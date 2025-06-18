import type { SelectOption } from '@/skin/forms';

export const generateSelectOptionsFromObject = <T extends string = string>(
  data: Record<T, string>,
): SelectOption<T>[] => {
  return Object.entries(data).map(([value, label]) => ({
    label: label as string,
    value: value as T,
  }));
};

export type GenerateSelectOptionsFromArrayOptions<
  T,
  Value = string,
  Meta = undefined,
> = {
  labelNormalizer: (item: T) => string;
  valueNormalizer: (item: T) => Value;
  metaNormalizer?: (item: T) => Meta;
};

export const generateSelectOptionsFromArray = <
  T,
  Value extends string | number = string,
  Meta = undefined,
>(
  data?: T[],
  options?: GenerateSelectOptionsFromArrayOptions<T, Value, Meta>,
): SelectOption<Value, Meta>[] => {
  const {
    labelNormalizer = () => '',
    valueNormalizer = () => '',
    metaNormalizer,
  } = options || {};

  return (data?.map(item => ({
    label: labelNormalizer(item),
    value: valueNormalizer(item) as Value,
    ...(metaNormalizer && { meta: metaNormalizer(item) }),
  })) || []) as SelectOption<Value, Meta>[];
};

export const generateCommonSelectOptions = <
  T extends { name: string; id: string },
>(
  data?: T[],
): SelectOption[] => {
  return generateSelectOptionsFromArray(data, {
    labelNormalizer: item => item.name,
    valueNormalizer: item => item.id,
  });
};
