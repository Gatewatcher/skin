import {
  useAsyncDebounce,
  useDidMountEffect,
} from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Input } from '@/skin/forms';

import styles from './styles.module.scss';

export type GoToPageProps = DataTestId & {
  onChange: (page: number) => void;
  totalPages: number;
  value: number;
};

const GoToPage = ({
  'data-testid': testId = 'go-to-page',
  onChange,
  totalPages,
  value,
}: GoToPageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(
    Math.min(value, totalPages),
  );

  useDidMountEffect(() => {
    setCurrentPage(value);
  }, [value]);

  const debounceOnChange = useAsyncDebounce(onChange, 300);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(ev.target.value, 10) || 1, totalPages);

    setCurrentPage(value);
    debounceOnChange(value);
  };

  return (
    <Input.Number
      className={styles.GoToPage}
      data-testid={testId}
      inputMode="numeric"
      label="Page"
      labelDirection="row"
      max={totalPages}
      min={1}
      name="go-to-page"
      onChange={handleChange}
      step={1}
      value={currentPage}
    />
  );
};

export default GoToPage;
