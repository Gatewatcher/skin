import { useState } from 'react';

import type { SelectOption } from '../..';
import type { DropdownSelectBaseProps, Values } from '../DropdownSelectBase';
import DropdownSelectBase from '../DropdownSelectBase';
import { DEFAULT_UNSELECTABLE } from './constants';

export type DropdownSelectExclusiveProps = {
  unselectable?: boolean;
};

export type DropdownSelectProps<T> = DropdownSelectBaseProps<T, false> &
  DropdownSelectExclusiveProps;

const DropdownSelect = <T,>({
  'data-testid': testId = 'dropdown-select',
  initialValue,
  unselectable = DEFAULT_UNSELECTABLE,
  ...rest
}: DropdownSelectProps<T>) => {
  const [value, setValue] = useState<Values<T, false> | undefined>(
    initialValue,
  );

  const handleSelect = (item: SelectOption<T>) => {
    setValue(item.value);
  };

  const handleUnselect = () => {
    if (unselectable) {
      setValue(undefined);
    }
  };

  return (
    <DropdownSelectBase
      data-testid={testId}
      initialValue={initialValue}
      isMulti={false}
      onSelect={handleSelect}
      onUnselect={handleUnselect}
      value={value}
      {...rest}
    />
  );
};

export default DropdownSelect;
