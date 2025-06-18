import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { Rule } from '@/skin/forms';
import {
  Input,
  Form as SkinForm,
  useForm,
  useValidity,
  useWatch,
} from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { CommentOnSubmit, OnSubmitValues } from '../types';

export type CommentsFormProps = DataTestId & {
  isLoading?: boolean;
  label?: string;
  name: string;
  onSubmit: CommentOnSubmit;
  placeholder?: string;
  rules?: Rule[];
  submitText?: string;
};

const Form = ({
  'data-testid': testId = 'comments-form',
  isLoading,
  label = 'Message',
  name,
  onSubmit,
  placeholder,
  rules,
  submitText = 'Submit',
}: CommentsFormProps) => {
  const [form] = useForm();

  const message = useWatch<string>(name, form) || '';
  const { isValid } = useValidity(form);

  const handleSubmit = async (values: OnSubmitValues) => {
    await onSubmit(values[name]);
  };

  return (
    <SkinForm
      data-testid={testId}
      form={form}
      onFinish={handleSubmit}
      withResetOnSuccess
    >
      <Stack direction="column" gap={4}>
        <SkinForm.Field
          messageVariables={{ name: label }}
          name={name}
          rules={rules}
        >
          <Input.TextArea
            placeholder={placeholder}
            rows={3}
            withLabel={false}
          />
        </SkinForm.Field>

        <SkinForm.ButtonSubmit
          disabled={!message.length || !isValid}
          isLoading={isLoading}
        >
          {submitText}
        </SkinForm.ButtonSubmit>
      </Stack>
    </SkinForm>
  );
};

export default Form;
