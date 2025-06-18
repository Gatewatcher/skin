import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Fragment } from 'react';

import { Grid } from '@/skin/layout';

import { LAYOUT_COLUMNS } from '../constants';

type LayoutItemProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

const LayoutRow = <T extends ElementType>({
  as: As,
  children,
  ...rest
}: LayoutItemProps<T>) => {
  const Component = As || Fragment;

  return (
    <Grid colSpan={LAYOUT_COLUMNS} isItem>
      <Component {...rest}>{children}</Component>
    </Grid>
  );
};

export default LayoutRow;
