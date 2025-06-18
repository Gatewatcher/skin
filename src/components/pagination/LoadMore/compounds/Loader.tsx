import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { CircularLoader } from '@/skin/feedback';

export type LoadMoreLoaderProps = DataTestId;

export type LoadMoreInternalProps = {
  className?: string;
};

const LoadMoreLoader = ({
  className,
  'data-testid': testId = 'load-more-loader',
}: LoadMoreLoaderProps & LoadMoreInternalProps) => {
  return (
    <div className={className} data-testid={testId}>
      <CircularLoader size="large" />
    </div>
  );
};

export default LoadMoreLoader;
