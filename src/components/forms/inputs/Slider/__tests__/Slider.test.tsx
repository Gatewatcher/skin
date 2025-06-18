import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { SliderProps } from '..';
import Slider from '..';

describe('Slider', () => {
  const TEST_ID: TestId = 'slider';

  const renderComponent = ({ ...props }: Partial<SliderProps> = {}) =>
    render(<Slider data-testid={TEST_ID} value={10} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
