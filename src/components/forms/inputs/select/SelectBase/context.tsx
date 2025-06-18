import type { ReactElement, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { MultiSelectExclusiveProps } from '../MultiSelect';
import type { Option } from './types';

export type SelectContextType<
  OptionValue extends number | string,
  OptionMeta,
> = Pick<
  MultiSelectExclusiveProps<OptionValue, OptionMeta>,
  'displayMaxItems' | 'getOverflowLabel' | 'renderMultivalueLabelAs'
> & {
  footer?: ReactElement;
  renderLabelAs?: (option: Option<OptionValue, OptionMeta>) => ReactNode;
  renderValueAs?: (options: Option<OptionValue, OptionMeta>) => ReactNode;
  renderOptionLabelAs?: (option: Option<OptionValue, OptionMeta>) => ReactNode;
  withSelectableGroup?: boolean;
};

export type ContextType<
  OptionValue extends string | number,
  OptionMeta,
> = SelectContextType<OptionValue, OptionMeta>;

const Context = createContext<ContextType<never, never>>({
  displayMaxItems: -1,
});

type ProviderProps<
  OptionValue extends string | number,
  OptionMeta,
> = SelectContextType<OptionValue, OptionMeta> & {
  children: ReactNode;
};

const greaterOrEqualToZeroOrNull = (n?: number) => ((n ?? 0) >= 0 ? n : -1);

export const SelectProvider = <
  OptionValue extends string | number,
  OptionMeta,
>({
  children,
  displayMaxItems,
  footer,
  getOverflowLabel,
  renderLabelAs,
  renderValueAs = renderLabelAs,
  renderMultivalueLabelAs = renderLabelAs,
  renderOptionLabelAs = renderLabelAs,
  withSelectableGroup,
}: ProviderProps<OptionValue, OptionMeta>) => {
  const value = useMemo<ContextType<OptionValue, OptionMeta>>(
    () => ({
      displayMaxItems: greaterOrEqualToZeroOrNull(displayMaxItems),
      footer,
      getOverflowLabel,
      renderLabelAs,
      renderMultivalueLabelAs,
      renderOptionLabelAs,
      renderValueAs,
      withSelectableGroup,
    }),
    [
      displayMaxItems,
      footer,
      getOverflowLabel,
      renderLabelAs,
      renderMultivalueLabelAs,
      renderOptionLabelAs,
      renderValueAs,
      withSelectableGroup,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSelectContext = <
  OptionValue extends string | number,
  OptionsMeta,
>() => useContext(Context) as ContextType<OptionValue, OptionsMeta>;
