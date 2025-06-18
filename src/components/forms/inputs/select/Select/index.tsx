import type { ReactNode } from 'react';
import type { SingleValue as SingleValueType } from 'react-select';

import { DEFAULT_RENDER_READONLY_MODE } from '../../constants';
import type { MultiSelectExclusiveProps } from '../MultiSelect';
import type { SelectBaseProps } from '../SelectBase';
import SelectBase from '../SelectBase';
import { useFlattenedOptions } from '../SelectBase/hooks';
import type { Option } from '../SelectBase/types';
import SingleValue from './components/SingleValue';

export type SelectProps<
  OptionValue extends string | number = string,
  OptionMeta = undefined,
> = Omit<
  SelectBaseProps<OptionValue, false, OptionMeta>,
  | keyof MultiSelectExclusiveProps<OptionValue, OptionMeta>
  | 'isMulti'
  | 'value'
  | 'renderReadonlyMode'
> & {
  renderValueAs?: (props: Option<OptionValue, OptionMeta>) => ReactNode;
  value?: SingleValueType<Option<OptionValue, OptionMeta>> | OptionValue;
};

const Select = <
  OptionValue extends string | number = string,
  OptionMeta = undefined,
>({
  options,
  value: valueProps,
  ...props
}: SelectProps<OptionValue, OptionMeta>) => {
  const flattenedOptions = useFlattenedOptions(options);

  let value: Option<OptionValue, OptionMeta> | undefined | null =
    valueProps instanceof Object
      ? valueProps
      : flattenedOptions.find(item => item.value === valueProps);

  if (!value && valueProps && options?.length) {
    value = {
      label: valueProps,
      value: valueProps,
    } as Option<OptionValue, OptionMeta>;
  } else if (valueProps === null) {
    value = null;
  }

  return (
    <SelectBase
      renderReadonlyMode={props =>
        DEFAULT_RENDER_READONLY_MODE({ ...props, value: value?.value })
      }
      components={{ SingleValue }}
      value={value}
      {...props}
      isMulti={false}
      options={options}
    />
  );
};

export default Select;
