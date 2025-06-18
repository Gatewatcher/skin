import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { EmailProps } from '..';
import Email from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
  expectToBeReadonly,
  expectTypeNotToCallOnChange,
  expectTypeToCallOnChange,
} from '../../__tests__/utils';

describe('Email', () => {
  const TEST_ID: TestId = 'email';
  const ROLE = 'textbox';

  const renderComponent = ({ ...props }: Partial<EmailProps> = {}) =>
    render(<Email data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectTypeToCallOnChange<EmailProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectTypeNotToCallOnChange<EmailProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should display label', async () => {
    renderComponent({ label: 'some-email' });
    expect(screen.getByText('some-email'));
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument<EmailProps>(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument<EmailProps>(renderComponent);
  });

  it('should be readonly', async () => {
    await expectToBeReadonly<EmailProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });
});
