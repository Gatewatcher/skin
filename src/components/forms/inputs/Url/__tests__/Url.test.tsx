import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { UrlProps } from '..';
import Url from '..';

describe('Url', () => {
  const TEST_ID: TestId = 'input-url';

  const user = userEvent.setup();

  const renderComponent = ({ ...props }: Partial<UrlProps> = {}) =>
    render(<Url data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have custom prefix', async () => {
    renderComponent({ prefix: 'prefix' });
    await expectToBeVisibleInTheDocument('prefix', screen.findByText);
  });

  it('should have custom suffix', async () => {
    renderComponent({ suffix: 'suffix' });
    await expectToBeVisibleInTheDocument('suffix', screen.findByText);
  });

  it('should have custom affixes', async () => {
    renderComponent({ prefix: 'prefix', suffix: 'suffix' });
    await expectToBeVisibleInTheDocument('prefix', screen.findByText);
    await expectToBeVisibleInTheDocument('suffix', screen.findByText);
  });

  it('should not render affixes twice', async () => {
    renderComponent({ prefix: 'https://', suffix: '.com' });
    const input = await screen.findByRole('textbox');
    await user.type(input, 'https://www.google.com');
    await expectToBeVisibleInTheDocument('https://', screen.findByText);
    await expectToBeVisibleInTheDocument('.com', screen.findByText);
  });
});
