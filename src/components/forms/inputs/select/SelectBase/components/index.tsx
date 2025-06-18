import type { SelectComponentsConfig } from 'react-select';

import type { OptionGroup, Option as OptionType } from '../types';
import ClearIndicator from './ClearIndicator';
import DropdownIndicator from './DropdownIndicator';
import GroupHeading from './GroupHeading';
import LoadingIndicator from './LoadingIndicator';
import MenuList from './MenuList';
import Option from './Option';

export type ComponentsConfig<
  OptionValue,
  TMulti extends boolean,
  OptionMeta,
> = SelectComponentsConfig<
  OptionType<OptionValue, OptionMeta>,
  TMulti,
  OptionGroup<OptionValue, OptionMeta>
>;

export const getDefaultComponents = <
  OptionValue extends string | number,
  TMulti extends boolean,
  OptionMeta,
>() => {
  return {
    ClearIndicator,
    DropdownIndicator,
    GroupHeading,
    IndicatorSeparator: () => null,
    LoadingIndicator,
    LoadingMessage: () => null,
    MenuList,
    Option,
  } satisfies ComponentsConfig<OptionValue, TMulti, OptionMeta>;
};
