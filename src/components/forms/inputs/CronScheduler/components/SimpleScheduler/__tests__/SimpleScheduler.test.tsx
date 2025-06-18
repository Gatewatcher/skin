import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SimpleScheduler from '..';

describe('SimpleScheduler unit tests', () => {
  it('should render', async () => {
    render(
      <SimpleScheduler
        value={{
          period: 'days',
          hours: 9,
          minutes: 30,
          days: [0, 6],
        }}
        onChange={() => {}}
      />,
    );

    const allSelectedDayButtons = screen.getAllByRole('button', {
      name: /^(mo|tu|we|th|fr|sa|su)/i,
      pressed: true,
    });

    await expectToBeVisibleInTheDocument(/days/i, screen.findByText);
    expect(screen.getByRole('spinbutton', { name: /hours/i })).toHaveValue(9);
    expect(screen.getByRole('spinbutton', { name: /minutes/i })).toHaveValue(
      30,
    );
    expect(allSelectedDayButtons).toHaveLength(2);
  });

  it('should call onChange', async () => {
    const handleChange = vi.fn();
    render(<SimpleScheduler onChange={handleChange} value={{}} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('combobox', { name: /period/i }));
    await user.click(screen.getByText(/days/i));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      period: 'days',
      hours: 0,
      minutes: 0,
    });
  });
});
