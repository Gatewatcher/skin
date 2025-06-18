import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DropdownIndicatorProps } from 'react-select';
import { components } from 'react-select';

import { Icon } from '@/skin/displays';

import type { Option } from '../../types';

import styles from '../../styles.module.scss';

export const DropdownIndicator = <OptionValue, OptionMeta>(
  props: DropdownIndicatorProps<Option<OptionValue, OptionMeta>>,
) => {
  const {
    isFocused,
    selectProps: { menuIsOpen },
  } = props;

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        className={classNames(
          styles.dropdownIcon,
          isFocused && styles.dropdownIconBright,
          menuIsOpen && styles.dropdownIconUpsideDown,
        )}
        name="ChevronDown"
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
