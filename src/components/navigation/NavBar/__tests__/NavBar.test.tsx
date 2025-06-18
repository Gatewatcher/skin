import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { NavBarProps } from '..';
import NavBar from '..';

describe('NavBar', () => {
  const TEST_ID: TestId = 'nav-bar';

  const renderComponent = ({ ...props }: Partial<NavBarProps> = {}) =>
    render(
      <NavBar
        data-testid={TEST_ID}
        endElement={<div data-testid="end">end</div>}
        startElement={<div data-testid="start">start</div>}
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
    await expectToBeVisibleInTheDocument('start');
    await expectToBeVisibleInTheDocument('end');
  });

  it('should have slots', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('start', screen.findByText);
    await expectToBeVisibleInTheDocument('end', screen.findByText);
  });
});
