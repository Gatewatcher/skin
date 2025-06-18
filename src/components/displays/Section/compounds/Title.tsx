import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { TitleProps } from '@/skin/typography';
import { Title as TypoTitle } from '@/skin/typography';

import { DEFAULT_TITLE_TAG } from '../constants';

export type SectionTitleProps = DataTestId & {
  as?: TitleProps['as'];
  children: ReactNode;
};

const Title = ({
  as = DEFAULT_TITLE_TAG,
  children,
  'data-testid': testId = 'section-title',
}: SectionTitleProps) => {
  return (
    <TypoTitle as={as} data-testid={testId}>
      {children}
    </TypoTitle>
  );
};

export default Title;
