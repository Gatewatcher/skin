import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { CheckboxProps } from '..';
import Checkbox from '..';
import {
  expectClickNotToCallOnChange,
  expectClickToCallOnChange,
} from '../../__tests__/utils';

describe('Checkbox', () => {
  const TEST_ID: TestId = 'checkbox';
  const ROLE = 'checkbox';

  const renderComponent = ({ ...props }: Partial<CheckboxProps> = {}) =>
    render(<Checkbox data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectClickToCallOnChange<CheckboxProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectClickNotToCallOnChange<CheckboxProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('render non breakable space if no label', async () => {
    renderComponent({ label: '' });

    expect(
      await screen.findByTestId(suffixTestId(TEST_ID, 'label')),
    ).toHaveTextContent('');
  });

  it('should be indeterminate', async () => {
    renderComponent({ indeterminate: true, value: '' });
    const item = await screen.findByTestId(TEST_ID);
    expect(item).toHaveClass('CheckboxIndeterminate');
  });

  it('should have class empty', async () => {
    renderComponent({ label: '' });
    const item = await screen.findByTestId(TEST_ID);
    expect(item).toHaveClass('CheckboxEmpty');
  });

  it('should not have unrecognized attributes', async () => {
    renderComponent({ label: 'label' });
    const input = await screen.findByRole('checkbox', { name: 'label' });

    ['readonlyMode', 'withErrors', 'fitContent'].forEach(attribute => {
      expect(input).not.toHaveAttribute(attribute);
    });
  });

  it('should have custom label', async () => {
    renderComponent({
      label: <div data-testid="custom">react node label</div>,
    });

    await expectToBeVisibleInTheDocument('custom');
    await expectToBeVisibleInTheDocument('react node label', screen.findByText);
  });
});
