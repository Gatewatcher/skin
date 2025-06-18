import { Input } from '@/skin/forms';

import Form from '../';
import type { ListField } from '../compounds/List';
import useForm from '../hooks/useForm';
import useWatch from '../hooks/useWatch';

const ListExample = () => {
  const [form] = useForm();
  const users = useWatch(['users'], form) || [];

  console.log('users values', users);

  return (
    <div>
      <h3>List of Form</h3>
      <p>You can set Field as List</p>

      <Form
        onFieldsChange={(_, fields) => {
          console.log('*******fields change:', fields);
        }}
        onValuesChange={(_, values) => {
          console.log('*******values change:', values);
        }}
        form={form}
        preserve={false}
      >
        <Form.Field shouldUpdate>
          {() => JSON.stringify(form.getFieldsValue(), null, 2)}
        </Form.Field>
        <Form.List
          rules={[
            {
              message: 'Must have at least 2 user!',
              validator: async (_, value: string[]) => {
                if (value.length < 2) {
                  throw new Error();
                }
              },
            },
          ]}
          initialValue={['bamboo', 'light']}
          name="users"
        >
          {(fields: ListField[], { add, remove }, { errors }) => {
            return (
              <div>
                <h4>List of `users`</h4>
                {fields.map(({ key, ...field }, index) => (
                  <Form.Field {...field} key={key} rules={[{ required: true }]}>
                    {control => (
                      <div style={{ position: 'relative' }}>
                        <Input.Text {...control} />
                        <a
                          onClick={() => {
                            remove(index);
                          }}
                          style={{ position: 'absolute', top: 12, right: -300 }}
                        >
                          Remove
                        </a>
                      </div>
                    )}
                  </Form.Field>
                ))}

                <ul>
                  {errors.map(err => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    add();
                  }}
                  type="button"
                >
                  + New User
                </button>
                <button
                  onClick={() => {
                    remove(1);
                  }}
                  type="button"
                >
                  Remove index: 1
                </button>
              </div>
            );
          }}
        </Form.List>
      </Form>

      <div style={{ border: '1px solid #000', padding: 15 }}>
        <h4>Out Of Form</h4>
        <button
          onClick={() => {
            form.setFieldsValue({
              users: ['light', 'bamboo'],
            });
          }}
          type="button"
        >
          Set List Value
        </button>

        <button
          onClick={() => {
            console.log('`users` touched:', form.isFieldTouched('users'));
          }}
          type="button"
        >
          Is List touched
        </button>
      </div>
    </div>
  );
};

export default ListExample;
