import { useKeyPressed } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useCallback, useEffect } from 'react';

import type { Rule } from '@/skin/forms';
import { Form, Input, useForm, useValidity, useWatch } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { useCommentContext } from '../context';
import type { OnSubmitValues } from '../types';

export type OnSubmitCallbacks = {
  closeEditMode: () => void;
};

export type CommentsFormUpdateProps = DataTestId & {
  cancelText?: string;
  initialValue?: string;
  isLoading?: boolean;
  label?: string;
  name: string;
  onSubmit: (message: string, methods: OnSubmitCallbacks) => void;
  placeholder?: string;
  rules?: Rule[];
  submitText?: string;
};

const FormUpdate = ({
  cancelText = 'Cancel',
  'data-testid': testId = 'comments-form-update',
  initialValue,
  isLoading,
  label = 'Message',
  name,
  onSubmit,
  placeholder,
  rules,
  submitText = 'Update',
}: CommentsFormUpdateProps) => {
  const [form] = useForm();

  const { setIsEditing, isEditing } = useCommentContext();

  const { isValid } = useValidity(form);
  const message = useWatch<string>(name, form) || '';

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const handleSubmit = (values: OnSubmitValues) => {
    onSubmit(values[name], { closeEditMode: handleCancel });
  };

  const escapedPressed = useKeyPressed('Escape');

  useEffect(() => {
    if (isEditing && escapedPressed) {
      handleCancel();
    }
  }, [escapedPressed, isEditing, handleCancel]);

  return (
    <Form data-testid={testId} form={form} onFinish={handleSubmit}>
      <Form.Field
        initialValue={initialValue}
        messageVariables={{ name: label }}
        name={name}
        rules={rules}
      >
        <Input.TextArea placeholder={placeholder} rows={3} withLabel={false} />
      </Form.Field>

      <Stack gap={4} margin={{ top: 7 }}>
        <Form.ButtonReset onClick={handleCancel} variant="ghosted">
          {cancelText}
        </Form.ButtonReset>
        <Form.ButtonSubmit
          disabled={!isValid || !message.length}
          isLoading={isLoading}
        >
          {submitText}
        </Form.ButtonSubmit>
      </Stack>
    </Form>
  );
};

export default FormUpdate;
