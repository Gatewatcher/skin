import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useEffect, useState } from 'react';

import InputBaseLabel from '@/skin/forms/inputs/InputBaseLabel';
import CheckboxesGrid from '@/skin/forms/inputs/SelectableGrid/components/CheckboxesGrid';
import {
  copy2DArray,
  initializeDefaultValue,
} from '@/skin/forms/inputs/SelectableGrid/utils';

import type { InputPropsWithoutRef, InputSharedProps } from '../types';
import {
  DEFAULT_TEST_ID,
  FALLBACK_MODE_CONFIG,
  SELECTABLE_GRID_MODES_CONFIG,
} from './constants';
import type { SelectableGridLabels, SelectableGridModes } from './types';

export type SelectableGridChangeEvent = (event: {
  target: { value: boolean[][] };
}) => void;

export type SelectableGridProps = DataTestId &
  Omit<InputPropsWithoutRef, 'children' | 'hidden' | 'onChange' | 'type'> & {
    label?: string;
    withLabel?: boolean;
    onChange?: SelectableGridChangeEvent;
    value?: boolean[][];
    helperText?: string;
    info?: string;
    isRequired?: boolean;
    meta?: InputSharedProps['meta'];
    name?: string;
    mode?: SelectableGridModes;
    labels?: SelectableGridLabels;
  };

const SelectableGrid = ({
  'data-testid': testId = DEFAULT_TEST_ID,
  disabled,
  value,
  label,
  onChange,
  labels,
  mode,
  info,
  isRequired,
  meta,
  name,
  withLabel,
  placeholder,
}: SelectableGridProps) => {
  const [data, setData] = useState<boolean[][]>(
    mode
      ? initializeDefaultValue(SELECTABLE_GRID_MODES_CONFIG[mode].labels, value)
      : initializeDefaultValue(labels ?? FALLBACK_MODE_CONFIG.labels, value),
  );
  useEffect(() => {
    if (onChange) {
      onChange({
        target: {
          value: copy2DArray(data),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <InputBaseLabel
      label={
        mode ? SELECTABLE_GRID_MODES_CONFIG[mode].label : label ?? undefined
      }
      data-testid={testId}
      htmlFor="selectable-grid"
      meta={meta}
      name={name}
      placeholder={placeholder?.toString() ?? ''}
      required={isRequired}
      tooltip={info}
      withLabel={withLabel}
    >
      {() => (
        <>
          {!!data && (
            <CheckboxesGrid
              labels={
                mode
                  ? SELECTABLE_GRID_MODES_CONFIG[mode].labels
                  : labels ?? FALLBACK_MODE_CONFIG.labels
              }
              data={data}
              disabled={disabled}
              setter={setData}
            />
          )}
        </>
      )}
    </InputBaseLabel>
  );
};

export default SelectableGrid;
