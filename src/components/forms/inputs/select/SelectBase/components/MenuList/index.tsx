import type { MenuListProps as RSMenuListProps } from 'react-select';
import { components } from 'react-select';

import { CircularLoader } from '@/skin/feedback';
import { Stack } from '@/skin/layout';

import type { Option } from '../../types';

import styles from '../../styles.module.scss';

export type MenuListProps<OptionValue, OptionMeta> = RSMenuListProps<
  Option<OptionValue, OptionMeta>
>;

const MenuList = <OptionValue, OptionMeta>({
  children,
  ...props
}: MenuListProps<OptionValue, OptionMeta>) => {
  return (
    <components.MenuList {...props} className={styles.menuList}>
      {children}
      {props.selectProps.isLoading && (
        <Stack justifyContent="center" padding={{ y: 4 }}>
          <CircularLoader />
        </Stack>
      )}
    </components.MenuList>
  );
};

export default MenuList;
