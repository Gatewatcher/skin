import { useState } from 'react';

import { Dropdown } from '@/skin/displays';

import type { SelectOption } from '../..';
import type { DropdownSelectBaseProps, Values } from '../DropdownSelectBase';
import DropdownSelectBase from '../DropdownSelectBase';
import {
  DEFAULT_INITIAL_VALUES,
  DEFAULT_SELECT_ALL_LABEL,
  DEFAULT_UNSELECT_ALL_LABEL,
  DEFAULT_WITH_SELECT_ALL,
} from './constants';

export type DropdownMultiSelectExclusiveProps = {
  selectAllLabel?: string;
  unselectAllLabel?: string;
  withSelectAll?: boolean;
};

export type DropdownMultiSelectProps<T> = DropdownSelectBaseProps<T, true> &
  DropdownMultiSelectExclusiveProps;

const DropdownMultiSelect = <T,>({
  'data-testid': testId = 'dropdown-multi-select',
  initialValue = DEFAULT_INITIAL_VALUES,
  options,
  selectAllLabel = DEFAULT_SELECT_ALL_LABEL,
  unselectAllLabel = DEFAULT_UNSELECT_ALL_LABEL,
  withSelectAll = DEFAULT_WITH_SELECT_ALL,
  ...rest
}: DropdownMultiSelectProps<T>) => {
  const [value, setValue] = useState<Values<T, true>>(initialValue);

  const handleSelect = (item: SelectOption<T>) => {
    setValue(prev => [...prev, item.value]);
  };

  const handleUnselect = (option: SelectOption<T>) => {
    setValue(prev => prev.filter(item => item !== option.value));
  };

  const selectAll = () => {
    setValue(options.map(item => item.value));
  };

  const unselectAll = () => {
    setValue([]);
  };

  const allValuesSelected = value.length === options.length;

  return (
    <DropdownSelectBase
      startListElement={
        withSelectAll && (
          <Dropdown.Button
            onClick={allValuesSelected ? unselectAll : selectAll}
          >
            {allValuesSelected ? unselectAllLabel : selectAllLabel}
          </Dropdown.Button>
        )
      }
      data-testid={testId}
      initialValue={initialValue}
      isMulti={true}
      onSelect={handleSelect}
      onUnselect={handleUnselect}
      options={options}
      value={value}
      {...rest}
    />
  );
};

export default DropdownMultiSelect;
