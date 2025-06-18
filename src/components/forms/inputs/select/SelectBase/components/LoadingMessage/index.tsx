import type { NoticeProps } from 'react-select';
import { components } from 'react-select';

import { CircularLoader } from '@/skin/feedback';

import type { Option } from '../../types';

export type LoadingMessageProps<OptionValue, OptionMeta> = NoticeProps<
  Option<OptionValue, OptionMeta>
>;

const LoadingMessage = <OptionValue, OptionMeta>(
  props: LoadingMessageProps<OptionValue, OptionMeta>,
) => {
  return (
    <components.LoadingMessage {...props}>
      <CircularLoader size="large" />
    </components.LoadingMessage>
  );
};

export default LoadingMessage;
