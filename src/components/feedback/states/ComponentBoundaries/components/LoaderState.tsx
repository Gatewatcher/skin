import type { ReactNode } from 'react';

import { CircularLoader } from '@/skin/feedback/loaders';
import { Stack } from '@/skin/layout';
import type { StackProps } from '@/skin/layout';

import { DEFAULT_PADDING } from '../../constants';

export type ComponentBoundariesLoaderState = Pick<StackProps, 'padding'> & {
  children?: ReactNode;
};

const LoaderState = ({
  children,
  padding = DEFAULT_PADDING,
}: ComponentBoundariesLoaderState) => {
  return (
    <Stack
      alignItems="center"
      data-testid="loader-state"
      justifyContent="center"
      padding={padding}
    >
      {children || <CircularLoader size="large" />}
    </Stack>
  );
};

export default LoaderState;
