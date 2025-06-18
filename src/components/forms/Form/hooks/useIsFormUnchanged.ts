import {
  isObjectDeepEqual,
  removeEmpty,
} from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import { useEffect, useState } from 'react';

import { isInternalFormInstance } from '@/skin/forms/Form/utils/typeUtil';

import { HOOK_MARK } from '../compounds/Field/FieldContext';
import type { FormInstance } from '../interface';

function useIsFormUnchanged(form: FormInstance) {
  const [isUnchanged, setIsUnchanged] = useState(true);

  const isValidForm = isInternalFormInstance(form) && form._init;

  useEffect(() => {
    if (!isValidForm) {
      consoleWarn(
        'useIsFormUnchanged requires a form instance since it can not auto detect from context.',
      );
      return;
    }
    const { getInternalHooks } = form;

    const { registerWatch } = getInternalHooks(HOOK_MARK) || {};

    const cancelRegister = registerWatch?.(currentValues => {
      setTimeout(() => {
        const { getInitialValues } = getInternalHooks(HOOK_MARK) || {};
        const initialValues = getInitialValues?.() || {};
        setIsUnchanged(
          isObjectDeepEqual(
            removeEmpty(initialValues),
            removeEmpty(currentValues),
          ),
        );
      }, 0);
    });

    return cancelRegister;
  }, [isValidForm, form]);

  return isUnchanged;
}

export default useIsFormUnchanged;
