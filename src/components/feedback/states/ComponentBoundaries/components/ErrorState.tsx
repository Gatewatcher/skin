import type { ApiError } from '@gatewatcher/bistoury/utils-api';
import { formatApiError } from '@gatewatcher/bistoury/utils-api';

import { Stack } from '@/skin/layout';
import type { StackProps } from '@/skin/layout';

import Placeholder from '../../../Placeholder';
import {
  DEFAULT_ERROR,
  DEFAULT_ERROR_TITLE,
  DEFAULT_PADDING,
} from '../../constants';

export type ErrorStateProps = Pick<StackProps, 'padding'> & {
  error?: ApiError;
  title?: string;
};

const ErrorState = ({
  error = DEFAULT_ERROR,
  title = DEFAULT_ERROR_TITLE,
  padding = DEFAULT_PADDING,
}: ErrorStateProps) => {
  return (
    <Stack
      alignItems="center"
      data-testid="error-state"
      justifyContent="center"
      padding={padding}
    >
      <Placeholder>
        <Placeholder.Illustration name="Error" />
        <Placeholder.Title>{title}</Placeholder.Title>
        <Placeholder.Description>
          {formatApiError(error)}
        </Placeholder.Description>
      </Placeholder>
    </Stack>
  );
};

export default ErrorState;
