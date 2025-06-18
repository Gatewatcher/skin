import { useState } from 'react';

import { Dropdown } from '@/skin/displays';
import type { SelectOption } from '@/skin/forms';
import OptionCheckIcon from '@/skin/forms/inputs/select/SelectBase/components/Option/OptionCheckIcon';

import type { DropdownSelectBaseProps } from '..';
import type { DropdownSelectExclusiveProps } from '../../DropdownSelect';

export type DropdownSelectItemProps<T> = Pick<
  DropdownSelectBaseProps<T, true>,
  'renderLabelAs'
> &
  DropdownSelectExclusiveProps & {
    isMulti: boolean;
    isSelected: boolean;
    onUnselect: (value: SelectOption<T>) => void;
    onSelect: (value: SelectOption<T>) => void;
    option: SelectOption<T>;
  };

const DropdownSelectItem = function <T>({
  isSelected,
  isMulti,
  onUnselect,
  onSelect,
  option,
  renderLabelAs,
  unselectable,
}: DropdownSelectItemProps<T>) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleClick = () => {
    const method = isSelected ? onUnselect : onSelect;
    method(option);
  };

  return (
    <Dropdown.Button
      endElement={
        <OptionCheckIcon
          isFocused={focused || hovered}
          isSelected={isSelected}
        />
      }
      isFocused={focused}
      isSelected={isSelected}
      onBlur={() => setFocused(false)}
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      withCloseOnAction={isMulti ? false : unselectable && !isSelected}
    >
      {renderLabelAs ? renderLabelAs(option) : option.label}
    </Dropdown.Button>
  );
};

export default DropdownSelectItem;
