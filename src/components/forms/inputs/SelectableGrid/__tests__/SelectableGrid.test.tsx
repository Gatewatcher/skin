import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TIMETABLE_MODE_CONFIG } from '@/skin/forms/inputs/SelectableGrid/constants';

import type { SelectableGridProps } from '..';
import SelectableGrid from '..';

describe('SelectableGrid', () => {
  const user = userEvent.setup();

  const renderComponent = ({ ...props }: Partial<SelectableGridProps> = {}) =>
    render(<SelectableGrid {...props} />);

  it('should display input with base label', async () => {
    renderComponent({ mode: 'timetable' });
    const label = await screen.getByText(TIMETABLE_MODE_CONFIG.label);
    expect(label).toBeVisible();
  });

  it('should select a cell', async () => {
    renderComponent({ mode: 'timetable' });
    const cell = await screen.findByTestId('cell-0-0');
    await user.click(cell);
    expect(cell.firstChild).toBeChecked();
  });

  it('should select a row', async () => {
    renderComponent({ mode: 'timetable' });
    const rowSelector = await screen.findByTestId('row-0');
    await user.click(rowSelector);
    for (let i = 0; i < TIMETABLE_MODE_CONFIG.labels.columns.length; i++) {
      const cellAtRowIndex = await screen.findByTestId(`cell-0-${i}`);
      expect(cellAtRowIndex.firstChild).toBeChecked();
    }
  });

  it('should select a column', async () => {
    renderComponent({ mode: 'timetable' });
    const colSelector = await screen.findByTestId('col-0');
    await user.click(colSelector);
    for (let i = 0; i < TIMETABLE_MODE_CONFIG.labels.rows.length; i++) {
      const cellAtColIndex = await screen.findByTestId(`cell-${i}-0`);
      expect(cellAtColIndex.firstChild).toBeChecked();
    }
  });

  it('should select grid', async () => {
    renderComponent({ mode: 'timetable' });
    const gridSelector = await screen.findByTestId('select-all');
    await user.click(gridSelector);
    for (let i = 0; i < TIMETABLE_MODE_CONFIG.labels.rows.length; i++) {
      for (let j = 0; j < TIMETABLE_MODE_CONFIG.labels.columns.length; j++) {
        const cellAtIndexes = await screen.findByTestId(`cell-${i}-${j}`);
        expect(cellAtIndexes.firstChild).toBeChecked();
      }
    }
  });

  it('should deselect row selector on cell change', async () => {
    renderComponent({ mode: 'timetable' });
    const rowSelector = await screen.findByTestId('row-0');
    await user.click(rowSelector);
    expect(rowSelector.firstChild).toBeChecked();
    const cellInRow = await screen.findByTestId('cell-0-0');
    await user.click(cellInRow);
    expect(rowSelector.firstChild).not.toBeChecked();
  });

  it('should deselect column selector on cell change', async () => {
    renderComponent({ mode: 'timetable' });
    const colSelector = await screen.findByTestId('col-0');
    await user.click(colSelector);
    expect(colSelector.firstChild).toBeChecked();
    const cellInRow = await screen.findByTestId('cell-0-0');
    await user.click(cellInRow);
    expect(colSelector.firstChild).not.toBeChecked();
  });

  it('should deselect grid selector on cell change', async () => {
    renderComponent({ mode: 'timetable' });
    const gridSelector = await screen.findByTestId('select-all');
    await user.click(gridSelector);
    expect(gridSelector.firstChild).toBeChecked();
    const cellInRow = await screen.findByTestId('cell-0-0');
    await user.click(cellInRow);
    expect(gridSelector.firstChild).not.toBeChecked();
  });
});
