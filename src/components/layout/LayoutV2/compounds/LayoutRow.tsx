import { type ElementType, Fragment, type ReactNode } from 'react';

import { Grid } from '@/skin/layout';

import { LAYOUT_COLUMNS } from '../constants';

type LayoutRowProps<T extends ElementType> = {
  children?: ReactNode;
  as?: T;
};

const LayoutRow = <T extends ElementType>({
  as,
  children,
  ...rest
}: LayoutRowProps<T>) => {
  const Component = as || Fragment;

  return (
    <Grid colSpan={LAYOUT_COLUMNS} isItem>
      <Component {...rest}>{children}</Component>
    </Grid>
  );
};

export default LayoutRow;
