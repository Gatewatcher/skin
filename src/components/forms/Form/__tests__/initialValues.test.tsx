import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Fragment, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';

import Form from '../';
import useForm from '../hooks/useForm';
import type { FormInstance, Store } from '../interface';
import { Input, expectToHaveValueByRole, getInput } from './utils';

describe('Form InitialValues', () => {
  const user = userEvent.setup();

  it('should set initialValues', () => {
    let form: FormInstance | null = {} as FormInstance;

    render(
      <Form
        ref={instance => {
          form = instance;
        }}
        initialValues={{ username: 'Light', path1: { path2: 'Bamboo' } }}
      >
        <Form.Field name="username">
          <Input data-testid="username" />
        </Form.Field>
        <Form.Field name={['path1', 'path2']}>
          <Input data-testid="path" />
        </Form.Field>
      </Form>,
    );

    expect(form.getFieldsValue()).toEqual({
      username: 'Light',
      path1: {
        path2: 'Bamboo',
      },
    });
    expect(form.getFieldsValue(['username'])).toEqual({
      username: 'Light',
    });
    expect(form.getFieldsValue(['path1'])).toEqual({
      path1: {
        path2: 'Bamboo',
      },
    });
    expect(form.getFieldsValue(['username', ['path1', 'path2']])).toEqual({
      username: 'Light',
      path1: {
        path2: 'Bamboo',
      },
    });
    expect(screen.getByTestId('username')).toHaveValue('Light');
    expect(screen.getByTestId('path')).toHaveValue('Bamboo');
  });

  it('update and reset should use new initialValues', async () => {
    let form: FormInstance | null = {} as FormInstance;
    let mountCount = 0;

    const TestInput = (props = {}) => {
      useEffect(() => {
        mountCount += 1;
      }, []);

      return <Input {...props} />;
    };

    const Test = ({ initialValues = {} }: { initialValues: Store }) => (
      <Form
        ref={instance => {
          form = instance;
        }}
        initialValues={initialValues}
      >
        <Form.Field name="username">
          <Input data-testid="username" />
        </Form.Field>
        <Form.Field name="email">
          <TestInput data-testid="password" />
        </Form.Field>
      </Form>
    );

    const { rerender } = render(
      <Test initialValues={{ username: 'Bamboo' }} />,
    );
    expect(form.getFieldsValue()).toEqual({
      username: 'Bamboo',
    });
    expect(screen.getByTestId('username')).toHaveValue('Bamboo');

    rerender(<Test initialValues={{ username: 'Light' }} />);
    expect(form.getFieldsValue()).toEqual({
      username: 'Bamboo',
    });
    expect(screen.getByTestId('username')).toHaveValue('Bamboo');

    // Should change it
    await act(() => {
      form?.resetFields();
    });
    expect(mountCount).toEqual(2);
    expect(form.getFieldsValue()).toEqual({
      username: 'Light',
    });
    await user.type(screen.getByTestId('username'), '{enter}');
    expect(screen.getByTestId('username')).toHaveValue('Light');
  });

  it("initialValues shouldn't be modified if preserve is true", async () => {
    const formValue = {
      test: 'test',
      users: [{ first: 'aaa', last: 'bbb' }],
    };

    const Demo = () => {
      const [form] = useForm();
      const [show, setShow] = useState(false);

      return (
        <>
          <button onClick={() => setShow(prev => !prev)}>switch show</button>
          {show && (
            <Form form={form} initialValues={formValue} preserve={true}>
              <Form.Field shouldUpdate>
                {() => (
                  <Form.Field name="test" preserve={false}>
                    <Input />
                  </Form.Field>
                )}
              </Form.Field>
              <Form.List name="users">
                {fields => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Fragment key={key}>
                        <Form.Field
                          {...restField}
                          rules={[
                            { required: true, message: 'Missing first name' },
                          ]}
                          name={[name, 'first']}
                        >
                          <Input
                            data-testid="first-name"
                            placeholder="First Name"
                          />
                        </Form.Field>
                        <Form.Field
                          {...restField}
                          rules={[
                            { required: true, message: 'Missing last name' },
                          ]}
                          name={[name, 'last']}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Field>
                      </Fragment>
                    ))}
                  </>
                )}
              </Form.List>
            </Form>
          )}
        </>
      );
    };

    render(<Demo />);
    await user.click(screen.getByRole('button'));

    expect(formValue.users[0].last).toEqual('bbb');

    await user.click(screen.getByRole('button'));
    expect(formValue.users[0].last).toEqual('bbb');

    await user.click(screen.getByRole('button'));
    expect(screen.getByTestId('first-name')).toHaveValue('aaa');
  });

  describe('Field with initialValue', () => {
    it('warning if Form already has initialValues', async () => {
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Form initialValues={{ conflict: 'bamboo' }}>
          <Form.Field initialValue="light" name="conflict">
            <Input />
          </Form.Field>
        </Form>,
      );

      await expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });

      expect(errorSpy).toHaveBeenCalledWith(
        "Form already set 'initialValues' with path 'conflict'. Field can not overwrite it.",
      );

      errorSpy.mockRestore();
    });

    it('warning if multiple Field with same name set `initialValue`', () => {
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Form>
          <Form.Field initialValue="bamboo" name="conflict">
            <Input />
          </Form.Field>
          <Form.Field initialValue="light" name="conflict">
            <Input />
          </Form.Field>
        </Form>,
      );

      expect(errorSpy).toHaveBeenCalledWith(
        "Multiple Field with path 'conflict' set 'initialValue'. Can not decide which one to pick.",
      );

      errorSpy.mockRestore();
    });

    it('should not replace user input', async () => {
      const Test = () => {
        const [show, setShow] = useState(false);

        return (
          <Form>
            {show && (
              <Form.Field initialValue="light" name="test">
                <Input />
              </Form.Field>
            )}
            <button
              onClick={() => {
                setShow(!show);
              }}
              type="button"
            />
          </Form>
        );
      };

      render(<Test />);
      await user.click(screen.getByRole('button'));

      // First mount should reset value
      await expectToHaveValueByRole({ role: 'textbox', value: 'light' });

      // Do not reset value when value already exist
      await user.clear(getInput());
      await user.type(getInput(), 'bamboo');
      await expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('button'));

      await expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });
    });

    it('form reset should work', async () => {
      const Test = () => {
        const [form] = useForm();
        const [initVal, setInitVal] = useState<string | undefined>(undefined);

        return (
          <Form form={form}>
            <Form.Field initialValue={initVal} name="bamboo">
              <Input />
            </Form.Field>
            <button
              onClick={() => {
                form.resetFields();
              }}
              data-testid="reset"
              type="button"
            />
            <button
              onClick={() => {
                setInitVal('light');
              }}
              data-testid="set-val"
              type="button"
            />
          </Form>
        );
      };

      render(<Test />);
      await expectToHaveValueByRole({ role: 'textbox', value: '' });

      // User input
      await user.type(getInput(), 'story');
      await expectToHaveValueByRole({ role: 'textbox', value: 'story' });

      // First reset will get nothing
      await user.click(screen.getByTestId('reset'));
      await expectToHaveValueByRole({ role: 'textbox', value: '' });

      // Change field initialValue and reset
      await user.click(screen.getByTestId('set-val'));
      await user.click(screen.getByTestId('reset'));
      await expectToHaveValueByRole({ role: 'textbox', value: 'light' });
    });

    it('reset by namePath', async () => {
      const Test = () => {
        const [form] = useForm();

        return (
          <Form form={form}>
            <Form.Field initialValue="light" name="bamboo">
              <Input />
            </Form.Field>
            <button
              onClick={() => {
                form.resetFields(['bamboo']);
              }}
              type="button"
            />
          </Form>
        );
      };

      render(<Test />);
      await user.clear(getInput());
      await user.type(getInput(), 'story');
      await expectToHaveValueByRole({ role: 'textbox', value: 'story' });

      await user.click(screen.getByRole('button'));
      await expectToHaveValueByRole({ role: 'textbox', value: 'light' });
    });

    it('ignore dynamic initialValue', async () => {
      const Test = () => {
        const [initVal, setInitVal] = useState('bamboo');
        return (
          <Form>
            <Form.Field initialValue={initVal} name="test">
              <Input />
            </Form.Field>
            <button
              onClick={() => {
                setInitVal('light');
              }}
              type="button"
            />
          </Form>
        );
      };

      render(<Test />);
      await expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });

      await user.click(screen.getByRole('button'));
      await expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });
    });

    it('not initialValue when not mount', () => {
      let formInstance: FormInstance | null = {} as FormInstance;

      const Test = () => {
        const [form] = useForm();
        formInstance = form;

        const fieldNode = <Form.Field initialValue="light" name="bamboo" />;

        expect(fieldNode).toBeTruthy();

        return (
          <Form form={form}>
            <Form.Field initialValue="bamboo" name="light">
              {control => {
                expect(control.value).toEqual('bamboo');
                return null;
              }}
            </Form.Field>
          </Form>
        );
      };

      render(<Test />);

      expect(formInstance?.getFieldsValue()).toEqual({ light: 'bamboo' });
    });
  });
});
