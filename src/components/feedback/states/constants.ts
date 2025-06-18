import type { ApiError } from '@gatewatcher/bistoury/utils-api';

import type { StateBaseProps } from './types';

export const STATUSES = ['loading', 'error', 'success'] as const;

export const DEFAULT_PADDING: StateBaseProps<unknown>['padding'] = { y: 10 };

export const DEFAULT_ERROR: ApiError = {
  statusCode: 404,
  detail: 'An error occurred',
};

export const DEFAULT_ERROR_TITLE: string = 'Unexpected error';
export const DEFAULT_EMPTY_TITLE: string = 'Empty data';
export const DEFAULT_EMPTY_DESCRIPTION: string =
  'Please contact the Gatewatcher support';
