import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { Children, cloneElement } from 'react';

import { Stack } from '@/skin/layout';

import type { SectionProps } from './Section';

import style from '../styles.module.scss';

export type SideNavBodyProps = DataTestId & {
  children: ReactElement<SectionProps> | ReactElement<SectionProps>[];
};

const SideNavBody = ({
  'data-testid': testId = 'section-list',
  children,
}: SideNavBodyProps) => {
  return (
    <Stack className={classNames(style.SideNavBody)} data-testid={testId}>
      {Children.map(children, (item, index) =>
        cloneElement(item, {
          id: item.props.id ?? index,
          key: item.props.id ?? index,
        }),
      )}
    </Stack>
  );
};

export default SideNavBody;
