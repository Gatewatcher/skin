import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrictMode } from 'react';

import Form from '../';
import InfoField, { Input } from './utils';

describe('Form.ReactStrict', () => {
  const user = userEvent.setup();
  it('should not register twice', async () => {
    const onFieldsChange = vi.fn();
    const value = 'value';

    render(
      <StrictMode>
        <Form name="testForm" onFieldsChange={onFieldsChange}>
          <InfoField name="input">
            <Input />
          </InfoField>
        </Form>
      </StrictMode>,
    );

    await user.type(screen.getByRole('textbox'), value);

    expect(onFieldsChange).toHaveBeenCalledTimes(value.split('').length);
    expect(onFieldsChange.mock.calls[0][1]).toHaveLength(1);
  });
});
