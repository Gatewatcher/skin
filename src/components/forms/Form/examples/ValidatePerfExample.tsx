import { Component } from 'react';

import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import Form from '../';
import type {
  FormInstance,
  ValidateErrorEntity,
  ValidateMessages,
} from '../interface';

const myMessages: ValidateMessages = {
  default: '${name} semble étrange',
  required: 'required ${displayName}',
  types: {
    number: '${name} - ${type}',
  },
  enum: '${name}- ${enum}',
  whitespace: '${name} ne peut pas être vide',
  pattern: {
    mismatch: '${name} ne correspond pas au format: ${pattern}',
  },
};

export default class Demo extends Component {
  private form: FormInstance | undefined;

  public setForm = (form: FormInstance) => {
    this.form = form;
  };

  public onFinish = (values: { password: string }) => {
    console.log('Finish:', values);
  };

  public onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  public onPasswordError = ({ errors }: { errors: string[] }) => {
    console.log('🐞 Password Error:', errors);
  };

  public render() {
    return (
      <div>
        <h3>High Perf Validate Form</h3>
        <Form
          ref={this.setForm}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          validateMessages={myMessages}
        >
          <Form.Field
            rules={[
              { required: true },
              {
                warningOnly: true,
                validator: async (_, value = '') => {
                  if (value.length < 6) {
                    throw new Error('${displayName} est trop court');
                  }
                },
              },
            ]}
            messageVariables={{ displayName: 'le mot de passe' }}
            name="password"
            onMetaChange={this.onPasswordError}
          >
            <Input.Text placeholder="password" />
          </Form.Field>

          <Form.Field
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (getFieldValue('password') !== value) {
                    return Promise.reject('password2 is not same as password');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            dependencies={['password']}
            initialValue="123"
            messageVariables={{ displayName: 'mot de passe 2' }}
            name="password2"
          >
            <Input.Text placeholder="password 2" />
          </Form.Field>

          <Form.Field
            rules={[
              { required: true },
              { required: true, message: <h1>ReactNode</h1> },
              { type: 'number' },
              { type: 'enum', enum: ['aaa', 'bbb'] },
              { type: 'date' },
              { whitespace: true },
              { pattern: /^\w{3}$/ },
            ]}
            messageVariables={{ displayName: 'domaine' }}
            name="field"
          >
            <Input.Text label="Full of rules" />
          </Form.Field>

          <div>
            <Form.Field name="remember" valuePropName="checked">
              <input type="checkbox" />
            </Form.Field>
            Remember Me
          </div>

          <Stack gap={5}>
            <Form.Field shouldUpdate>
              {(_, __, { getFieldsError, isFieldsTouched }) => {
                const isAllTouched = isFieldsTouched(
                  ['password', 'password2'],
                  true,
                );
                const hasErrors = !!getFieldsError().filter(
                  ({ errors }) => errors.length,
                ).length;

                return (
                  <Form.ButtonSubmit disabled={!isAllTouched || hasErrors}>
                    Submit
                  </Form.ButtonSubmit>
                );
              }}
            </Form.Field>

            <Form.ButtonReset>Reset</Form.ButtonReset>
            <button type="reset">Reset Native</button>
          </Stack>
        </Form>
      </div>
    );
  }
}
