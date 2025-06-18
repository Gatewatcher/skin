import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import type { TitleProps } from '@/skin/typography';
import { Title as TitleSKin } from '@/skin/typography';

import { DEFAULT_TITLE_TAG } from '../constants';

import styles from '../styles.module.scss';

export type CardTitleProps = DataTestId & {
  as?: TitleProps['as'];
  children: ReactNode;
  startElement?: ReactNode;
};

const Title = ({
  as = DEFAULT_TITLE_TAG,
  children,
  'data-testid': testId = 'card-title',
  startElement,
}: CardTitleProps) => {
  return (
    <Stack
      alignItems="center"
      className={classNames(styles.Title)}
      data-testid={testId}
      gap={6}
    >
      {startElement}
      <TitleSKin as={as} whiteSpace="nowrap" overflowHidden textEllipsis>
        {children}
      </TitleSKin>
    </Stack>
  );
};

export default Title;
