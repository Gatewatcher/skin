import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SwitchProps } from '..';
import Switch from '..';
import {
  expectClickNotToCallOnChange,
  expectClickToCallOnChange,
} from '../../__tests__/utils';

describe('Switch', () => {
  const TEST_ID: TestId = 'switch';
  const ROLE = 'checkbox';

  const user = userEvent.setup();

  const renderComponent = ({ ...props }: Partial<SwitchProps> = {}) =>
    render(<Switch data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectClickToCallOnChange<SwitchProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectClickNotToCallOnChange<SwitchProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should have start and end labels', async () => {
    const startLabel = 'startLabel';
    const endLabel = 'endLabel';

    renderComponent({ endLabel, startLabel });

    await expectToBeVisibleInTheDocument(
      new RegExp(startLabel),
      screen.findByText,
    );
    await expectToBeVisibleInTheDocument(
      new RegExp(endLabel),
      screen.findByText,
    );
  });

  it('should have icons', async () => {
    renderComponent({ uncheckedIcon: 'Add', checkedIcon: 'ArrowDownLeft' });

    const icons = await screen.findAllByTestId('icon');
    expect(icons.length).toBe(2);
  });

  it('should have checked icon color', async () => {
    renderComponent({ checkedIconColor: 'turquoise' });

    const input = await screen.findByRole(ROLE);
    await user.click(input);

    expect(await screen.findByTestId('icons')).toHaveStyle({
      color: 'var(--color-turquoise)',
    });
  });

  describe('readonly mode', () => {
    it('should render in readonly mode', async () => {
      renderComponent({ readOnly: true });
      const input = await screen.findByRole(ROLE);
      expect(input).toHaveAttribute('readonly');
    });

    it('should render label in readonly mode', async () => {
      renderComponent({
        readonlyMode: { enabled: true, label: 'readonly label' },
      });
      await expectToBeVisibleInTheDocument('switch-readonly');
      await expectToBeVisibleInTheDocument('readonly label', screen.findByText);
    });

    it('should render label as func in readonly mode', async () => {
      renderComponent({
        checked: true,
        readonlyMode: {
          enabled: true,
          label: ({ checked }) => (checked ? 'checked' : 'not checked'),
        },
      });
      await expectToBeVisibleInTheDocument('switch-readonly');
      await expectToBeVisibleInTheDocument('checked', screen.findByText);
    });

    it('should render errors', async () => {
      renderComponent({ meta: { errors: ['some errors'] } });
      await expectToBeVisibleInTheDocument('some errors', screen.findByText);
    });
  });
});
