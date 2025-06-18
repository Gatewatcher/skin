import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { User } from '@/mocks/types';

import type { ErrorStateProps } from '..';
import ErrorState from '..';

describe('ErrorState', () => {
  const TEST_ID: TestId = 'error-state';

  const renderComponent = ({
    children = <div data-testid="base">base</div>,
    isError = true,
    ...props
  }: Partial<ErrorStateProps<User>> = {}) =>
    render(
      <ErrorState data-testid={TEST_ID} {...props} isError={isError}>
        {children}
      </ErrorState>,
    );

  it('should render base component', async () => {
    renderComponent({ isError: false });
    await expectToBeVisibleInTheDocument('base');
  });

  it('should render error', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('placeholder');
  });

  it('should render error with custom padding', async () => {
    renderComponent({ isError: true, padding: 1 });
    const error = await screen.findByTestId(TEST_ID);
    expect(error).toHaveStyle({ '--padding-xs': 'var(--spacing-1)' });
  });

  it('should render custom error component', async () => {
    renderComponent({
      errorComponent: () => <div data-testid="custom-error">custom error</div>,
    });
    await expectToBeVisibleInTheDocument('custom-error');
    await expectToBeVisibleInTheDocument('custom error', screen.findByText);
  });

  it('should format error', async () => {
    renderComponent({ error: { detail: 'error detail', statusCode: 404 } });
    await expectToBeVisibleInTheDocument('error detail', screen.findByText);
  });

  it('should render with data', async () => {
    renderComponent({
      isError: false,
      data: {
        age: 0,
        avatar: '',
        email: 'email',
        firstname: 'firstname',
        lastname: 'lastname',
        id: 1,
      },
      children: data => <div data-testid="user">{data.firstname}</div>,
    });

    await expectToBeVisibleInTheDocument('user');
    await expectToBeVisibleInTheDocument('firstname', screen.findByText);
  });

  it('should render null as errorComponent', async () => {
    renderComponent({
      isError: true,
      errorComponent: null,
    });

    await expectNotToBeVisibleInTheDocument('placeholder');
  });
});
