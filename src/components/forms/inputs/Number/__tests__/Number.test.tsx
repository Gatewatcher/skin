import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { NumberProps } from '..';
import Number from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
  expectToBeReadonly,
  expectTypeNotToCallOnChange,
  expectTypeToCallOnChange,
} from '../../__tests__/utils';

describe('Number', () => {
  const TEST_ID: TestId = 'number';
  const ROLE = 'spinbutton';

  const renderComponent = ({ ...props }: Partial<NumberProps> = {}) =>
    render(<Number data-testid={TEST_ID} role={ROLE} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectTypeToCallOnChange<NumberProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectTypeNotToCallOnChange<NumberProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should display label', async () => {
    renderComponent({ label: 'some-number' });
    expect(screen.getByText('some-number'));
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument<NumberProps>(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument<NumberProps>(renderComponent);
  });

  it('should be readonly', async () => {
    await expectToBeReadonly<NumberProps>(renderComponent, {}, async () =>
      screen.findByRole(ROLE),
    );
  });

  it('should not have input icons', async () => {
    renderComponent({ withArrows: false });
    const input = await screen.findByRole(ROLE);
    expect(input).toHaveClass('withoutArrows');
  });
});
