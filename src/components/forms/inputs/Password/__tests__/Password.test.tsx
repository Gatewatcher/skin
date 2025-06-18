import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PasswordProps } from '..';
import Password from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
  expectToBeReadonly,
  expectTypeNotToCallOnChange,
  expectTypeToCallOnChange,
} from '../../__tests__/utils';

describe('Password', () => {
  const TEST_ID: TestId = 'password';
  const INPUT_NAME = 'password';
  const ROLE = 'textbox';

  const renderComponent = ({ ...props }: Partial<PasswordProps> = {}) =>
    render(
      <Password
        data-testid={TEST_ID}
        name={INPUT_NAME}
        role={ROLE}
        {...props}
      />,
    );

  const user = userEvent.setup();

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectTypeToCallOnChange<PasswordProps>(
      renderComponent,
      { name: INPUT_NAME },
      async () => screen.getByRole('textbox', { name: INPUT_NAME }),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectTypeNotToCallOnChange<PasswordProps>(
      renderComponent,
      { name: INPUT_NAME },
      async () => screen.getByRole('textbox', { name: INPUT_NAME }),
    );
  });

  it('should display label', async () => {
    renderComponent({ label: 'some-password' });
    expect(screen.getByText('some-password'));
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument<PasswordProps>(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument<PasswordProps>(renderComponent);
  });

  it('should be readonly', async () => {
    await expectToBeReadonly<PasswordProps>(
      renderComponent,
      { name: INPUT_NAME },
      async () => screen.findByRole(ROLE),
    );
  });

  describe('Reveal', () => {
    it('should render reveal button', async () => {
      renderComponent();
      await expectToBeVisibleInTheDocument('button-icon');
    });

    it('should toggle reveal', async () => {
      renderComponent({ label: 'label' });
      const button = await screen.findByTestId('button-icon');
      const input = await screen.getByRole('textbox', { name: 'label' });
      await user.click(button);
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should not have reveal button', async () => {
      renderComponent({ withReveal: false });
      await expectNotToBeVisibleInTheDocument('button-icon');
    });

    it('should not have reveal when disabled', async () => {
      renderComponent({ disabled: true });
      await expectNotToBeVisibleInTheDocument('button-icon');
    });
  });

  describe('accessibility', () => {
    const LABEL_TEXT = 'password';

    it('can find the input by label text and selector', async () => {
      render(<Password label={LABEL_TEXT} />);

      expect(
        screen.getByLabelText(LABEL_TEXT, { selector: 'input' }),
      ).toBeInstanceOf(HTMLInputElement);
    });

    it('can find the input by role and name', async () => {
      render(<Password label={LABEL_TEXT} />);

      expect(screen.getByRole('textbox', { name: LABEL_TEXT })).toBeInstanceOf(
        HTMLInputElement,
      );
    });

    it('can find the input by role and name (obfuscated)', async () => {
      render(<Password label={LABEL_TEXT} preventAutocomplete />);

      expect(screen.getByRole('textbox', { name: LABEL_TEXT })).toBeInstanceOf(
        HTMLInputElement,
      );
    });
  });
});
