import { Stack } from '@/skin/layout';

import Placeholder from '../../../Placeholder';
import {
  DEFAULT_EMPTY_DESCRIPTION,
  DEFAULT_ERROR_TITLE,
  DEFAULT_PADDING,
} from '../../constants';

export type ErrorFallbackProps = {
  title?: string;
  description?: string;
};

export const ErrorFallback = ({
  title = DEFAULT_ERROR_TITLE,
  description = DEFAULT_EMPTY_DESCRIPTION,
}: ErrorFallbackProps) => {
  return (
    <Stack
      alignItems="center"
      data-testid="error-fallback"
      justifyContent="center"
      padding={DEFAULT_PADDING}
    >
      <Placeholder>
        <Placeholder.Illustration name="Error" />
        <Placeholder.Title>{title}</Placeholder.Title>
        <Placeholder.Description>{description}</Placeholder.Description>
      </Placeholder>
    </Stack>
  );
};
