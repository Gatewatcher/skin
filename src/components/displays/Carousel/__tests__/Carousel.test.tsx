import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import type { CarouselProps } from '..';
import Carousel from '..';
import { TEST_IDS } from '../constants';

describe('Carousel', () => {
  const user = userEvent.setup();

  const renderComponent = (props: CarouselProps) =>
    render(<Carousel {...props} />);

  it('should have left and right button disabled', async () => {
    renderComponent({ children: <div></div> });

    const leftButton = await screen.findByTestId(TEST_IDS.leftButton);
    const rightButton = await screen.findByTestId(TEST_IDS.rightButton);

    expect(leftButton).toBeDisabled();
    expect(rightButton).toBeDisabled();
  });

  it('should have dropdown button visible', async () => {
    renderComponent({
      children: <div></div>,
      dropdownContent: <div>test</div>,
    });

    const dropdownButton = await screen.findByTestId(TEST_IDS.dropdownButton);
    await act(async () => {
      await user.click(dropdownButton);
    });

    waitFor(async () => {
      await expectToBeVisibleInTheDocument('test', screen.findByAltText);
    });
  });

  it('should have children visible', async () => {
    renderComponent({
      children: (
        <div>
          <div>test1</div>
          <div>test2</div>
        </div>
      ),
    });

    waitFor(async () => {
      await expectToBeVisibleInTheDocument('test1', screen.findByAltText);
      await expectToBeVisibleInTheDocument('test2', screen.findByAltText);
    });
  });
});
