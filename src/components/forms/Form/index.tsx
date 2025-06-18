// Forked from https://github.com/react-component/field-form
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  FormEvent,
  FormHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react';
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';

import FormActions from './compounds/Actions';
import FormButtonReset from './compounds/ButtonReset';
import FormButtonSubmit from './compounds/ButtonSubmit';
import Field from './compounds/Field';
import FieldContext, { HOOK_MARK } from './compounds/Field/FieldContext';
import Group from './compounds/Group';
import List from './compounds/List';
import FormSection from './compounds/Section';
import FormSectionBody from './compounds/SectionBody';
import FormSectionTitle from './compounds/SectionTitle';
import type { FormContextProps } from './contexts/FormContext';
import FormContext from './contexts/FormContext';
import type { InternalFormContextType } from './contexts/contexts';
import { InternalFormContext } from './contexts/contexts';
import useForm from './hooks/useForm';
import type {
  Callbacks,
  FieldData,
  FormInstance,
  InternalFormInstance,
  Store,
  ValidateMessages,
} from './interface';
import { isSimilar } from './utils/valueUtil';

type BaseFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'children'
>;

type RenderProps = (
  values: Store,
  form: FormInstance,
) => JSX.Element | ReactNode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormProps<Values = any> = Omit<
  BaseFormProps,
  'children' | 'className' | 'style'
> &
  Spacings &
  DataTestId & {
    initialValues?: Store;
    form?: FormInstance<Values>;
    children?: RenderProps | ReactNode;
    fields?: FieldData[];
    name?: string;
    validateMessages?: ValidateMessages;
    onValuesChange?: Callbacks<Values>['onValuesChange'];
    onFieldsChange?: Callbacks<Values>['onFieldsChange'];
    onFinish?: Callbacks<Values>['onFinish'];
    onFinishFailed?: Callbacks<Values>['onFinishFailed'];
    validateTrigger?: string | string[] | false;
    preserve?: boolean;
    withResetOnSuccess?: boolean;
    withSubmitOnEnter?: boolean;
  };

const Form = forwardRef<FormInstance, FormProps>(
  (
    {
      autoComplete = 'off',
      name = '',
      initialValues,
      fields,
      form,
      preserve,
      children,
      validateMessages,
      validateTrigger = 'onChange',
      onValuesChange,
      onFieldsChange,
      onFinish,
      onFinishFailed,
      withResetOnSuccess,
      withSubmitOnEnter = true,
      margin,
      padding,
      ...restProps
    },
    ref,
  ) => {
    const formContext: FormContextProps = useContext(FormContext);

    // We customize handle event since Context will make all the consumer re-render:
    // https://reactjs.org/docs/context.html#contextprovider
    const [formInstance] = useForm(form);
    const {
      useSubscribe,
      setInitialValues,
      setCallbacks,
      setValidateMessages,
      setPreserve,
      destroyForm,
    } =
      (formInstance as InternalFormInstance).getInternalHooks(HOOK_MARK) || {};

    // Pass ref with form instance
    useImperativeHandle(ref, () => formInstance);

    // Register form into Context
    useEffect(() => {
      formContext.registerForm(name, formInstance);
      return () => {
        formContext.unregisterForm(name);
      };
    }, [formContext, formInstance, name]);

    // Pass props to store
    setValidateMessages?.({
      ...formContext.validateMessages,
      ...validateMessages,
    });
    setCallbacks?.({
      onValuesChange,
      onFieldsChange: (changedFields: FieldData[], ...rest) => {
        formContext.triggerFormChange(name, changedFields);

        if (onFieldsChange) {
          onFieldsChange(changedFields, ...rest);
        }
      },
      onFinish: async (values: Store) => {
        formContext.triggerFormFinish(name, values);

        if (onFinish) {
          await onFinish(values);
          withResetOnSuccess && formInstance.resetFields();
        }
      },
      onFinishFailed,
    });
    setPreserve?.(preserve);
    setInitialValues?.(initialValues as Store, true);
    useEffect(() => destroyForm, [destroyForm]);

    // Prepare children by `children` type
    let childrenNode: ReactNode;
    const childrenRenderProps = isFunction(children);
    if (childrenRenderProps) {
      const values = formInstance.getFieldsValue(true);
      childrenNode = (children as RenderProps)(values, formInstance);
    } else {
      childrenNode = children;
    }

    // Not use subscribe when using render props
    useSubscribe?.(!childrenRenderProps);

    // Listen if fields provided. We use ref to save prev data here to avoid additional render
    const prevFieldsRef = useRef<FieldData[] | undefined>();
    useEffect(() => {
      if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
        formInstance.setFields(fields || []);
      }
      prevFieldsRef.current = fields;
    }, [fields, formInstance]);

    const formContextValue = useMemo(
      () => ({
        ...(formInstance as InternalFormInstance),
        validateTrigger,
      }),
      [formInstance, validateTrigger],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      formInstance.submit();
    };

    const handleReset = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      formInstance.resetFields();
      restProps.onReset?.(event);
    };

    const wrapperNode = (
      <FieldContext.Provider value={formContextValue}>
        {childrenNode}
      </FieldContext.Provider>
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
      if (!withSubmitOnEnter && event.key === 'Enter') {
        event.preventDefault();
      }
    };

    const contextValue = useMemo<InternalFormContextType>(
      () => ({
        form: formInstance,
      }),
      [formInstance],
    );

    return withSpacing(
      <InternalFormContext.Provider value={contextValue}>
        <form
          {...restProps}
          autoComplete={autoComplete}
          data-testid="form"
          onKeyDown={handleKeyDown}
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          {wrapperNode}
        </form>
      </InternalFormContext.Provider>,
      { margin, padding },
    );
  },
);

type CompoundedType = typeof Form & {
  Actions: typeof FormActions;
  ButtonReset: typeof FormButtonReset;
  ButtonSubmit: typeof FormButtonSubmit;
  Field: typeof Field;
  Group: typeof Group;
  List: typeof List;
  Section: typeof FormSection;
  SectionBody: typeof FormSectionBody;
  SectionTitle: typeof FormSectionTitle;
};

Form.displayName = 'Form';

const Compounded = Form as CompoundedType;
Compounded.Actions = FormActions;
Compounded.ButtonReset = FormButtonReset;
Compounded.ButtonSubmit = FormButtonSubmit;
Compounded.Field = Field;
Compounded.Group = Group;
Compounded.List = List;
Compounded.Section = FormSection;
Compounded.SectionBody = FormSectionBody;
Compounded.SectionTitle = FormSectionTitle;

export default Compounded;
