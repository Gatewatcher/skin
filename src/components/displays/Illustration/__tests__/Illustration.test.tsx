import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import { ILLUSTRATION_SIZES_PX } from '@/constants';

import type { IllustrationProps } from '..';
import Illustration from '..';

describe('Illustration', () => {
  const TEST_ID: TestId = 'illustration';

  const renderComponent = ({
    name = '404Error',
    ...props
  }: Partial<IllustrationProps> = {}) =>
    render(<Illustration data-testid={TEST_ID} name={name} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be small', async () => {
    renderComponent({ size: 'small' });
    expect(await screen.findByTestId(TEST_ID)).toHaveStyle({
      width: ILLUSTRATION_SIZES_PX.small,
    });
  });
});
