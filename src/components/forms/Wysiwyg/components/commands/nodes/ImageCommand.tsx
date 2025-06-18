import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { Dropdown } from '@/skin/displays';
import { Form, Input, useForm } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { CommandButton } from '../../CommandButton';
import { INSERT_IMAGE_COMMAND } from '../../plugins/ImagePlugin';

type FormValues = {
  src: string;
  alt?: string;
};

export const ImageCommand = () => {
  const [editor] = useLexicalComposerContext();
  const [form] = useForm();

  const handleFinish = ({ alt, src }: FormValues) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: alt });
  };

  return (
    <Dropdown
      content={
        <Dropdown.Content>
          <Form form={form} onFinish={handleFinish}>
            <Form.SectionBody>
              <Form.Field name="src" required>
                <Input.Text placeholder="src" />
              </Form.Field>
              <Form.Field name="alt">
                <Input.Text placeholder="alt" />
              </Form.Field>

              <Stack.Item alignSelf="flex-end">
                <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
              </Stack.Item>
            </Form.SectionBody>
          </Form>
        </Dropdown.Content>
      }
      padding={4}
      triggerOn="click"
    >
      <CommandButton name="Image" />
    </Dropdown>
  );
};
