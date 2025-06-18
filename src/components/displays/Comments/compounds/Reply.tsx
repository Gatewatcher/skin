import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { Rule } from '@/skin/forms';
import { Form, Input, useForm, useValidity, useWatch } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import Avatar from '../../Avatar';
import type {
  CommentOnSubmit,
  CommentUsername,
  OnSubmitValues,
} from '../types';
import { calcMarginLeft, getAvatarColorGenerator, getUsername } from '../utils';

export type CommentsReplyProps = DataTestId & {
  depth?: number;
  isLoading?: boolean;
  label?: string;
  name: string;
  onSubmit: CommentOnSubmit;
  placeholder?: string;
  rules?: Rule[];
  submitText?: string;
  username: CommentUsername;
};

const Reply = ({
  'data-testid': testId = 'comments-reply',
  depth = 0,
  isLoading,
  label = 'Message',
  name,
  onSubmit,
  placeholder,
  rules,
  submitText = 'Reply',
  username,
}: CommentsReplyProps) => {
  const [form] = useForm();

  const message = useWatch<string>(name, form) || '';
  const { isValid } = useValidity(form);

  const handleSubmit = async (values: OnSubmitValues) => {
    await onSubmit(values[name]);
  };

  return (
    <Form form={form} onFinish={handleSubmit} withResetOnSuccess>
      <Stack
        alignItems="flex-start"
        data-testid={testId}
        gap={6}
        style={{ marginLeft: calcMarginLeft(depth) }}
      >
        <Avatar
          colorGenerator={getAvatarColorGenerator(username)}
          size="large"
          username={getUsername(username)}
        />

        <Stack direction="column" flexGrow={1} gap={4}>
          <Form.Field
            messageVariables={{ name: label }}
            name={name}
            rules={rules}
          >
            <Input.TextArea
              placeholder={placeholder}
              rows={3}
              withLabel={false}
            />
          </Form.Field>

          <Form.ButtonSubmit
            disabled={!message.length || !isValid}
            isLoading={isLoading}
          >
            {submitText}
          </Form.ButtonSubmit>
        </Stack>
      </Stack>
    </Form>
  );
};

export default Reply;
