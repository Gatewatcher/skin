import type { ReactNode } from 'react';
import type {
  GroupBase,
  MultiValue,
  OptionsOrGroups as RSOptionsOrGroups,
  SingleValue,
} from 'react-select';

export type Option<
  OptionValue extends string | number | unknown = string,
  OptionMeta = undefined,
> = OptionMeta extends undefined
  ? {
      label: string;
      value: OptionValue;
    }
  : {
      label: string;
      value: OptionValue;
      meta: OptionMeta;
    };

export type OptionFooter = Option<string, { footer: ReactNode }>;

export type OptionGroup<
  OptionValue extends string | number | unknown = string,
  OptionMeta = undefined,
> = GroupBase<Option<OptionValue, OptionMeta>>;

export type OptionsOrGroups<
  OptionValue extends string | number | unknown = string,
  OptionMeta = undefined,
> = RSOptionsOrGroups<
  Option<OptionValue, OptionMeta>,
  OptionGroup<OptionValue, OptionMeta>
>;

export type NewSingleValue<
  OptionValue extends string | number,
  OptionMeta = undefined,
> = SingleValue<Option<OptionValue, OptionMeta>>;
export type NewMultiValue<
  OptionValue extends string | number,
  OptionMeta = undefined,
> = MultiValue<Option<OptionValue, OptionMeta>>;
