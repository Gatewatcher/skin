import type { ApiError } from '@gatewatcher/bistoury/utils-api';

export const DEFAULT_ERROR: ApiError = {
  statusCode: 404,
  detail: 'An error occurred',
};
