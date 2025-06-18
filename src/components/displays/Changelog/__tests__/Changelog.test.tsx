import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';

import type { ChangelogProps } from '..';
import Changelog from '..';
import { DEFAULT_CHANGELOG, TEST_ID } from '../constants';

describe('Changelog', () => {
  const renderComponent = ({
    changelog = DEFAULT_CHANGELOG,
    dateMode,
  }: Partial<ChangelogProps> = {}) =>
    render(
      <Changelog
        changelog={changelog}
        data-testid={TEST_ID}
        dateMode={dateMode}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have version', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(
      DEFAULT_CHANGELOG[0].version,
      screen.findByText,
    );
  });

  it('should have date', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(
      DEFAULT_CHANGELOG[0].date,
      screen.findByText,
    );
  });

  it('should have a relative date', async () => {
    renderComponent({ dateMode: 'relative' });
    expect(await screen.findAllByText(/\w+ \w+ ago/)).toHaveLength(2);
  });

  it('should have data', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(
      DEFAULT_CHANGELOG[0].data.replace('## ', ''),
      screen.findByText,
    );
  });

  it('should render multiple version', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument('changelog');
    const group = await screen.findByTestId('changelog');
    expect(group.childElementCount).toBe(2);
  });
});
