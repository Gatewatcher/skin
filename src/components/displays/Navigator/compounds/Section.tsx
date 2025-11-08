import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { Children, cloneElement } from 'react';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { NavIdProps } from '../types';
import type { NavItemProps } from './NavItem';

import styles from '../styles.module.scss';

export type SectionProps = NavIdProps &
  DataTestId & {
    children: ReactElement<NavItemProps> | ReactElement<NavItemProps>[];
    title?: string;
  };

const Section = ({
  'data-testid': testId = 'section',
  children,
  id,
  title,
}: SectionProps) => {
  return (
    <Stack
      className={classNames(styles.Section)}
      data-testid={testId}
      direction="column"
    >
      <Text>{title}</Text>

      <Stack
        as="ul"
        className={classNames(styles.NavItemList)}
        direction="column"
      >
        {Children.map(children, (item, index) => (
          <li
            key={item.props.id ?? index}
            id={item.props.id?.toString() ?? index?.toString()}
          >
            {cloneElement(item, { id: item.props.id ?? index, sectionId: id })}
          </li>
        ))}
      </Stack>
    </Stack>
  );
};

export default Section;
