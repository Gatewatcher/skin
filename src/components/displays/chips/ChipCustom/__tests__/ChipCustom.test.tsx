import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/dom';

import { renderWithThemeProvider } from '@/tests';

import type { ChipCustomProps } from '..';
import ChipCustom from '..';

describe('ChipCustom', () => {
  const TEST_ID: TestId = 'chip';
  const content = 'value';

  const renderComponent = ({
    backgroundColor = '',
    color = '',
    ...props
  }: Partial<ChipCustomProps> = {}) => {
    return renderWithThemeProvider(
      <ChipCustom
        backgroundColor={backgroundColor}
        color={color}
        data-testid={TEST_ID}
        {...props}
      >
        {content}
      </ChipCustom>,
    );
  };

  const getChip = async () => await screen.findByTestId(TEST_ID);

  it('should forward custom colors', async () => {
    renderComponent({
      color: 'rgb(10, 10, 10)',
      backgroundColor: 'rgb(200, 200, 200)',
    });

    expect(await getChip()).toHaveStyle({
      color: 'rgb(10, 10, 10)',
      backgroundColor: 'rgb(200, 200, 200)',
    });
  });

  it('should have custom color as function', async () => {
    const color = vi.fn().mockResolvedValue('rgb(0, 0, 255)');

    renderComponent({
      color: await color(),
      backgroundColor: 'rgb(0, 255, 0)',
    });

    const chip = await getChip();
    expect(chip).toHaveStyle({
      color: 'rgb(0, 0, 255)',
      backgroundColor: 'rgb(0, 255, 0)',
    });
  });
});
