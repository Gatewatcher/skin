import { insertIf, isObject } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type {
  ActionMeta,
  MultiValueProps,
  MultiValue as MultiValueType,
  MultiValue as RSMultiValue,
} from 'react-select';

import type { ChipProps } from '@/skin/displays';

import { DEFAULT_RENDER_READONLY_MODE } from '../../constants';
import type { SelectBaseProps } from '../SelectBase';
import SelectBase from '../SelectBase';
import { useFlattenedOptions } from '../SelectBase/hooks';
import type { Option } from '../SelectBase/types';
import { GroupHeading } from './components/GroupHeading';
import MultiValue from './components/MultiValue';
import ValueContainer from './components/ValueContainer';
import {
  ALL_VALUE,
  DEFAULT_SELECT_ALL_LABEL,
  DEFAULT_TYPE,
  DEFAULT_UNSELECT_ALL_LABEL,
  DEFAULT_WITH_SELECT_ALL,
} from './constants';

export type MultiSelectExclusiveProps<
  OptionValue extends number | string = string,
  OptionMeta = undefined,
> = Pick<ChipProps, 'type'> & {
  displayMaxItems?: number;
  getOverflowLabel?: (selectedCount: number) => string;
  renderMultivalueLabelAs?: (
    props: Option<OptionValue, OptionMeta> &
      Pick<MultiValueProps, 'removeProps'>,
  ) => ReactNode;
  selectAllLabel?: string;
  unselectAllLabel?: string;
  withSelectAll?: boolean;
  withSelectableGroup?: boolean;
};

export type MultiSelectProps<
  OptionValue extends string | number = string,
  OptionMeta = undefined,
> = Omit<
  SelectBaseProps<OptionValue, true, OptionMeta>,
  'isMulti' | 'value' | 'defaultValue' | 'renderReadonlyMode'
> &
  MultiSelectExclusiveProps<OptionValue, OptionMeta> & {
    value?: MultiValueType<Option<OptionValue, OptionMeta>> | OptionValue[];
    defaultValue?: MultiValueType<Option<OptionValue, OptionMeta>>;
  };

const MultiSelect = <
  OptionValue extends string | number = string,
  OptionMeta = undefined,
>({
  defaultValue,
  onChange,
  options: optionsProps,
  selectAllLabel = DEFAULT_SELECT_ALL_LABEL,
  type = DEFAULT_TYPE,
  unselectAllLabel = DEFAULT_UNSELECT_ALL_LABEL,
  value: valueProps = defaultValue,
  withSelectAll = DEFAULT_WITH_SELECT_ALL,
  ...props
}: MultiSelectProps<OptionValue, OptionMeta>) => {
  const flattenedOptions = useFlattenedOptions<OptionValue, OptionMeta>(
    optionsProps,
  );

  const [selectedValues, setSelectedValues] = useState<
    RSMultiValue<Option<OptionValue, OptionMeta>>
  >([]);

  useEffect(() => {
    const newValues = flattenedOptions.filter(item =>
      (valueProps || []).some(option => {
        return isObject(option)
          ? (option as Option<OptionValue, OptionMeta>).value === item.value
          : option === item.value;
      }),
    );

    setSelectedValues(newValues);
  }, [valueProps, flattenedOptions]);

  const allOption = useMemo<Option>(() => {
    return {
      label:
        selectedValues.length !== flattenedOptions.length
          ? selectAllLabel
          : unselectAllLabel,
      value: ALL_VALUE,
    };
  }, [selectAllLabel, flattenedOptions, selectedValues, unselectAllLabel]);

  const options = useMemo(() => {
    return [
      ...insertIf(withSelectAll, allOption),
      ...((optionsProps || []) as Option<OptionValue, OptionMeta>[]),
    ] as Option<OptionValue, OptionMeta>[];
  }, [optionsProps, withSelectAll, allOption]);

  const handleChange = (
    newValue: RSMultiValue<Option<OptionValue, OptionMeta>>,
    actionMeta: ActionMeta<Option<OptionValue, OptionMeta>>,
  ) => {
    const { action, option } = actionMeta;
    const { value } = option || {};

    let items: RSMultiValue<Option<OptionValue, OptionMeta>> = newValue;

    if (action === 'select-option' && value === ALL_VALUE) {
      items =
        flattenedOptions.length === selectedValues.length
          ? []
          : flattenedOptions;
    } else if (
      (action === 'deselect-option' && value === ALL_VALUE) ||
      action === 'clear'
    ) {
      items = [];
    }

    setSelectedValues(items);
    onChange?.(items, actionMeta);
  };

  return (
    <SelectBase
      components={{
        MultiValue: props => <MultiValue {...props} type={type} />,
        ValueContainer,
        GroupHeading,
      }}
      renderReadonlyMode={props =>
        DEFAULT_RENDER_READONLY_MODE({
          ...props,
          value: selectedValues.map(item => item.value).join(', '),
        })
      }
      {...props}
      defaultValue={defaultValue}
      onChange={handleChange}
      options={options}
      value={selectedValues}
      isMulti
    />
  );
};

export default MultiSelect;
