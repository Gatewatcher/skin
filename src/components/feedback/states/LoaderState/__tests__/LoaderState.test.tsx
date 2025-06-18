import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { User } from '@/mocks/types';

import type { LoaderStateProps } from '..';
import LoaderState from '..';

describe('LoaderState', () => {
  const TEST_ID: TestId = 'loader-state';

  const renderComponent = ({
    children = <div data-testid="base">base</div>,
    isLoading = true,
    ...props
  }: Partial<LoaderStateProps<User>> = {}) =>
    render(
      <LoaderState data-testid={TEST_ID} {...props} isLoading={isLoading}>
        {children}
      </LoaderState>,
    );

  it('should render base component', async () => {
    renderComponent({
      isLoading: false,
    });

    await expectToBeVisibleInTheDocument('base');
    await expectToBeVisibleInTheDocument('base', screen.findByText);
  });

  it('should render loader', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render loader with custom padding', async () => {
    renderComponent({ padding: 1 });
    const loader = await screen.findByTestId(TEST_ID);
    expect(loader).toHaveStyle({ '--padding-xs': 'var(--spacing-1)' });
  });

  it('should render loader with custom size', async () => {
    renderComponent({
      size: 'small',
    });
    const loader = await screen.findByTestId('circular-loader-svg');
    expect(loader).toHaveStyle({
      width: '1rem',
      height: '1rem',
    });
  });

  it('should render custom loader', async () => {
    renderComponent({ isLoading: true, loader: 'loader' });
    await expectToBeVisibleInTheDocument('loader', screen.findByText);
  });

  it('should render with data', async () => {
    renderComponent({
      isLoading: false,
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
});
