import { CircularLoader } from '@/skin/feedback';

import styles from '../../styles.module.scss';

const LoadingIndicator = () => {
  return (
    <div className={styles.loadingIndicator}>
      <CircularLoader size="small" />
    </div>
  );
};

export default LoadingIndicator;
