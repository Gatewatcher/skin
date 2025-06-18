import { Fragment } from 'react';

import { Button } from '@/skin/actions';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import Form from '../';
import type { FormInstance } from '../interface';
import { Error } from './Error';

const FieldState = ({ form, name }: { form: FormInstance; name: string }) => {
  const touched = form.isFieldTouched(name);
  const validating = form.isFieldValidating(name);

  return (
    <div
      style={{
        color: 'green',
        position: 'absolute',
        marginTop: -35,
        left: 200,
      }}
    >
      {touched ? <span>Touched!</span> : null}
      {validating ? <span>Validating!</span> : null}
    </div>
  );
};

export default () => {
  const onFinish = (values: unknown) => {
    console.log('Finish:', values);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h3>Validate Form</h3>
      <Form onFinish={onFinish}>
        {(values, form) => {
          const usernameError = form.getFieldError('username');
          const passwordError = form.getFieldError('password');
          const password2Error = form.getFieldError('password2');
          const errors = form.getFieldsError();
          if (errors) {
            console.log('Render with Errors:', values, form.getFieldsError());
          }

          return (
            <Fragment>
              <Form.Field name="username" rules={[{ required: true }]}>
                <Input.Text
                  onChange={({ target: { value } }) => {
                    console.log('Username change:', value);
                  }}
                  placeholder="Username"
                />
              </Form.Field>
              <FieldState form={form} name="username" />
              <Error>{usernameError}</Error>

              <Form.Field
                rules={[
                  { required: true },
                  context => ({
                    validator(_, __, callback) {
                      if (context.isFieldTouched('password2')) {
                        context.validateFields(['password2']);
                        callback();
                        return;
                      }
                      callback();
                    },
                  }),
                ]}
                name="password"
              >
                <Input.Text placeholder="Password" />
              </Form.Field>
              <FieldState form={form} name="password" />
              <Error>{passwordError}</Error>

              <Form.Field
                rules={[
                  { required: true },
                  context => ({
                    validator(rule, value, callback) {
                      const { password } = context.getFieldsValue(true);
                      if (password !== value) {
                        callback('Not Same as password1!!!');
                      }
                      callback();
                    },
                  }),
                ]}
                name="password2"
              >
                <Input.Text placeholder="Password 2" />
              </Form.Field>
              <FieldState form={form} name="password2" />
              <Error>{password2Error}</Error>

              <Form.Field name="renderProps" rules={[{ required: true }]}>
                {(control, meta) => (
                  <div>
                    Use Meta:
                    <Input.Text {...control} placeholder="render props" />
                    <FieldState form={form} name="renderProps" />
                    <Error>{meta.errors}</Error>
                  </div>
                )}
              </Form.Field>

              <Form.Field
                rules={[
                  { required: true, validateTrigger: 'onSubmit' },
                  {
                    validator(rule, value, callback) {
                      setTimeout(() => {
                        if (Number(value).toString() === value) {
                          callback();
                        }
                        callback('Integer number only!');
                      }, 1000);
                    },
                    validateTrigger: 'onChange',
                  },
                ]}
                name="validateTrigger"
                validateTrigger={['onSubmit', 'onChange']}
              >
                {(control, meta) => (
                  <div>
                    Multiple `validateTrigger`:
                    <ul>
                      <li>Required check on submit</li>
                      <li>Number check on change</li>
                    </ul>
                    <Input.Text {...control} placeholder="validateTrigger" />
                    <FieldState form={form} name="validateTrigger" />
                    <Error>{meta.errors}</Error>
                  </div>
                )}
              </Form.Field>

              <br />

              <Stack gap={6}>
                <Button
                  onClick={() => {
                    form.validateFields();
                  }}
                >
                  Validate all
                </Button>

                <Form.ButtonSubmit>submit</Form.ButtonSubmit>
              </Stack>
            </Fragment>
          );
        }}
      </Form>
    </div>
  );
};
