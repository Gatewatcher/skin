import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import type { FormProps } from '../index';
import Form from '../index';
import type { FieldData } from '../interface';
import InfoField from './utils';

describe('Form Control', () => {
  const username = 'username';
  const validationMessage = `test is required`;
  const user = userEvent.setup();
  const getInput = () => screen.getByRole('textbox');

  const renderComponent = async (props: FormProps) => {
    return render(
      <Form {...props}>
        <InfoField name="username" />
      </Form>,
    );
  };

  it('should render fields', async () => {
    const value = 'Bamboo';
    renderComponent({
      fields: [{ name: username, value }],
    });
    await expectToBeVisibleInTheDocument(value, screen.findByDisplayValue);
  });

  it('should dynamic update', async () => {
    const Test = () => {
      const [fields, setFields] = useState<FieldData[]>([]);

      return (
        <Form
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          fields={fields}
        >
          <InfoField name="test" rules={[{ required: true }]} />
        </Form>
      );
    };

    render(<Test />);

    await user.type(getInput(), '{enter}');
    await expectToBeVisibleInTheDocument(validationMessage, screen.findByText);
  });
});
