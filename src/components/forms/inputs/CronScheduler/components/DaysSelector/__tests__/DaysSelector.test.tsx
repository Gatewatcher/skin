import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DaysSelector from '..';
import type { WeekDays } from '../../../types';

describe('DaySelector unit test', () => {
  describe('en (default)', () => {
    it('should have saturday and sunday selected', async () => {
      render(<DaysSelector value={[0, 6]} />);

      const allSelectedDayButtons = screen.getAllByRole('button', {
        name: /^(mo|tu|we|th|fr|sa|su)/i,
        pressed: true,
      });

      expect(allSelectedDayButtons).toHaveLength(2);
      expect(allSelectedDayButtons[0]).toHaveTextContent(/^sa/i);
      expect(allSelectedDayButtons[1]).toHaveTextContent(/^su/i);
    });

    it('should select monday', async () => {
      const handleChange = vi.fn();
      render(<DaysSelector onChange={handleChange} value={[0, 6]} />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: /^mo/i }));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([0, 1, 6]);
    });

    it('should unselect saturday', async () => {
      const handleChange = vi.fn();
      render(<DaysSelector onChange={handleChange} value={[0, 6]} />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: /^sa/i }));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([0]);
    });
  });

  describe('fr', () => {
    const FR_WEEK_DAYS: WeekDays = [
      [1, 'Lu'],
      [2, 'Ma'],
      [3, 'Me'],
      [4, 'Je'],
      [5, 'Ve'],
      [6, 'Sa'],
      [0, 'Di'],
    ];

    it('should have saturday and sunday selected', async () => {
      render(<DaysSelector value={[0, 6]} weekDays={FR_WEEK_DAYS} />);

      const allSelectedDayButtons = screen.getAllByRole('button', {
        name: /^(lu|ma|me|je|ve|sa|di)/i,
        pressed: true,
      });

      expect(allSelectedDayButtons).toHaveLength(2);
      expect(allSelectedDayButtons[0]).toHaveTextContent(/^sa/i);
      expect(allSelectedDayButtons[1]).toHaveTextContent(/^di/i);
    });

    it('should select monday', async () => {
      const handleChange = vi.fn();
      render(
        <DaysSelector
          onChange={handleChange}
          value={[0, 6]}
          weekDays={FR_WEEK_DAYS}
        />,
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: /^lu/i }));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([0, 1, 6]);
    });

    it('should unselect saturday', async () => {
      const handleChange = vi.fn();
      render(
        <DaysSelector
          onChange={handleChange}
          value={[0, 6]}
          weekDays={FR_WEEK_DAYS}
        />,
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: /^sa/i }));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([0]);
    });
  });
});
