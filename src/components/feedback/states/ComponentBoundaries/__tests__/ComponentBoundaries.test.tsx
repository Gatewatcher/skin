import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { ComponentBoundariesProps } from '..';
import ComponentBoundaries from '..';
import { DEFAULT_ERROR } from '../../ErrorState/constants';

const DEFAULT_PROPS = {
  children: <div data-testid="base">base</div>,
  data: ['test'],
};

describe('ComponentBoundaries', () => {
  const TEST_ID: TestId = 'component-boundaries';

  const renderComponent = ({
    children,
    ...props
  }: ComponentBoundariesProps<string[] | null>) =>
    render(
      <ComponentBoundaries data-testid={TEST_ID} {...props}>
        {children}
      </ComponentBoundaries>,
    );

  describe('loader component', () => {
    it('should render loader if isLoading is true', async () => {
      renderComponent({ status: 'loading', ...DEFAULT_PROPS });
      await expectToBeVisibleInTheDocument('loader-state');
      await expectToBeVisibleInTheDocument('circular-loader');
    });
  });

  describe('empty component', () => {
    it('should render empty if isSuccess is true and data empty', async () => {
      renderComponent({ status: 'success', ...DEFAULT_PROPS, data: [] });
      await expectToBeVisibleInTheDocument('empty-state');
    });

    it('should render empty is data is undefined', async () => {
      renderComponent({ status: 'success', ...DEFAULT_PROPS, data: undefined });
      await expectToBeVisibleInTheDocument('empty-state');
    });

    it('should render empty is data is null', async () => {
      renderComponent({ status: 'success', ...DEFAULT_PROPS, data: null });
      await expectToBeVisibleInTheDocument('empty-state');
    });
  });

  describe('error component', () => {
    it('should render error if status is error', async () => {
      renderComponent({ status: 'error', ...DEFAULT_PROPS });
      await expectToBeVisibleInTheDocument('error-state');
      await expectToBeVisibleInTheDocument(
        DEFAULT_ERROR.detail,
        screen.findByText,
      );
    });

    it('should format error', async () => {
      renderComponent({
        error: { detail: 'error detail', statusCode: 404 },
        ...DEFAULT_PROPS,
      });
      await expectToBeVisibleInTheDocument('error detail', screen.findByText);
    });
  });

  describe('multiple statuses', () => {
    it('should render error if atleast one error', async () => {
      renderComponent({
        status: ['error', 'loading', 'success'],
        ...DEFAULT_PROPS,
      });
      await expectToBeVisibleInTheDocument('error-state');
    });

    it('should render loading if atleast one error', async () => {
      renderComponent({ status: ['loading', 'success'], ...DEFAULT_PROPS });
      await expectToBeVisibleInTheDocument('loader-state');
    });

    it('should render component', async () => {
      renderComponent({ status: ['success', 'success'], ...DEFAULT_PROPS });
      await expectToBeVisibleInTheDocument('base');
    });
  });
});
