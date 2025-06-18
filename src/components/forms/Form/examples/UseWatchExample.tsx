import { memo, useState } from 'react';

import { Input } from '@/skin/forms';

import Form from '../';
import useForm from '../hooks/useForm';
import useWatch from '../hooks/useWatch';

let x = 0;

type FieldType = {
  main?: string;
  name?: string;
  age?: number;
  gender?: boolean;
  demo?: string;
  demo2?: string;
  id?: number;
  demo1?: { demo2?: { demo3?: { demo4?: string } } };
};

const Demo = memo(() => {
  const values = useWatch<FieldType['demo']>(['demo']);
  console.log('demo watch', values);
  return (
    <Form.Field name="demo">
      <Input.Text />
    </Form.Field>
  );
});
const Demo2 = memo(() => {
  const values = useWatch<FieldType['demo2']>(['demo2']);
  console.log('demo2 watch', values);
  return (
    <Form.Field name="demo2">
      <Input.Text />
    </Form.Field>
  );
});

export default () => {
  const [form] = useForm<FieldType>();
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);
  const values = useWatch([], form);
  const main = useWatch('main', form);
  const age = useWatch(['age'], form);
  const demo1 = useWatch(['demo1'], form);
  const demo2 = useWatch(['demo1', 'demo2'], form);
  const demo3 = useWatch(['demo1', 'demo2', 'demo3'], form);
  const demo4 = useWatch(['demo1', 'demo2', 'demo3', 'demo4'], form);
  const demo5 = useWatch(['demo1', 'demo2', 'demo3', 'demo4', 'demo5'], form);
  const more = useWatch(['age', 'name', 'gender'], form);
  console.log(
    'main watch',
    values,
    demo1,
    demo2,
    main,
    age,
    demo3,
    demo4,
    demo5,
    more,
  );
  return (
    <>
      <Form
        form={form}
        initialValues={{ id: 1, age: '10', name: 'default' }}
        onFinish={v => console.log('submit values', v)}
      >
        no render
        <Form.Field name="main">
          <Input.Text />
        </Form.Field>
        name
        {visible && (
          <Form.Field name="name">
            <Input.Text />
          </Form.Field>
        )}
        age
        <Form.Field name="age">
          <Input.Text />
        </Form.Field>
        initialValue
        {visible3 && (
          <Form.Field initialValue="initialValue" name="initialValue">
            <Input.Text />
          </Form.Field>
        )}
        name, age render
        <Form.Field dependencies={['field_1']}>
          {() => {
            x += 1;
            return ` ${x}`;
          }}
        </Form.Field>
        <br />
        demo1
        <Demo />
        demo2
        {visible2 && <Demo2 />}
        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>

      <button
        onClick={() => {
          console.log('values', form.getFieldsValue());
          console.log('values all', form.getFieldsValue(true));
        }}
      >
        getFieldsValue
      </button>
      <button
        onClick={() => {
          form.setFields([
            { name: 'name', value: 'name' },
            { name: 'age', value: 'age' },
          ]);
        }}
      >
        setFields
      </button>
      <button onClick={() => form.resetFields()}>resetFields</button>
      <button
        onClick={() =>
          form.setFieldsValue({ name: `${form.getFieldValue('name') || ''}1` })
        }
      >
        setFieldsValue
      </button>
      <button onClick={() => setVisible(c => !c)}>isShow name</button>
      <button onClick={() => setVisible3(c => !c)}>isShow initialValue</button>
      <button onClick={() => setVisible2(c => !c)}>isShow demo2</button>
    </>
  );
};
