import type { InternalFormInstance } from '@/skin/forms/Form/interface';

export const toArray = <T>(value?: T | T[] | null): T[] => {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export const isInternalFormInstance = (
  form: unknown,
): form is InternalFormInstance => {
  return (
    (form as InternalFormInstance)._init !== undefined &&
    (form as InternalFormInstance).getInternalHooks !== undefined
  );
};
