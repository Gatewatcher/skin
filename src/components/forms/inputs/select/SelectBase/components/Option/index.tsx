import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { Fragment } from 'react';
import type { OptionProps } from 'react-select';
import { components } from 'react-select';

import { withStopPropagation } from '@/hocs';
import { Button } from '@/skin/actions';
import { SelectableItemButton } from '@/skin/actions/selectable/SelectableItemButton';
import { Input } from '@/skin/forms';

import { ALL_VALUE } from '../../../MultiSelect/constants';
import { useSelectContext } from '../../context';
import type { OptionFooter, Option as OptionType } from '../../types';
import CreateOptionComponent from './CreateOption';
import CustomOption from './CustomOption';
import OptionCheckIcon from './OptionCheckIcon';

import styles from '../../styles.module.scss';

export type CreateOption<OptionValue, OptionMeta> = OptionType<
  OptionValue,
  OptionMeta
> & {
  __isNew__: boolean;
};

const Option = <OptionValue extends string | number, OptionMeta>(
  props: OptionProps<OptionType<OptionValue, OptionMeta>>,
) => {
  const { renderOptionLabelAs, footer } = useSelectContext<
    OptionValue,
    OptionMeta
  >();
  const { isDisabled, isFocused, isSelected, isMulti } = props;

  const isSelectAllOptions = props.data.value === ALL_VALUE;
  const isCreateOption = (props.data as CreateOption<OptionValue, OptionMeta>)
    .__isNew__;

  const isFooterOptions = !!(props.data as OptionFooter)?.meta?.footer;

  const withoutEndElement = isSelectAllOptions || isCreateOption;

  const endElement = isMulti ? (
    <Input.Checkbox checked={isSelected} readOnly />
  ) : (
    <OptionCheckIcon isFocused={isFocused} isSelected={isSelected} />
  );

  if (isFooterOptions) {
    return (
      <CustomOption {...props} asButton={false} className={styles.optionFooter}>
        {footer}
      </CustomOption>
    );
  }

  if (isSelectAllOptions) {
    return (
      <CustomOption
        {...props}
        className={classNames(
          props.isFocused && styles.optionSelectAllFocused,
          props.isSelected && styles.optionSelectAllSelected,
          styles.optionSelectAll,
        )}
      >
        <Button variant="transparent">{props.label}</Button>
      </CustomOption>
    );
  }

  if (isCreateOption) {
    return (
      <CustomOption
        {...props}
        className={classNames(styles.optionFooter, styles.optionCreate)}
      >
        <CreateOptionComponent>{props.label}</CreateOptionComponent>

        {footer && withStopPropagation(footer)}
      </CustomOption>
    );
  }

  return (
    <components.Option {...props} className={styles.option}>
      <SelectableItemButton
        data-testid="option"
        endElement={!withoutEndElement ? endElement : <Fragment />}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        fill
      >
        {renderOptionLabelAs && !isSelectAllOptions && !isCreateOption
          ? renderOptionLabelAs(props.data)
          : props.label}
      </SelectableItemButton>
    </components.Option>
  );
};

export default Option;
