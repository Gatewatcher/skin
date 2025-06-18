import { useRef, useState } from 'react';

import { FormStore } from '../FormStore';
import type { FormInstance } from '../interface';

const useForm = <Values = unknown>(
  form?: FormInstance<Values>,
): [FormInstance<Values>] => {
  const formRef = useRef<FormInstance>();
  const [, forceUpdate] = useState({});

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // Create a new FormStore if not provided
      const forceReRender = () => {
        forceUpdate({});
      };

      const formStore: FormStore = new FormStore(forceReRender);

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
};

export default useForm;
