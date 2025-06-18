import type { ValueContainerProps as RSValueContainerProps } from 'react-select';
import { components } from 'react-select';

import { Stack } from '@/skin/layout';

import type { Option } from '../../../SelectBase/types';
import { useSliceChildren } from '../hooks';
import OverflowChip from './OverflowChip';

import styles from './styles.module.scss';

export type ValueContainerProps<OptionValue, OptionMeta> =
  RSValueContainerProps<Option<OptionValue, OptionMeta>, true>;

const ValueContainer = <OptionValue, OptionMeta>(
  props: ValueContainerProps<OptionValue, OptionMeta>,
) => {
  const { collapsedCount, displayableChildren, otherChildren } =
    useSliceChildren(props);

  return (
    <components.ValueContainer {...props}>
      <Stack alignItems="center" direction="row" gap={4} wrap="wrap">
        {displayableChildren}
        <OverflowChip collapsedCount={collapsedCount} />
        <div className={styles.multiValueContainer}>{otherChildren}</div>
      </Stack>
    </components.ValueContainer>
  );
};

export default ValueContainer;
