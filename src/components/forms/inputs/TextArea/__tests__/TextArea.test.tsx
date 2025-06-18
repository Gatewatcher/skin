import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { TextAreaProps } from '..';
import TextArea from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
  expectToBeReadonly,
  expectTypeNotToCallOnChange,
  expectTypeToCallOnChange,
} from '../../__tests__/utils';

describe('TextArea', () => {
  const TEST_ID: TestId = 'textarea';
  const ROLE = 'textbox';

  const renderComponent = ({ ...props }: Partial<TextAreaProps> = {}) =>
    render(<TextArea data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectTypeToCallOnChange<TextAreaProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectTypeNotToCallOnChange<TextAreaProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should be readonly', async () => {
    await expectToBeReadonly<TextAreaProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should display label', async () => {
    renderComponent({ label: 'some-text' });
    expect(screen.getByText('some-text'));
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument<TextAreaProps>(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument<TextAreaProps>(renderComponent);
  });

  it('should display maxLength', async () => {
    const maxLength = 10;
    renderComponent({ maxLength });
    await expectToBeVisibleInTheDocument(`0/${maxLength}`, screen.getByText);
  });

  it('should have rows', async () => {
    const rows = 10;
    renderComponent({ rows });
    const input = await screen.findByRole(ROLE);
    expect(input).toHaveAttribute('rows', '10');
  });

  it('should have resize style property', async () => {
    renderComponent({ styling: { resize: 'none' } });
    const input = await screen.findByRole(ROLE);
    expect(input).toHaveStyle({ resize: 'none' });
  });
});
