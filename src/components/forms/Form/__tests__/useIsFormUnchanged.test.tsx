import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import Form from '../';
import useForm from '../hooks/useForm';
import { Input } from './utils';

describe.skip('useIsFormUnchanged', () => {
  const user = userEvent.setup();

  it('actions disabled on initialValue', async () => {
    const Demo = () => {
      const [form] = useForm();

      return (
        <div>
          <Form form={form} initialValues={{ name: 'bamboo', other: 'other' }}>
            <Form.Field name="name">
              <Input />
            </Form.Field>
            <Form.Actions form={form} />
          </Form>
        </div>
      );
    };

    render(<Demo />);

    expect(screen.getByTestId('button-reset')).toBeDisabled();
  });

  it('actions enabled on change', async () => {
    const Demo = () => {
      const [form] = useForm();

      return (
        <div>
          <Form form={form} initialValues={{ name: 'bamboo', other: 'other' }}>
            <Form.Field name="name">
              <Input />
            </Form.Field>
            <Form.Actions form={form} />
          </Form>
        </div>
      );
    };
    render(<Demo />);

    const firstTextbox = screen.getAllByRole('textbox').at(0);
    firstTextbox && (await user.type(firstTextbox, 'b'));
    expect(screen.getByTestId('button-reset')).not.toBeDisabled();
  });

  it('actions disabled after save', async () => {
    const Demo = () => {
      const [form] = useForm();
      const [state, setState] = useState({ name: 'bamboo', other: 'other' });

      return (
        <div>
          <Form form={form} initialValues={state} onFinish={setState}>
            <Form.Field name="name">
              <Input />
            </Form.Field>
            <Form.Actions form={form} />
          </Form>
        </div>
      );
    };
    render(<Demo />);

    const firstTextbox = screen.getAllByRole('textbox').at(0);
    firstTextbox && (await user.type(firstTextbox, 'b'));
    const saveButton = screen.getByTestId('button-submit');
    expect(saveButton).not.toBeDisabled();
    saveButton.click();
    await waitFor(() => {
      expect(saveButton).toBeDisabled();
    });
  });
});
