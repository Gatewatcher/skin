import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form, Input } from '@/skin/forms';

describe('Form.Group', () => {
  const user = userEvent.setup();

  const onSubmit = vi.fn();

  const renderComponent = () => {
    const initialValues = {
      user: {
        firstname: 'John',
        lastname: 'Doe',
      },
    };

    return render(
      <Form initialValues={initialValues} onFinish={onSubmit}>
        <Form.Group name="user">
          <Form.Field name="firstname">
            <Input.Text />
          </Form.Field>
          <Form.Field name="lastname">
            <Input.Text />
          </Form.Field>

          <Form.ButtonSubmit data-testid="submit">Submit</Form.ButtonSubmit>
        </Form.Group>
      </Form>,
    );
  };

  it('should submit with good values', async () => {
    renderComponent();
    const submit = await screen.findByTestId('submit');
    await user.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({
      user: {
        firstname: 'John',
        lastname: 'Doe',
      },
    });
  });

  it('should render labels', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('firstname', screen.findByText);
    await expectToBeVisibleInTheDocument('lastname', screen.findByText);
  });
});
