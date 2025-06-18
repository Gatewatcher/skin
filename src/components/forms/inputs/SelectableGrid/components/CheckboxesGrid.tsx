import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { Dispatch, SetStateAction } from 'react';

import Checkbox from '@/skin/forms/inputs/Checkbox';
import { Grid, Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { DEFAULT_TEST_ID } from '../constants';
import type { SelectableGridLabels } from '../types';
import { copy2DArray, create2DArray } from '../utils';

export type CheckboxesGridProps = {
  labels: SelectableGridLabels;
  data: boolean[][];
  setter: Dispatch<SetStateAction<boolean[][]>>;
  disabled?: boolean;
};

const CheckboxesGrid = ({
  data,
  disabled,
  labels,
  setter,
}: CheckboxesGridProps) => {
  const isRowSelected = (row: number) => {
    return data[row].every(cell => cell);
  };

  const isColumnSelected = (col: number) => {
    return data.reduce((acc, val) => acc && val[col], true);
  };

  const isGridSelected = () => {
    return data.reduce(
      (acc, val) => acc && val.reduce((acc, val) => acc && val, true),
      true,
    );
  };

  const handleRowChange = (status: boolean, row: number) => {
    const arrayCopy = copy2DArray(data);
    arrayCopy[row] = arrayCopy[row].map((cell, col) =>
      isColumnSelected(col) && !isRowSelected(row)
        ? arrayCopy[row][col]
        : status,
    );
    setter(arrayCopy);
  };

  const handleColumnChange = (status: boolean, col: number) => {
    const arrayCopy = copy2DArray(data);
    for (let row = 0; row < arrayCopy.length; row++) {
      arrayCopy[row][col] =
        isRowSelected(row) && !isColumnSelected(col)
          ? arrayCopy[row][col]
          : status;
    }
    setter(arrayCopy);
  };

  const handleCellChange = (row: number, col: number) => {
    const arrayCopy = copy2DArray(data);
    arrayCopy[row][col] = !arrayCopy[row][col];
    setter(arrayCopy);
  };

  const handleGridChange = () => {
    setter(
      create2DArray(
        labels.rows.length,
        labels.columns.length,
        !isGridSelected(),
      ),
    );
  };

  return (
    <Stack gap={13}>
      {!!labels && (
        <Stack direction="column" justifyContent="space-between">
          <Checkbox
            key="select-all"
            checked={isGridSelected()}
            data-testid="select-all"
            disabled={disabled}
            id="select-all"
            onChange={handleGridChange}
          />
          <Grid
            columns={1}
            data-testid={suffixTestId(DEFAULT_TEST_ID, 'rows')}
            isContainer
          >
            {labels.rows.map((label, index) => (
              <Checkbox
                key={`row-${index}`}
                checked={data?.[index].every(cell => cell)}
                data-testid={`row-${index}`}
                disabled={disabled}
                id={`row-${index}`}
                label={label}
                onChange={event => handleRowChange(event.target.checked, index)}
              />
            ))}
          </Grid>
        </Stack>
      )}
      <Stack direction="column" gap={8}>
        <Grid
          columns={labels.columns.length}
          data-testid={suffixTestId(DEFAULT_TEST_ID, 'body')}
          isContainer
        >
          {labels.columns.map((label, index) => (
            <Stack key={`col-${index}-stack`} direction="column" gap={2}>
              <Checkbox
                key={`col-${index}`}
                onChange={event =>
                  handleColumnChange(event.target.checked, index)
                }
                checked={data?.every(row => row[index])}
                data-testid={`col-${index}`}
                disabled={disabled}
                id={`col-${index}`}
              />
              <Text>{label}</Text>
            </Stack>
          ))}
          {!!labels && (
            <>
              {labels.rows.map((label, row) =>
                labels.columns.map((_, col) => (
                  <Checkbox
                    key={`cell-${row}-${col}`}
                    checked={data && data?.[row]?.[col]}
                    data-testid={`cell-${row}-${col}`}
                    disabled={disabled}
                    id={`cell-${row}-${col}`}
                    onChange={() => handleCellChange(row, col)}
                  />
                )),
              )}
            </>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default CheckboxesGrid;
