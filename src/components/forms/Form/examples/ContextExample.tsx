import { Input } from '@/skin/forms';

import Form from '../';
import { FormProvider } from '../contexts/FormContext';
import useForm from '../hooks/useForm';
import type { ValidateMessages } from '../interface';

const myMessages: ValidateMessages = {
  required: '${name} required',
};

const Form1 = () => {
  const [form] = useForm();

  return (
    <Form form={form} name="first">
      <h4>Form 1</h4>
      <p>Change me!</p>
      <Form.Field name="username" rules={[{ required: true }]}>
        <Input.Text placeholder="username" />
      </Form.Field>
      <Form.Field name="password" rules={[{ required: true }]}>
        <Input.Text placeholder="password" />
      </Form.Field>

      <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
    </Form>
  );
};

const Form2 = () => {
  const [form] = useForm();

  return (
    <Form form={form} name="second">
      <h4>Form 2</h4>
      <p>Will follow Form 1 but sync back only when submit</p>
      <Form.Field name="username" rules={[{ required: true, min: 1 }]}>
        <Input.Text min={0} placeholder="username" />
      </Form.Field>
      <Form.Field name="password" rules={[{ required: true }]}>
        <Input.Text placeholder="password" />
      </Form.Field>

      <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
    </Form>
  );
};

const ContextExample = () => {
  return (
    <div>
      <h3>Form Context</h3>
      <p>
        Support global `validateMessages` config and communication between
        forms.
      </p>
      <FormProvider
        onFormChange={(name, { changedFields, forms }) => {
          console.log('change from:', name, changedFields, forms);
          if (name === 'first') {
            forms.second.setFields(changedFields);
          }
        }}
        onFormFinish={(name, { values, forms }) => {
          console.log('finish from:', name, values, forms);
          if (name === 'second') {
            forms.first.setFieldsValue(values);
          }
        }}
        validateMessages={myMessages}
      >
        <div style={{ display: 'flex', width: '100%' }}>
          <Form1 />
          <Form2 />
        </div>
      </FormProvider>
    </div>
  );
};

export default ContextExample;
