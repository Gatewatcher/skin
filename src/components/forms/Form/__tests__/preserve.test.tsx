import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSXElementConstructor, ReactElement } from 'react';
import { createRef } from 'react';

import Form from '../';
import useForm from '../hooks/useForm';
import type { FormInstance } from '../interface';
import InfoField, { Input, expectToHaveValueByRole } from './utils';

describe('Form preserve', () => {
  const user = userEvent.setup();
  const Demo = ({
    removeField,
    formPreserve,
    fieldPreserve,
    onFinish,
  }: {
    removeField: boolean;
    formPreserve?: boolean;
    fieldPreserve?: boolean;
    onFinish: (values: unknown) => void;
  }) => (
    <Form
      initialValues={{ keep: 233, remove: 666 }}
      onFinish={onFinish}
      preserve={formPreserve}
    >
      <InfoField name="keep" />
      {!removeField && <InfoField name="remove" preserve={fieldPreserve} />}
      <button type="submit">Submit</button>
    </Form>
  );

  const matchTest = async (
    removeField: boolean,
    match: object,
    onFinish: ReturnType<typeof vi.fn>,
    rerender: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ui: ReactElement<any, string | JSXElementConstructor<any>>,
    ) => void,
  ) => {
    onFinish.mockReset();
    rerender(
      <Demo
        fieldPreserve={false}
        onFinish={onFinish}
        removeField={removeField}
      />,
    );
    await user.click(screen.getByRole('button'));
    expect(onFinish).toHaveBeenCalledWith(match);
  };

  const getLastTextBox = () => screen.getAllByRole('textbox').at(-1);
  const getFirstTextBox = () => screen.getAllByRole('textbox').at(0);

  it('field', async () => {
    const onFinish = vi.fn();
    const { rerender } = render(
      <Demo fieldPreserve={false} onFinish={onFinish} removeField={false} />,
    );

    await matchTest(false, { keep: 233, remove: 666 }, onFinish, rerender);
    await matchTest(true, { keep: 233 }, onFinish, rerender);
    await matchTest(false, { keep: 233, remove: 666 }, onFinish, rerender);
  });

  it('form', async () => {
    const onFinish = vi.fn();
    const { rerender } = render(
      <Demo formPreserve={false} onFinish={onFinish} removeField={false} />,
    );

    await matchTest(false, { keep: 233, remove: 666 }, onFinish, rerender);
    await matchTest(true, { keep: 233 }, onFinish, rerender);
    await matchTest(false, { keep: 233, remove: 666 }, onFinish, rerender);
  });

  it('keep preserve when other field exist the name', async () => {
    const formRef = createRef<FormInstance>();

    const KeepDemo = ({
      onFinish,
      keep,
    }: {
      onFinish: (values: unknown) => void;
      keep: boolean;
    }) => {
      return (
        <Form
          ref={formRef}
          initialValues={{ test: 'bamboo' }}
          onFinish={onFinish}
        >
          <Form.Field shouldUpdate>
            {() => {
              return (
                <>
                  {keep && (
                    <InfoField
                      data-testid="keep"
                      name="test"
                      preserve={false}
                    />
                  )}
                  <InfoField data-testid="test" name="test" />
                </>
              );
            }}
          </Form.Field>
          <button type="submit"></button>
        </Form>
      );
    };

    const onFinish = vi.fn();
    const { rerender } = render(<KeepDemo onFinish={onFinish} keep />);

    // Change value
    await user.clear(screen.getAllByRole('textbox')[0]);
    await user.type(screen.getAllByRole('textbox')[0], 'light');

    await user.click(screen.getByRole('button'));
    expect(onFinish).toHaveBeenCalledWith({ test: 'light' });
    onFinish.mockReset();

    // Remove preserve should not change the value
    rerender(<KeepDemo keep={false} onFinish={onFinish} />);
    await user.click(screen.getByRole('button'));
    expect(onFinish).toHaveBeenCalledWith({ test: 'light' });
  });

  it('form preserve but field !preserve', async () => {
    const onFinish = vi.fn();
    const { rerender } = render(
      <Demo
        formPreserve={false}
        onFinish={onFinish}
        removeField={false}
        fieldPreserve
      />,
    );

    await matchTest(true, { keep: 233 }, onFinish, rerender);
    await matchTest(false, { keep: 233, remove: 666 }, onFinish, rerender);
  });

  describe('Form.List', () => {
    it('form preserve should not crash', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
          initialValues={{ list: ['light', 'bamboo', 'little'] }}
          preserve={false}
        >
          <Form.List name="list">
            {(fields, { remove }) => {
              return (
                <div>
                  {fields.map(({ key, ...field }) => (
                    <Form.Field key={key} {...field}>
                      <input />
                    </Form.Field>
                  ))}
                  <button
                    onClick={() => {
                      remove(0);
                    }}
                    type="button"
                  />
                </div>
              );
            }}
          </Form.List>
        </Form>,
      );

      await user.click(screen.getByRole('button'));

      expect(form.getFieldsValue()).toEqual({ list: ['bamboo', 'little'] });
    });

    it('warning when Form.List use preserve', async () => {
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
          initialValues={{ list: ['bamboo'] }}
        >
          <Form.List name="list">
            {(fields, { remove }) => (
              <>
                {fields.map(({ key, ...field }) => (
                  <Form.Field key={key} {...field} preserve={false}>
                    <input />
                  </Form.Field>
                ))}
                <button
                  onClick={() => {
                    remove(0);
                  }}
                >
                  Remove
                </button>
              </>
            )}
          </Form.List>
        </Form>,
      );

      expect(errorSpy).toHaveBeenCalledWith(
        '`preserve` should not apply on Form.List fields.',
      );

      errorSpy.mockRestore();

      // Remove should not work
      await user.click(screen.getByRole('button'));
      expect(form.getFieldsValue()).toEqual({ list: [] });
    });

    it('multiple level field can use preserve', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
          initialValues={{ list: [{ type: 'light' }] }}
          preserve={false}
        >
          <Form.List name="list">
            {(fields, { remove }) => {
              return (
                <>
                  {fields.map(field => (
                    <div key={field.key}>
                      <Form.Field {...field} name={[field.name, 'type']}>
                        <Input />
                      </Form.Field>
                      <Form.Field shouldUpdate>
                        {(_, __, { getFieldValue }) =>
                          getFieldValue(['list', field.name, 'type']) ===
                          'light' ? (
                            <Form.Field
                              {...field}
                              key="light"
                              name={[field.name, 'light']}
                              preserve={false}
                            >
                              <Input />
                            </Form.Field>
                          ) : (
                            <Form.Field
                              {...field}
                              key="bamboo"
                              name={[field.name, 'bamboo']}
                              preserve={false}
                            >
                              <Input />
                            </Form.Field>
                          )
                        }
                      </Form.Field>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      remove(0);
                    }}
                  >
                    Remove
                  </button>
                </>
              );
            }}
          </Form.List>
        </Form>,
      );

      // Change light value
      let lastTextBox = getLastTextBox();
      lastTextBox && (await user.clear(lastTextBox));

      lastTextBox = getLastTextBox();
      lastTextBox && (await user.type(lastTextBox, '1128'));

      // Change type
      let firstTextBox = getFirstTextBox();
      firstTextBox && (await user.clear(firstTextBox));

      firstTextBox = getFirstTextBox();
      firstTextBox && (await user.type(firstTextBox, 'bamboo'));

      // Change bamboo value
      lastTextBox = getLastTextBox();
      lastTextBox && (await user.type(lastTextBox, '903'));

      expect(form.getFieldsValue()).toEqual({
        list: [{ type: 'bamboo', bamboo: '903' }],
      });

      // Remove field
      await user.click(screen.getByRole('button'));
      expect(form.getFieldsValue()).toEqual({ list: [] });
    });
  });

  it('nest render props should not clean full store', async () => {
    let form: FormInstance | null = {} as FormInstance;

    render(
      <Form
        ref={instance => {
          form = instance;
        }}
        preserve={false}
      >
        <Form.Field name="light">
          <input />
        </Form.Field>
        <Form.Field shouldUpdate>
          {(_, __, { getFieldValue }) =>
            getFieldValue('light') === 'bamboo' ? (
              <Form.Field>{() => null}</Form.Field>
            ) : null
          }
        </Form.Field>
      </Form>,
    );

    let firstTextBox = getFirstTextBox();
    firstTextBox && (await user.type(firstTextBox, 'bamboo'));
    expect(form.getFieldsValue()).toEqual({ light: 'bamboo' });

    firstTextBox = getFirstTextBox();
    firstTextBox && (await user.clear(firstTextBox));

    firstTextBox = getFirstTextBox();
    firstTextBox && (await user.type(firstTextBox, 'little'));
    expect(form.getFieldsValue()).toEqual({ light: 'little' });
  });

  // https://github.com/ant-design/ant-design/issues/31297
  describe('A -> B -> C should keep trigger refresh', () => {
    it('shouldUpdate', async () => {
      const DepDemo = () => {
        const [form] = useForm();

        return (
          <Form form={form} preserve={false}>
            <Form.Field name="name">
              <Input data-testid="name" placeholder="Username" />
            </Form.Field>

            <Form.Field shouldUpdate>
              {() => {
                return form.getFieldValue('name') === '1' ? (
                  <Form.Field name="password">
                    <Input data-testid="password" placeholder="Password" />
                  </Form.Field>
                ) : null;
              }}
            </Form.Field>

            <Form.Field shouldUpdate>
              {() => {
                const password = form.getFieldValue('password');
                return password ? (
                  <Form.Field name="password2">
                    <Input data-testid="password2" placeholder="Password 2" />
                  </Form.Field>
                ) : null;
              }}
            </Form.Field>
          </Form>
        );
      };

      render(<DepDemo />);

      // Input name to show password
      const firstTextBox = getFirstTextBox();
      firstTextBox && (await user.type(firstTextBox, '1'));

      expect(screen.getByTestId('password')).toBeTruthy();
      expect(screen.queryByTestId('password2')).toBeFalsy();

      await user.type(screen.getByTestId('password'), '1');
      // Input password to show password2
      expect(screen.queryByTestId('password2')).toBeTruthy();

      // Change name to hide password
      await user.type(screen.getByTestId('name'), '1');

      expect(screen.queryByTestId('password')).toBeFalsy();
      expect(screen.queryByTestId('password2')).toBeFalsy();
    });

    it('dependencies', async () => {
      const DepDemo = () => {
        const [form] = useForm();

        return (
          <Form form={form} preserve={false}>
            <Form.Field name="name">
              <Input data-testid="name" placeholder="Username" />
            </Form.Field>

            <Form.Field dependencies={['name']}>
              {() => {
                return form.getFieldValue('name') === '1' ? (
                  <Form.Field name="password">
                    <Input data-testid="password" placeholder="Password" />
                  </Form.Field>
                ) : null;
              }}
            </Form.Field>

            <Form.Field dependencies={['password']}>
              {() => {
                const password = form.getFieldValue('password');
                return password ? (
                  <Form.Field name="password2">
                    <Input data-testid="password2" placeholder="Password 2" />
                  </Form.Field>
                ) : null;
              }}
            </Form.Field>
          </Form>
        );
      };

      render(<DepDemo />);

      // Input name to show password
      await user.type(screen.getByTestId('name'), '1');
      expect(screen.getByTestId('password')).toBeTruthy();
      expect(screen.queryByTestId('password2')).toBeFalsy();

      // Input password to show password2
      await user.type(screen.getByTestId('password'), '1');
      expect(screen.queryByTestId('password2')).toBeTruthy();

      // Change name to hide password
      await user.type(screen.getByTestId('name'), '2');
      expect(screen.queryByTestId('password')).toBeFalsy();
      expect(screen.queryByTestId('password2')).toBeFalsy();
    });
  });

  it('should correct calculate preserve state', () => {
    let instance: FormInstance | {} = {};

    const VisibleDemo = ({ visible = true }: { visible?: boolean }) => {
      const [form] = useForm();
      instance = form;

      return visible ? (
        <Form form={form}>
          <Form.Field name="name">
            <Input />
          </Form.Field>
        </Form>
      ) : (
        <div />
      );
    };

    const { rerender } = render(<VisibleDemo />);

    rerender(<VisibleDemo visible={false} />);

    (instance as FormInstance).setFieldsValue({ name: 'bamboo' });
    rerender(<VisibleDemo visible={true} />);

    expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });
  });
});
