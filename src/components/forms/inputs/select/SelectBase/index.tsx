import { insertIf } from '@gatewatcher/bistoury/utils-lang';
import { type DataTestId } from '@gatewatcher/bistoury/utils-types';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import type { ActionMeta, Props as RSProps } from 'react-select';
import ReactSelect from 'react-select';
import type { CreatableProps } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

import type { InputBaseLabelProps } from '@/skin/forms/inputs/InputBaseLabel';
import InputBaseLabel from '@/skin/forms/inputs/InputBaseLabel';
import type { LoadMoreParams } from '@/skin/pagination';
import {
  DEFAULT_INITIAL_PAGE,
  DEFAULT_INITIAL_PER_PAGE,
} from '@/skin/pagination/LoadMore/constants';

import { getDefaultComponents } from './components';
import {
  DEFAULT_HAS_NEXT_PAGE,
  DEFAULT_HIDE_SELECTED_OPTIONS,
  DEFAULT_TEST_ID,
  DEFAULT_WITH_SELECTABLE_GROUP,
} from './constants';
import type { SelectContextType } from './context';
import { SelectProvider } from './context';
import type {
  NewMultiValue,
  NewSingleValue,
  Option,
  OptionFooter,
  OptionGroup,
  OptionsOrGroups,
} from './types';
import { getSelectClassNames } from './utils';

export type SelectBaseInternalProps<
  OptionValue extends string | number = string,
  TMulti extends boolean = boolean,
  OptionMeta = undefined,
> = Pick<
  RSProps<
    Option<OptionValue, OptionMeta>,
    TMulti,
    OptionGroup<OptionValue, OptionMeta>
  >,
  'components' | 'isMulti'
> &
  Pick<InputBaseLabelProps, 'renderReadonlyMode'>;

type CreateType<
  OptionValue extends string | number = string,
  TMulti extends boolean = boolean,
  OptionMeta = undefined,
> = CreatableProps<
  Option<OptionValue, OptionMeta>,
  TMulti,
  OptionGroup<OptionValue, OptionMeta>
>;

export type CreateProps<
  OptionValue extends string | number = string,
  TMulti extends boolean = boolean,
  OptionMeta = undefined,
> = Pick<
  CreateType<OptionValue, TMulti, OptionMeta>,
  | 'allowCreateWhileLoading'
  | 'formatCreateLabel'
  | 'isValidNewOption'
  | 'getNewOptionData'
> & {
  onCreate: CreateType<OptionValue, TMulti, OptionMeta>['onCreateOption'];
};

export type SelectBaseProps<
  OptionValue extends string | number = string,
  TMulti extends boolean = boolean,
  OptionMeta = undefined,
> = DataTestId &
  Omit<
    RSProps<
      Option<OptionValue, OptionMeta>,
      TMulti,
      OptionGroup<OptionValue, OptionMeta>
    >,
    'components' | 'isDisabled' | 'isMulti'
  > &
  Pick<
    InputBaseLabelProps,
    | 'meta'
    | 'label'
    | 'labelDirection'
    | 'placeholder'
    | 'required'
    | 'disabled'
    | 'withLabel'
    | 'readonlyMode'
    | 'preventAutocomplete'
  > &
  SelectBaseInternalProps<OptionValue, TMulti, OptionMeta> &
  Partial<SelectContextType<OptionValue, OptionMeta>> & {
    createOptions?: CreateProps<OptionValue, TMulti, OptionMeta>;
    footer?: ReactNode;
    helperText?: string;
    info?: ReactNode;
    isError?: boolean;
    name?: string;
    onLoadMore?: (options: LoadMoreParams) => void;
    size?: 'medium' | 'small';
  } & {
    hasNextPage?: boolean;
    initialPage?: number;
    initialPerPage?: number;
  };

const SelectBase = <
  OptionValue extends string | number = string,
  TMulti extends boolean = false,
  OptionMeta = undefined,
>({
  closeMenuOnSelect,
  createOptions,
  components: componentsProps,
  'data-testid': testId = DEFAULT_TEST_ID,
  disabled,
  displayMaxItems,
  footer,
  getOverflowLabel,
  hasNextPage = DEFAULT_HAS_NEXT_PAGE,
  hideSelectedOptions = DEFAULT_HIDE_SELECTED_OPTIONS,
  info,
  initialPage = DEFAULT_INITIAL_PAGE,
  initialPerPage = DEFAULT_INITIAL_PER_PAGE,
  isError,
  isMulti,
  isLoading,
  label,
  labelDirection,
  meta,
  name,
  onChange,
  onLoadMore,
  onMenuScrollToBottom,
  options: optionProps,
  placeholder,
  preventAutocomplete,
  readonlyMode,
  renderLabelAs,
  renderMultivalueLabelAs,
  renderOptionLabelAs,
  renderValueAs,
  renderReadonlyMode,
  required,
  value,
  withLabel,
  withSelectableGroup = DEFAULT_WITH_SELECTABLE_GROUP,
  isClearable = !required,
  ...rest
}: SelectBaseProps<OptionValue, TMulti, OptionMeta>) => {
  type ValueType = TMulti extends true
    ? NewMultiValue<OptionValue, OptionMeta>
    : NewSingleValue<OptionValue, OptionMeta>;

  const inputId = useId();
  const componentClassNames = getSelectClassNames<OptionValue, OptionMeta>({
    isError,
  });
  const components = {
    ...getDefaultComponents<OptionValue, TMulti, OptionMeta>(),
    ...componentsProps,
  };

  const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>({
    offset: 0,
    page: initialPage,
    perPage: initialPerPage,
    sort: [],
    type: 'infiniteScroll',
  });

  const handleChange = (
    value: ValueType,
    action: ActionMeta<Option<OptionValue, OptionMeta>>,
  ) => {
    return onChange?.(value, action);
  };

  const handleScrollToBottom = (event: WheelEvent | TouchEvent) => {
    if (!hasNextPage || isLoading) return;

    setLoadMoreParams(prev => ({
      ...prev,
      offset: prev.offset + prev.perPage,
      page: prev.page + 1,
    }));

    onMenuScrollToBottom?.(event);
  };

  const options = [
    ...(optionProps || []),
    ...insertIf<OptionFooter>(!!footer, {
      label: 'footer',
      value: '__footer__',
      meta: {
        footer,
      },
    }),
  ] as OptionsOrGroups<OptionValue, OptionMeta>;

  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    if (!loadMoreParams.offset) return;

    onLoadMoreRef.current?.(loadMoreParams);
  }, [loadMoreParams]);

  return (
    <InputBaseLabel
      data-testid={testId}
      disabled={disabled}
      htmlFor={inputId}
      label={label}
      labelDirection={labelDirection}
      meta={meta}
      name={name}
      placeholder={placeholder}
      preventAutocomplete={preventAutocomplete}
      readonlyMode={readonlyMode}
      renderReadonlyMode={renderReadonlyMode}
      required={required}
      tooltip={info}
      withLabel={withLabel}
    >
      {({ disabled, ...props }) => {
        const selectProps: RSProps<
          Option<OptionValue, OptionMeta>,
          TMulti,
          OptionGroup<OptionValue, OptionMeta>
        > = {
          menuPlacement: 'auto',
          menuPosition: 'fixed',
          ...rest,
          ...props,

          classNames: componentClassNames,
          closeMenuOnSelect: closeMenuOnSelect ?? !isMulti,
          components: components,
          hideSelectedOptions,
          inputId,
          isClearable,
          isDisabled: disabled,
          isLoading,
          isMulti,
          onChange: handleChange,
          onMenuScrollToBottom: handleScrollToBottom,
          options,
          value,
          onKeyDown: event => {
            if (event.key === 'Escape') event.stopPropagation();
            rest.onKeyDown?.(event);
          },
        };

        return (
          <SelectProvider
            displayMaxItems={displayMaxItems}
            footer={footer}
            getOverflowLabel={getOverflowLabel}
            renderLabelAs={renderLabelAs}
            renderMultivalueLabelAs={renderMultivalueLabelAs}
            renderOptionLabelAs={renderOptionLabelAs}
            renderValueAs={renderValueAs}
            withSelectableGroup={withSelectableGroup}
          >
            {createOptions ? (
              <CreatableSelect<Option<OptionValue, OptionMeta>, TMulti>
                {...selectProps}
                {...createOptions}
                onCreateOption={createOptions.onCreate}
              />
            ) : (
              <ReactSelect {...selectProps} />
            )}
          </SelectProvider>
        );
      }}
    </InputBaseLabel>
  );
};

export default SelectBase;
