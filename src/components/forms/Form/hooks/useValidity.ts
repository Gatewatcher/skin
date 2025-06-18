import { useContext, useEffect, useState } from 'react';

import FieldContext, { HOOK_MARK } from '../compounds/Field/FieldContext';
import type { FormInstance, InternalFormInstance } from '../interface';

const useValidity = (form: FormInstance) => {
  const [isValid, setIsValid] = useState<boolean>();
  const fieldContext = useContext(FieldContext);
  const formInstance = (form as InternalFormInstance) || fieldContext;

  const isValidForm =
    formInstance && (formInstance as InternalFormInstance)._init;

  useEffect(() => {
    if (!isValidForm) {
      return;
    }

    const { getFieldsError, getInternalHooks } = formInstance;
    const { registerWatch } = getInternalHooks(HOOK_MARK) || {};

    const checkErrors = () => {
      const errors = getFieldsError();
      setIsValid(errors.every(item => item.errors.length === 0));
    };

    const cancelRegister = registerWatch?.(() => {
      // check could be done after internal validation
      setTimeout(checkErrors, 0);
    });

    return cancelRegister;
  }, [isValidForm, formInstance]);

  return { isValid };
};

export default useValidity;
