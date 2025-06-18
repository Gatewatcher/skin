import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import type { LinkInternalProps } from '@/skin/actions';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import type { TextProps } from '@/skin/typography';

import styles from './styles.module.scss';

export type BreadcrumbProps = DataTestId & {
  children: ReactElement<LinkInternalProps | TextProps>[];
};

const Breadcrumb = ({
  children,
  'data-testid': testId = 'breadcrumb',
}: BreadcrumbProps) => {
  return (
    <Stack
      as="ul"
      className={styles.Breadcrumb}
      data-testid={testId}
      margin={0}
      padding={0}
    >
      {children.slice(0, -1).map((link, index) => (
        <Stack key={index} alignItems="center" as="li">
          {cloneElement(link, { variant: 'secondary' })}
          {index !== children.length - 1 && <Icon name="ChevronRight" />}
        </Stack>
      ))}
      <Stack alignItems="center" as="li">
        {cloneElement(children.at(-1) as ReactElement, {
          weight: 'semibold',
        })}
      </Stack>
    </Stack>
  );
};

export default Breadcrumb;
