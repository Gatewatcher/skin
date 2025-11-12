import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import { Stack } from '@/skin/layout';
import { Title } from '@/skin/typography';

import SideNavBody from './SideNavBody';
import SideNavFooter from './SideNavFooter';

import styles from '../styles.module.scss';

export type SideNavProps = DataTestId & {
  children: ReactNode;
  title?: string | ReactNode;
};

const SideNav = ({
  'data-testid': testId = 'side-nav',
  children,
  title,
}: SideNavProps) => {
  const titleElement =
    typeof title === 'string' ? (
      <Title as="h5" whiteSpace="nowrap" overflowHidden>
        {title}
      </Title>
    ) : (
      title
    );

  let sideNavBody: ReactNode = null;
  let sideNavFooter: ReactNode = null;

  Children.forEach(children, child => {
    if (!isValidElement(child)) return;

    if (child.type === SideNavBody) {
      sideNavBody = child;
    } else if (child.type === SideNavFooter) {
      sideNavFooter = child;
    }
  });

  return (
    <Stack className={classNames(styles.SideNav)} data-testid={testId}>
      <Stack direction="column" gap={7}>
        <Stack>{titleElement}</Stack>
        {sideNavBody}
      </Stack>

      {sideNavFooter}
    </Stack>
  );
};

export default SideNav;
