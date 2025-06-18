import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import type { ReactNode } from 'react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { stringifyOrRandomize } from '@/skin/forms/Form/utils/stringifyOrRandomize';

import FieldContext, { HOOK_MARK } from '../compounds/Field/FieldContext';
import type {
  FormInstance,
  InternalFormInstance,
  NamePath,
  Store,
} from '../interface';
import { getNamePath, getValue } from '../utils/valueUtil';

type ReturnPromise<T> = T extends Promise<infer ValueType> ? ValueType : never;
type GetGeneric<TForm extends FormInstance> = ReturnPromise<
  ReturnType<TForm['validateFields']>
>;

function useWatch<
  TDependencies1 extends keyof GetGeneric<TForm>,
  TForm extends FormInstance,
  TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1],
  TDependencies3 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2],
  TDependencies4 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3],
>(
  dependencies: [
    TDependencies1,
    TDependencies2,
    TDependencies3,
    TDependencies4,
  ],
  form?: TForm,
): GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3][TDependencies4];

function useWatch<
  TDependencies1 extends keyof GetGeneric<TForm>,
  TForm extends FormInstance,
  TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1],
  TDependencies3 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2],
>(
  dependencies: [TDependencies1, TDependencies2, TDependencies3],
  form?: TForm,
): GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3];

function useWatch<
  TDependencies1 extends keyof GetGeneric<TForm>,
  TForm extends FormInstance,
  TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1],
>(
  dependencies: [TDependencies1, TDependencies2],
  form?: TForm,
): GetGeneric<TForm>[TDependencies1][TDependencies2];

function useWatch<
  TDependencies extends keyof GetGeneric<TForm>,
  TForm extends FormInstance,
>(
  dependencies: TDependencies | [TDependencies],
  form?: TForm,
): GetGeneric<TForm>[TDependencies];

function useWatch<TForm extends FormInstance>(
  dependencies: [],
  form?: TForm,
): GetGeneric<TForm>;

function useWatch<TForm extends FormInstance>(
  dependencies: NamePath,
  form?: TForm,
): ReactNode;

function useWatch<ValueType = Store>(
  dependencies: NamePath,
  form?: FormInstance,
): ValueType;

function useWatch<T>(...args: [NamePath, T]) {
  const [dependencies = [], form] = args;

  const [value, setValue] = useState<T>();

  const valueStr = useMemo(() => stringifyOrRandomize(value), [value]);
  const valueStrRef = useRef(valueStr);
  valueStrRef.current = valueStr;

  const fieldContext = useContext(FieldContext);
  const formInstance = (form as InternalFormInstance) || fieldContext;
  const isValidForm = formInstance && formInstance._init;

  if (args.length === 2 ? (form ? false : !isValidForm) : !isValidForm) {
    consoleWarn(
      'useWatch requires a form instance since it can not auto detect from context.',
    );
  }

  const namePath = getNamePath(dependencies);
  const namePathRef = useRef(namePath);
  namePathRef.current = namePath;

  useEffect(
    () => {
      // Skip if not exist form instance
      if (!isValidForm) {
        return;
      }

      const { getFieldsValue, getInternalHooks } = formInstance;
      const { registerWatch } = getInternalHooks(HOOK_MARK) || {};

      const cancelRegister = registerWatch?.(store => {
        const newValue = getValue(store, namePathRef.current);
        const nextValueStr = stringifyOrRandomize(newValue);

        // Compare stringify in case it's a nested object
        if (valueStrRef.current !== nextValueStr) {
          valueStrRef.current = nextValueStr;
          setValue(newValue as T);
        }
      });

      // TODO: We can improve this perf in future
      const initialValue = getValue(getFieldsValue(), namePathRef.current);
      setValue(initialValue as T);

      return cancelRegister;
    },

    // We do not need re-register since namePath content is the same
    [isValidForm, formInstance],
  );

  return value;
}

export default useWatch;
