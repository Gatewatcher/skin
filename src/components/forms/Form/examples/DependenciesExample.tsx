import { Input } from '@/skin/forms';

import Form from '../';
import useForm from '../hooks/useForm';

const DependenciesExample = () => {
  const [form] = useForm();
  return (
    <Form form={form} preserve={false}>
      <Form.Field name="name" rules={[{ required: true }]}>
        <Input.Text placeholder="Username" />
      </Form.Field>
      <Form.Field name="name" rules={[{ required: true }]}>
        <Input.TextArea maxLength={10} placeholder="Username" />
      </Form.Field>
      <Form.Field
        rules={[
          { required: true },
          {
            max: 50,
            message: 'Value should be less than 50 character',
          },
        ]}
        name="name"
      >
        <Input.Text label="Name" placeholder="Username" />
      </Form.Field>
      <Form.Field dependencies={['name']}>
        {() => {
          return form.getFieldValue('name') === 'password' ? (
            <Form.Field name="password">
              <Input.Text placeholder="Password" />
            </Form.Field>
          ) : null;
        }}
      </Form.Field>

      <Form.Field dependencies={['password']}>
        {() => {
          const password = form.getFieldValue('password');
          return password ? (
            <Form.Field name="password2">
              <Input.Text placeholder="Password 2" />
            </Form.Field>
          ) : null;
        }}
      </Form.Field>
    </Form>
  );
};

export default DependenciesExample;
