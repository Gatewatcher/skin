import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import Form from '../';
import useForm from '../hooks/useForm';

const PreserveExample = () => {
  const [form] = useForm();

  return (
    <Form
      onFinish={values => {
        console.log('Submit:', values);
      }}
      form={form}
      initialValues={{ test: 'bamboo', markdown: '# markdown' }}
    >
      <Form.Field shouldUpdate>
        {() => (
          <>
            isLoading
            <Form.Field name="test" preserve={false}>
              <Input.Text />
            </Form.Field>
          </>
        )}
      </Form.Field>

      <Form.Field name="markdown">
        <Input.Markdown />
      </Form.Field>

      <Stack gap={6}>
        <Form.Actions form={form} />
      </Stack>
    </Form>
  );
};

export default PreserveExample;
