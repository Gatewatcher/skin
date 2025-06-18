import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import type { CircularLoaderProps } from '../../loaders';
import { CircularLoader } from '../../loaders';
import { DEFAULT_PADDING } from '../constants';
import type { StateBaseProps } from '../types';

export type LoaderStateProps<T = unknown> = StateBaseProps<T> &
  CircularLoaderProps & {
    isLoading: boolean;
    loader?: ReactNode;
  };

const LoaderState = <T,>({
  children,
  containerStyle,
  data,
  'data-testid': testId = 'loader-state',
  isLoading,
  loader,
  padding = DEFAULT_PADDING,
  ...loaderProps
}: LoaderStateProps<T>) => {
  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        data-testid={testId}
        justifyContent="center"
        padding={padding}
        style={containerStyle}
      >
        {loader ?? <CircularLoader size="large" {...loaderProps} />}
      </Stack>
    );
  }

  return isFunction(children) ? children(data as T) : children;
};

export default LoaderState;
