import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import type { CardInputProps, SelectableCardProps } from '..';
import SelectableCard from '..';
import {
  expectClickNotToCallOnChange,
  expectClickToCallOnChange,
} from '../../__tests__/utils';

const radioTests = (TEST_ID: string) => {
  const ROLE = 'radio';

  const children = (
    Component: (props: CardInputProps) => ReactNode,
    label?: string,
  ) => (
    <>
      <Component label={label} />
    </>
  );

  const renderComponent = ({
    label,
    ...props
  }: Partial<SelectableCardProps> & { label?: string } = {}) =>
    render(
      <SelectableCard data-testid={TEST_ID} {...props} type={ROLE}>
        {Component => children(Component, label)}
      </SelectableCard>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectClickToCallOnChange<SelectableCardProps>(
      renderComponent,
      { type: ROLE, children },
      async () => screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectClickNotToCallOnChange<SelectableCardProps>(
      renderComponent,
      { type: ROLE, children },
      async () => screen.getByRole(ROLE),
    );
  });

  it('should not have unrecognized attributes', async () => {
    renderComponent({ label: 'label' });
    const input = await screen.findByLabelText('label');

    ['readonlyMode', 'withErrors', 'fitContent'].forEach(attritbute => {
      expect(input).not.toHaveAttribute(attritbute);
    });
  });
};

const checkboxTests = (TEST_ID: string) => {
  const ROLE = 'checkbox';

  const children = (
    Component: (props: CardInputProps) => ReactNode,
    label?: string,
  ) => (
    <>
      <Component label={label} />
    </>
  );

  const renderComponent = ({
    label,
    ...props
  }: Partial<SelectableCardProps> & { label?: string } = {}) =>
    render(
      <SelectableCard data-testid={TEST_ID} {...props} type={ROLE}>
        {Component => children(Component, label)}
      </SelectableCard>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectClickToCallOnChange<SelectableCardProps>(
      renderComponent,
      { type: ROLE, children },
      async () => screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectClickNotToCallOnChange<SelectableCardProps>(
      renderComponent,
      { type: ROLE, children },
      async () => screen.getByRole(ROLE),
    );
  });

  it('render non breakable space if no label', async () => {
    renderComponent({ label: '' });

    expect(
      await screen.findByTestId(
        suffixTestId(suffixTestId(TEST_ID, ROLE), 'label'),
      ),
    ).toHaveTextContent('');
  });

  it('should have class empty', async () => {
    renderComponent({ label: '' });
    const item = await screen.findByTestId(suffixTestId(TEST_ID, ROLE));
    expect(item).toHaveClass('CheckboxCardInputEmpty');
  });

  it('should not have unrecognized attributes', async () => {
    renderComponent({ label: 'label' });
    const input = await screen.findByRole('checkbox', { name: 'label' });

    ['readonlyMode', 'withErrors', 'fitContent'].forEach(attribute => {
      expect(input).not.toHaveAttribute(attribute);
    });
  });
};

describe('SelectableCard', () => {
  const TEST_ID: TestId = 'selectable-card';

  radioTests(TEST_ID);
  checkboxTests(TEST_ID);
});
