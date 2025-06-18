import type { ApiError } from '@gatewatcher/bistoury/utils-api';
import { isFunction, isNumber } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { StackProps } from '@/skin/layout';

import type { Status } from '../types';
import EmptyState from './components/EmptyState';
import { ErrorFallback } from './components/ErrorFallback';
import ErrorState from './components/ErrorState';
import LoaderState from './components/LoaderState';

type Statuses = (Status | undefined)[];
type Padding = StackProps['padding'];
type PaddingComponents = { error?: Padding; empty?: Padding; loader?: Padding };

export type ComponentBoundariesProps<
  DataType,
  ErrorType extends ApiError = ApiError,
> = {
  status?: Status | Statuses;
  error?: ErrorType;
  errorTitle?: string;
  emptyTitle?: string;
  errorFallbackTitle?: string;
  errorFallbackDescription?: string;
  data: DataType | undefined;
  children: ReactNode | ((data: NonNullable<DataType>) => ReactNode);
  padding?: Padding | PaddingComponents;
};

const isPaddingComponent = (
  padding?: Padding | PaddingComponents,
): padding is PaddingComponents => {
  return (
    !!padding &&
    !isNumber(padding) &&
    ('error' in padding || 'empty' in padding || 'loader' in padding)
  );
};

const ComponentBoundaries = <DataType, ErrorType extends ApiError = ApiError>({
  children,
  data,
  emptyTitle,
  error,
  errorFallbackTitle,
  errorFallbackDescription,
  errorTitle,
  padding,
  status,
}: ComponentBoundariesProps<DataType, ErrorType>) => {
  const statuses = Array.isArray(status) ? status : [status];

  const isError = statuses.some(status => status === 'error') || error;
  const isLoading = statuses.some(status => status === 'loading');
  const isSuccess = statuses.every(status => status === 'success');

  const isPaddingConfig = isPaddingComponent(padding);

  if (isError) {
    return (
      <ErrorState
        error={error}
        padding={isPaddingConfig ? padding?.error : padding}
        title={errorTitle}
      />
    );
  }

  if (isLoading) {
    return <LoaderState padding={isPaddingConfig ? padding.loader : padding} />;
  }

  const dataArray = Array.isArray(data) ? data : [data].filter(Boolean);
  if (isSuccess && !dataArray.length) {
    return (
      <EmptyState
        padding={isPaddingConfig ? padding.empty : padding}
        title={emptyTitle}
      />
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorFallback
          description={errorFallbackDescription}
          title={errorFallbackTitle}
        />
      )}
    >
      {isFunction(children)
        ? children(data as NonNullable<DataType>)
        : children}
    </ErrorBoundary>
  );
};

export default ComponentBoundaries;
