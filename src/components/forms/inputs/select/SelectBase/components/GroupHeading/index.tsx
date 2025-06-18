import type { GroupHeadingProps as RSGroupHeadingProps } from 'react-select';

import { InternalText } from '@/skin/typography/Text';

import type { Option } from '../../types';

import styles from '../../styles.module.scss';

export type GroupHeadingProps<OptionValue, OptionMeta> = RSGroupHeadingProps<
  Option<OptionValue, OptionMeta>
>;

const GroupHeading = <OptionValue, OptionMeta>({
  children,
}: GroupHeadingProps<OptionValue, OptionMeta>) => {
  return (
    <InternalText
      className={styles.groupHeading}
      size="small"
      transform="uppercase"
      weight="medium"
    >
      {children}
    </InternalText>
  );
};

export default GroupHeading;
