import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useState } from 'react';

import type {
  InputSelectProps,
  SelectOption,
  SelectSingleValue,
} from '@/skin/forms';
import { Input } from '@/skin/forms';

import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from './constants';

import styles from './styles.module.scss';

export type ItemsPerPageProps = DataTestId & {
  onChange: (perPage: number) => void;
  options?: number[];
  value: number;
};

const ItemsPerPage = ({
  'data-testid': testId = 'items-per-page',
  onChange,
  options: optionsProps = DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  value: valueProps,
}: ItemsPerPageProps) => {
  const [value, setValue] = useState(valueProps);

  const options: InputSelectProps['options'] = optionsProps.reduce(
    (acc, nb) => {
      return [...acc, { label: nb.toString(), value: nb.toString() }];
    },
    [] as SelectOption[],
  );

  const handleChange = (newValue: SelectSingleValue<string>) => {
    if (!newValue?.value) return;

    const valueAsNumber = parseInt(newValue.value, 10);

    if (valueAsNumber !== valueProps) {
      onChange(valueAsNumber);
      setValue(valueAsNumber);
    }
  };

  if (!options.length) {
    return null;
  }

  return (
    <Input.Select
      className={styles.ItemsPerPage}
      data-testid={testId}
      inputId="items-per-page"
      isClearable={false}
      isSearchable={false}
      label="Items"
      labelDirection="row"
      menuPlacement="auto"
      onChange={handleChange}
      options={options}
      value={value.toString()}
    />
  );
};

export default ItemsPerPage;
