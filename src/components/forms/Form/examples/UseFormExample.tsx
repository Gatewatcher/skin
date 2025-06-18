import { Fragment } from 'react';

import { Button } from '@/skin/actions';
import { Input } from '@/skin/forms';

import Form from '../';
import useForm from '../hooks/useForm';

const list = new Array(0).fill(() => undefined);

interface FormValues {
  username?: string;
  password?: string;
  path1?: {
    path2?: string;
  };
}

const UseFormExample = () => {
  const [form] = useForm<FormValues>();

  return (
    <div>
      <h3>useForm ({list.length} inputs)</h3>

      <Button
        onClick={() => {
          form.setFieldsValue({
            username: 'light',
            password: 'bamboo',
          });
        }}
      >
        Fill values
      </Button>

      <Form form={form}>
        <Fragment>
          <Form.Field name="username">
            <Input.Text placeholder="Username" />
          </Form.Field>
          <Form.Field name="password">
            <Input.Text placeholder="Password" />
          </Form.Field>
          <Form.Field name="username">
            <Input.Text placeholder="Shadow of Username" />
          </Form.Field>
          <Form.Field name={['path1', 'path2']}>
            <Input.Text placeholder="nest" />
          </Form.Field>

          {list.map((_, index) => (
            <Form.Field key={index} name={`field_${index}`}>
              <Input.Text placeholder={`field_${index}`} />
            </Form.Field>
          ))}
        </Fragment>
      </Form>
    </div>
  );
};

export default UseFormExample;
