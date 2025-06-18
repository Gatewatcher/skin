import type { ReactNode } from 'react';

export type DropdownContentProps = {
  children: ReactNode;
};

const Content = ({ children }: DropdownContentProps) => {
  return <>{children}</>;
};

export default Content;
