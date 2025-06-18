import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { ClassNamesConfig, GroupBase } from 'react-select';

import type { Option } from './types';

import styles from './styles.module.scss';

export function getSelectClassNames<OptionValue, OptionMeta>({
  isError,
}: {
  isError?: boolean;
}) {
  const classNamesConfig: ClassNamesConfig<
    Option<OptionValue, OptionMeta>,
    boolean,
    GroupBase<Option<OptionValue, OptionMeta>>
  > = {};
  classNamesConfig.control = ({ isFocused, selectProps: { isDisabled } }) =>
    classNames(
      styles.control,
      isError && styles.isError,
      isDisabled && styles.isDisabled,
      isFocused && styles.isFocused,
    );
  classNamesConfig.group = () => styles.group;
  classNamesConfig.input = ({ selectProps, isMulti, hasValue }) =>
    classNames(
      selectProps.isSearchable && styles.input,
      !isMulti && hasValue && styles.inputCaret,
    );
  classNamesConfig.menu = () => styles.menu;
  classNamesConfig.menuPortal = () => styles.menuPortal;
  classNamesConfig.placeholder = () => styles.placeholder;
  classNamesConfig.singleValue = () => styles.singleValue;
  classNamesConfig.valueContainer = () => styles.valueContainer;
  classNamesConfig.placeholder = () => styles.placeholder;

  return classNamesConfig;
}
