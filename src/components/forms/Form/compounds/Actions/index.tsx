import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { ButtonAsyncProps } from '@/skin/actions';
import type { IconName } from '@/skin/displays';
import { Form, useForm } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import {
  DEFAULT_FORM_ACTIONS_RESET_ICON,
  DEFAULT_FORM_ACTIONS_RESET_TEXT,
  DEFAULT_FORM_ACTIONS_SUBMIT_ICON,
  DEFAULT_FORM_ACTIONS_SUBMIT_TEXT,
} from '../../constants';
import useValidity from '../../hooks/useValidity';
import type { FormInstance } from '../../interface';

export type FormActionsProps = DataTestId &
  Pick<ButtonAsyncProps, 'isLoading' | 'type' | 'disabled'> & {
    endElement?: ReactNode;
    form: FormInstance;
    onReset?: ButtonAsyncProps['onClick'];
    onSubmit?: ButtonAsyncProps['onClick'];
    resetIcon?: IconName | null;
    resetText?: string;
    startElement?: ReactNode;
    submitIcon?: IconName | null;
    submitText?: string;
  };

const FormActions = ({
  'data-testid': testId = 'form-actions',
  disabled,
  endElement,
  form: formProps,
  isLoading,
  onReset,
  onSubmit,
  resetIcon = DEFAULT_FORM_ACTIONS_RESET_ICON,
  resetText = DEFAULT_FORM_ACTIONS_RESET_TEXT,
  startElement,
  submitIcon = DEFAULT_FORM_ACTIONS_SUBMIT_ICON,
  submitText = DEFAULT_FORM_ACTIONS_SUBMIT_TEXT,
  type,
}: FormActionsProps) => {
  const [form] = useForm(formProps);
  const { isValid } = useValidity(form);

  return (
    <Stack data-testid={testId} gap={7}>
      {startElement}
      <Form.ButtonReset
        disabled={isLoading}
        onClick={onReset}
        startIcon={resetIcon ? resetIcon : undefined}
        variant="outlined"
      >
        {resetText}
      </Form.ButtonReset>

      <Form.ButtonSubmit
        disabled={
          (isLoading || disabled) ?? (isDefined(isValid) ? !isValid : false)
        }
        isLoading={isLoading}
        onClick={onSubmit}
        startIcon={submitIcon ? submitIcon : undefined}
        type={type}
      >
        {submitText}
      </Form.ButtonSubmit>
      {endElement}
    </Stack>
  );
};

export default FormActions;
