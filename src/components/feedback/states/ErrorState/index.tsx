import type { ApiError } from '@gatewatcher/bistoury/utils-api';
import { formatApiError } from '@gatewatcher/bistoury/utils-api';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import Placeholder from '../../Placeholder';
import { DEFAULT_PADDING } from '../constants';
import type { StateBaseProps } from '../types';
import { DEFAULT_ERROR } from './constants';

type Error = ApiError | null;

export type ErrorStateProps<T> = StateBaseProps<T> & {
  error?: Error;
  errorComponent?: ReactNode | ((error?: Error) => ReactNode);
  isError: boolean;
};

const ErrorState = <T,>({
  children,
  containerStyle,
  data,
  'data-testid': testId = 'error-state',
  error = DEFAULT_ERROR,
  errorComponent,
  isError,
  padding = DEFAULT_PADDING,
}: ErrorStateProps<T>) => {
  if (isError) {
    if (errorComponent === null) {
      return null;
    }

    return (
      <Stack
        alignItems="center"
        data-testid={testId}
        justifyContent="center"
        padding={padding}
        style={containerStyle}
      >
        {errorComponent ? (
          <>
            {isFunction(errorComponent)
              ? errorComponent(error)
              : errorComponent}
          </>
        ) : (
          <Placeholder>
            <Placeholder.Illustration name="Error" />
            <Placeholder.Title>Unexpected error</Placeholder.Title>
            <Placeholder.Description>
              {formatApiError(error)}
            </Placeholder.Description>
          </Placeholder>
        )}
      </Stack>
    );
  }

  return isFunction(children) ? children(data as T) : children;
};

export default ErrorState;
