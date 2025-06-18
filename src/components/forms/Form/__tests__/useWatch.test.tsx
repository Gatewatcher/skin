import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef, useState } from 'react';

import { stringifyOrRandomize } from '@/skin/forms/Form/utils/stringifyOrRandomize';

import Form from '../';
import useForm from '../hooks/useForm';
import useWatch from '../hooks/useWatch';
import type { FormInstance } from '../interface';
import { Input } from './utils';

describe('useWatch', () => {
  let staticForm: FormInstance | null = {} as FormInstance;
  const user = userEvent.setup();

  const getFirstTextbox = () => screen.getAllByRole('textbox').at(0);
  const getLastTextbox = () => screen.getAllByRole('textbox').at(-1);

  it('field initialValue', async () => {
    const Demo = () => {
      const [form] = useForm();
      const nameValue = useWatch<string>('name', form);

      return (
        <div>
          <Form form={form}>
            <Form.Field initialValue="bamboo" name="name">
              <Input />
            </Form.Field>
          </Form>
          <div data-testid="values">{nameValue}</div>
        </div>
      );
    };
    render(<Demo />);
    expect(screen.getByTestId('values')).toHaveTextContent('bamboo');
  });

  it('form initialValue', async () => {
    const Demo = () => {
      const [form] = useForm();
      const nameValue = useWatch<string>(['name'], form);

      return (
        <div>
          <Form form={form} initialValues={{ name: 'bamboo', other: 'other' }}>
            <Form.Field name="name">
              <Input />
            </Form.Field>
          </Form>
          <div data-testid="values">{nameValue}</div>
        </div>
      );
    };
    render(<Demo />);
    expect(screen.getByTestId('values')).toHaveTextContent('bamboo');
  });

  it('change value with form api', async () => {
    const Demo = () => {
      const [form] = useForm();
      const nameValue = useWatch<string>(['name'], form);

      return (
        <div>
          <Form
            ref={instance => {
              staticForm = instance;
            }}
            form={form}
          >
            <Form.Field name="name">
              <Input />
            </Form.Field>
          </Form>
          <div data-testid="values">{nameValue}</div>
        </div>
      );
    };
    render(<Demo />);

    await act(() => {
      staticForm?.setFields([{ name: 'name', value: 'little' }]);
    });
    expect(screen.getByTestId('values')).toHaveTextContent('little');

    await act(() => {
      staticForm?.setFieldsValue({ name: 'light' });
    });
    expect(screen.getByTestId('values')).toHaveTextContent('light');

    await act(() => {
      staticForm?.resetFields();
    });
    expect(screen.getByTestId('values')).toHaveTextContent('');
  });

  describe('unmount', () => {
    it('basic', async () => {
      const Demo = ({ visible }: { visible: boolean }) => {
        const [form] = useForm();
        const nameValue = useWatch<string>(['name'], form);

        return (
          <div>
            <Form form={form} initialValues={{ name: 'bamboo' }}>
              {visible && (
                <Form.Field name="name">
                  <Input />
                </Form.Field>
              )}
            </Form>
            <div data-testid="values">{nameValue}</div>
          </div>
        );
      };

      const { rerender } = render(<Demo visible />);
      expect(screen.getByTestId('values')).toHaveTextContent('bamboo');

      rerender(<Demo visible={false} />);
      expect(screen.getByTestId('values')).toHaveTextContent('');

      rerender(<Demo visible />);
      expect(screen.getByTestId('values')).toHaveTextContent('bamboo');
    });

    it('nest children component', async () => {
      const DemoWatch = () => {
        useWatch(['name']);

        return (
          <Form.Field name="name">
            <Input />
          </Form.Field>
        );
      };

      const Demo = ({ visible }: { visible: boolean }) => {
        const [form] = useForm();
        const nameValue = useWatch<string>(['name'], form);

        return (
          <div>
            <Form form={form} initialValues={{ name: 'bamboo' }}>
              {visible && <DemoWatch />}
            </Form>
            <div data-testid="values">{nameValue}</div>
          </div>
        );
      };

      const { rerender } = render(<Demo visible />);

      expect(screen.getByTestId('values')).toHaveTextContent('bamboo');

      rerender(<Demo visible={false} />);
      expect(screen.getByTestId('values')).toHaveTextContent('');

      rerender(<Demo visible />);
      expect(screen.getByTestId('values')).toHaveTextContent('bamboo');
    });
  });

  it('list', async () => {
    const Demo = () => {
      const [form] = useForm();
      const users = useWatch<string[]>(['users'], form) || [];

      return (
        <Form form={form}>
          <div data-testid="values">{JSON.stringify(users)}</div>
          <Form.List initialValue={['bamboo', 'light']} name="users">
            {(fields, { remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Form.Field
                      {...field}
                      key={field.key}
                      rules={[{ required: true }]}
                    >
                      {control => (
                        <div>
                          <Input {...control} />
                          <a
                            data-testid="remove"
                            onClick={() => remove(index)}
                          />
                        </div>
                      )}
                    </Form.Field>
                  ))}
                </div>
              );
            }}
          </Form.List>
        </Form>
      );
    };
    render(<Demo />);
    expect(screen.getByTestId('values')).toHaveTextContent(
      JSON.stringify(['bamboo', 'light']),
    );

    const firstElementWithRemoveId = screen.getAllByTestId('remove').at(0);
    firstElementWithRemoveId && (await user.click(firstElementWithRemoveId));
    expect(screen.getByTestId('values')).toHaveTextContent(
      JSON.stringify(['light']),
    );
  });

  it('warning if not provide form', () => {
    const errorSpy = vi.spyOn(console, 'warn');

    const Demo = () => {
      useWatch([]);
      return null;
    };

    render(<Demo />);

    expect(errorSpy).toHaveBeenCalledWith(
      'useWatch requires a form instance since it can not auto detect from context.',
    );
    errorSpy.mockRestore();
  });

  it('no more render time', async () => {
    let renderTime = 0;

    const Demo = () => {
      const [form] = useForm();
      const name = useWatch<string>('name', form);

      renderTime += 1;

      return (
        <Form form={form}>
          <Form.Field name="name">
            <Input />
          </Form.Field>
          <Form.Field name="age">
            <Input />
          </Form.Field>
          <div className="value">{name}</div>
        </Form>
      );
    };

    render(<Demo />);
    expect(renderTime).toEqual(1);

    const firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'b'));
    expect(renderTime).toEqual(3);

    let lastTextbox = getLastTextbox();
    lastTextbox && (await user.type(lastTextbox, '1'));
    expect(renderTime).toEqual(3);

    lastTextbox = getLastTextbox();
    lastTextbox && (await user.type(lastTextbox, '1'));
    expect(renderTime).toEqual(3);
  });

  it('typescript', () => {
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

    const Demo = () => {
      const [form] = useForm<FieldType>();
      const values = useWatch([], form);
      const main = useWatch('main', form);
      const age = useWatch(['age'], form);
      const demo1 = useWatch(['demo1'], form);
      const demo2 = useWatch(['demo1', 'demo2'], form);
      const demo3 = useWatch(['demo1', 'demo2', 'demo3'], form);
      const demo4 = useWatch(['demo1', 'demo2', 'demo3', 'demo4'], form);
      const demo5 = useWatch(
        ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'],
        form,
      );
      const more = useWatch(['age', 'name', 'gender'], form);
      const demo = useWatch<string>(['demo']);

      return (
        <>
          {JSON.stringify({
            values,
            main,
            age,
            demo1,
            demo2,
            demo3,
            demo4,
            demo5,
            more,
            demo,
          })}
        </>
      );
    };

    render(<Demo />);
  });

  // https://github.com/react-component/field-form/issues/431
  it('not trigger effect', async () => {
    let updateA = 0;
    let updateB = 0;

    const Demo = () => {
      const [form] = useForm();
      const userA = useWatch(['a'], form);
      const userB = useWatch(['b'], form);

      useEffect(() => {
        updateA += 1;
      }, [userA]);
      useEffect(() => {
        updateB += 1;
      }, [userB]);

      return (
        <Form form={form}>
          <Form.Field name={['a', 'name']}>
            <Input />
          </Form.Field>
          <Form.Field name={['b', 'name']}>
            <Input />
          </Form.Field>
        </Form>
      );
    };

    render(<Demo />);

    console.log('Change!');
    const firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'bamboo'));

    expect(updateA > updateB).toBeTruthy();
  });

  it('mount while unmount', async () => {
    const Demo = () => {
      const [form] = useForm();
      const [type, setType] = useState(true);
      const name = useWatch<string>('name', form);

      return (
        <Form form={form}>
          <button onClick={() => setType(c => !c)} type="button">
            type
          </button>
          {type && (
            <Form.Field key="a" name="name">
              <Input />
            </Form.Field>
          )}
          {!type && (
            <Form.Field key="b" name="name">
              <Input />
            </Form.Field>
          )}
          <div data-testid="value">{name}</div>
        </Form>
      );
    };

    render(<Demo />);
    const firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'bamboo'));
    await user.click(screen.getByRole('button'));
    expect(screen.getByTestId('value')).toHaveTextContent('bamboo');
  });

  it('stringify error', () => {
    const obj: { name: {} } = { name: {} };
    obj.name = obj;
    const str = stringifyOrRandomize(obj);
    expect(typeof str === 'number').toBeTruthy();
  });

  it('first undefined', async () => {
    const Demo = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formRef = useRef<any>();
      const name = useWatch('name', formRef.current);
      const [, setUpdate] = useState({});

      return (
        <>
          <div data-testid="set-update" onClick={() => setUpdate({})} />
          <div data-testid="value">{name}</div>
          <Form ref={formRef} initialValues={{ name: 'default' }}>
            <Form.Field key="a" name="name">
              <Input />
            </Form.Field>
          </Form>
        </>
      );
    };

    render(<Demo />);
    expect(screen.getByTestId('value')).toHaveTextContent('');
    await user.click(screen.getByTestId('set-update'));
    expect(screen.getByTestId('value')).toHaveTextContent('default');

    const firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'bamboo'));
    expect(screen.getByTestId('value')).toHaveTextContent('bamboo');
  });
});
