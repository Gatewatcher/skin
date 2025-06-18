import { Input } from '@/skin/forms';

import Form from '../';
import useForm from '../hooks/useForm';
import useWatch from '../hooks/useWatch';

const UseWatchListExample = () => {
  const [form] = useForm();
  const users = useWatch<string[]>(['users'], form) || [];

  console.log('values', users);

  return (
    <div>
      <Form form={form}>
        list length:{users.length}
        <br />
        Users: {JSON.stringify(users, null, 2)}
        <Form.Field name="main">
          <Input.Text />
        </Form.Field>
        <Form.List initialValue={['bamboo', 'light']} name="users">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map(({ key, ...field }, index) => (
                  <Form.Field key={key} {...field} rules={[{ required: true }]}>
                    {control => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {index + 1}
                        <Input.Text {...control} />
                        <a onClick={() => remove(index)}>Remove</a>
                      </div>
                    )}
                  </Form.Field>
                ))}
                <button onClick={() => add()} type="button">
                  + New User
                </button>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};

export default UseWatchListExample;
