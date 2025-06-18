import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';

import type {
  FieldData,
  FormInstance,
  Store,
  ValidateMessages,
} from '../interface';

export type Forms = Record<string, FormInstance>;

export interface FormChangeInfo {
  changedFields: FieldData[];
  forms: Forms;
}

export interface FormFinishInfo {
  values: Store;
  forms: Forms;
}

export interface FormProviderProps {
  validateMessages?: ValidateMessages;
  onFormChange?: (name: string, info: FormChangeInfo) => void;
  onFormFinish?: (name: string, info: FormFinishInfo) => void;
  children?: ReactNode;
}

export interface FormContextProps extends FormProviderProps {
  triggerFormChange: (name: string, changedFields: FieldData[]) => void;
  triggerFormFinish: (name: string, values: Store) => void;
  registerForm: (name: string, form: FormInstance) => void;
  unregisterForm: (name: string) => void;
}

const FormContext = createContext<FormContextProps>({
  triggerFormChange: () => {},
  triggerFormFinish: () => {},
  registerForm: () => {},
  unregisterForm: () => {},
});

const FormProvider: FunctionComponent<FormProviderProps> = ({
  validateMessages,
  onFormChange,
  onFormFinish,
  children,
}) => {
  const formContext = useContext(FormContext);

  const formsRef = useRef<Forms>({});

  return (
    <FormContext.Provider
      value={{
        ...formContext,
        validateMessages: {
          ...formContext.validateMessages,
          ...validateMessages,
        },

        // =========================================================
        // =                  Global Form Control                  =
        // =========================================================
        triggerFormChange: (name, changedFields) => {
          if (onFormChange) {
            onFormChange(name, {
              changedFields,
              forms: formsRef.current,
            });
          }

          formContext.triggerFormChange(name, changedFields);
        },
        triggerFormFinish: (name, values) => {
          if (onFormFinish) {
            onFormFinish(name, {
              values,
              forms: formsRef.current,
            });
          }

          formContext.triggerFormFinish(name, values);
        },
        registerForm: (name, form) => {
          if (name) {
            formsRef.current = {
              ...formsRef.current,
              [name]: form,
            };
          }

          formContext.registerForm(name, form);
        },
        unregisterForm: name => {
          const newForms = { ...formsRef.current };
          delete newForms[name];
          formsRef.current = newForms;

          formContext.unregisterForm(name);
        },
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider };

export default FormContext;
