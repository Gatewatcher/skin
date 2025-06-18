import type { ClearIndicatorProps } from 'react-select';
import { components } from 'react-select';

import { ButtonClose } from '@/skin/actions';

import type { Option } from '../../types';

import styles from '../../styles.module.scss';

const ClearIndicator = <OptionValue, OptionMeta>(
  props: ClearIndicatorProps<Option<OptionValue, OptionMeta>>,
) => {
  return (
    <components.ClearIndicator {...props} className={styles.clearIndicator}>
      <ButtonClose size="small" />
    </components.ClearIndicator>
  );
};

export default ClearIndicator;
