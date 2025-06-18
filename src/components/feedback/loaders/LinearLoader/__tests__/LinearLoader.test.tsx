import { render, screen } from '@testing-library/react';

import { DEFAULT_TEST_ID } from '../constants';
import LinearLoader, { buildLinearLoaderTestIds } from '../index';

describe('LinearLoader tests', () => {
  const TEST_ID = DEFAULT_TEST_ID;
  const CUSTOM_SIZE = 42;

  const getLinearLoader = () => screen.getByTestId(TEST_ID);
  const getDeterminate = () =>
    screen.getByTestId(buildLinearLoaderTestIds(TEST_ID).determinate);

  test('renders the component', async () => {
    render(<LinearLoader data-testid={TEST_ID} progress={CUSTOM_SIZE} />);
    expect(getLinearLoader()).toBeInTheDocument();
    expect(getDeterminate()).toBeInTheDocument();
    expect(getDeterminate()).toHaveStyle(`width: ${CUSTOM_SIZE}%`);
  });

  test('renders the component rounded', async () => {
    render(
      <LinearLoader data-testid={TEST_ID} progress={CUSTOM_SIZE} rounded />,
    );
    expect(getLinearLoader()).toHaveClass('rounded');
  });
});
