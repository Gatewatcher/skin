import { Icon } from '@/skin/displays';

import type { FileStatus } from '../..';
import { CircularLoader } from '../..';

export type IndicatorProps = {
  status?: FileStatus;
};

const Indicator = ({ status }: IndicatorProps) => {
  switch (status) {
    case 'error':
      return <Icon color="error" name="Warning" />;

    case 'success':
      return <Icon color="success" name="Check" />;

    case 'uploading':
      return <CircularLoader />;

    case 'pending':
    default:
      return <Icon color="info" name="OverflowMenuHorizontal" />;
  }
};

export default Indicator;
