import type { ReactNode } from 'react';

export type ModalContentProps = {
  children: ReactNode;
};

export const Content = ({ children }: ModalContentProps) => {
  return <>{children}</>;
};
