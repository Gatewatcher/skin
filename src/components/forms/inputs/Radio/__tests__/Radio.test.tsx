import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { RadioProps } from '..';
import Radio from '..';
import {
  expectClickNotToCallOnChange,
  expectClickToCallOnChange,
} from '../../__tests__/utils';

describe('Radio', () => {
  const TEST_ID: TestId = 'radio';
  const ROLE = 'radio';

  const renderComponent = ({ ...props }: Partial<RadioProps> = {}) =>
    render(<Radio data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should call onChange function', async () => {
    await expectClickToCallOnChange<RadioProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should be disabled and not call onChange function', async () => {
    await expectClickNotToCallOnChange<RadioProps>(
      renderComponent,
      {},
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
});
