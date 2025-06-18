import type { ReactNode } from 'react';

import { Button } from '@/skin/actions';

export type CreateOptionProps = {
  children: ReactNode;
};

const CreateOption = ({ children }: CreateOptionProps) => {
  return <Button variant="transparent">{children}</Button>;
};

export default CreateOption;
