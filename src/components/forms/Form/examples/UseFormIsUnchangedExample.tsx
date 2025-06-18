import { useState } from 'react';

import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import Form from '../';
import useForm from '../hooks/useForm';

const UseFormIsUnchangedExample = () => {
  const [form] = useForm();
  const [initialValues, setInitialValues] = useState({ test: 'bamboo' });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      onFinish={values => {
        console.log('Submit:', values);
        setIsLoading(true);
        setTimeout(() => {
          setInitialValues(values);
          setIsLoading(false);
        }, 2000);
      }}
      form={form}
      initialValues={initialValues}
    >
      <Form.Field shouldUpdate>
        {() => (
          <>
            <Form.Field name="test" preserve={false}>
              <Input.Text />
            </Form.Field>
            <Form.Field name="test2" preserve={false}>
              <Input.Text />
            </Form.Field>
          </>
        )}
      </Form.Field>

      <Stack gap={6}>
        <Form.Actions form={form} isLoading={isLoading} />
      </Stack>
    </Form>
  );
};

export default UseFormIsUnchangedExample;
