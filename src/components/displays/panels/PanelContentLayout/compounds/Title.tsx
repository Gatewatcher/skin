import type { ReactNode } from 'react';

import { Title as SkinTitle } from '@/skin/typography';

export type TitleProps = {
  children?: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <SkinTitle as="h1" whiteSpace="nowrap" overflowHidden textEllipsis>
      {children}
    </SkinTitle>
  );
};

export default Title;
