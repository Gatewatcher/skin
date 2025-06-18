import type { OptionProps } from 'react-select';
import { components } from 'react-select';

import { Stack } from '@/skin/layout';

import type { Option } from '../../types';

import styles from '../../styles.module.scss';

export type CustomOptionProps<
  OptionValue extends string | number | unknown = string,
  OptionMeta = undefined,
> = OptionProps<Option<OptionValue, OptionMeta>> & {
  asButton?: boolean;
  className?: string;
};

const CustomOption = <
  OptionValue extends string | number | unknown = string,
  OptionMeta = undefined,
>(
  props: CustomOptionProps<OptionValue, OptionMeta>,
) => {
  const { asButton = true, className, children } = props;

  const content = (
    <Stack className={className} padding={{ x: 6, y: 4 }}>
      {children}
    </Stack>
  );

  return asButton ? (
    <components.Option {...props} className={styles.option}>
      {content}
    </components.Option>
  ) : (
    <Stack>{content}</Stack>
  );
};

export default CustomOption;
