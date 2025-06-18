import { arrayDifference, unique } from '@gatewatcher/bistoury/utils-lang';
import { type ChangeEvent, useId } from 'react';
import type { GroupHeadingProps as RSGroupHeadingProps } from 'react-select';
import { components } from 'react-select';

import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { useSelectContext } from '../../../SelectBase/context';
import type { Option } from '../../../SelectBase/types';

import styles from '../../styles.module.scss';

export type GroupHeadingProps<OptionValue, OptionMeta> = RSGroupHeadingProps<
  Option<OptionValue, OptionMeta>,
  true
>;

export const GroupHeading = <OptionValue extends string | number, OptionMeta>(
  props: GroupHeadingProps<OptionValue, OptionMeta>,
) => {
  const id = useId();

  const { withSelectableGroup } = useSelectContext();

  const { children, data, selectProps } = props;
  const { onChange } = selectProps;
  const { options } = data;

  const currentValues: Option<OptionValue, OptionMeta>[] = Array.isArray(
    selectProps.value,
  )
    ? selectProps.value
    : [selectProps.value];

  const fullySelected = () => {
    return options.every(item =>
      currentValues.some(current => current.value === item.value),
    );
  };

  const handleSelectGroup = (ev: ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;

    if (checked) {
      const newValues = unique([...currentValues, ...options], 'value');

      onChange(newValues, {
        action: 'select-option',
        option: { label: '', value: '__group__' } as Option<
          OptionValue,
          OptionMeta
        >,
      });
    } else {
      const newValues = arrayDifference(
        currentValues,
        [...options],
        (a, b) => a.value === b.value,
      );

      onChange(newValues, {
        action: 'deselect-option',
        option: { label: '', value: '__group__' } as Option<
          OptionValue,
          OptionMeta
        >,
      });
    }
  };

  return withSelectableGroup ? (
    <components.GroupHeading {...props}>
      <Stack alignItems="center" justifyContent="space-between">
        <label className={styles.pointer} htmlFor={id}>
          {children}
        </label>
        <Input.Checkbox
          checked={fullySelected()}
          id={id}
          onChange={handleSelectGroup}
        />
      </Stack>
    </components.GroupHeading>
  ) : (
    <components.GroupHeading {...props} />
  );
};
