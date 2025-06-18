import type { SingleValueProps as RSSingleValueProps } from 'react-select';
import { components } from 'react-select';

import { useSelectContext } from '../../../SelectBase/context';
import type { Option } from '../../../SelectBase/types';

export type SingleValueProps<OptionValue, OptionMeta> = RSSingleValueProps<
  Option<OptionValue, OptionMeta>,
  false
>;

const SingleValue = <OptionValue extends string | number, OptionMeta>({
  children,
  ...props
}: SingleValueProps<OptionValue, OptionMeta>) => {
  const { renderValueAs, renderLabelAs } = useSelectContext<
    OptionValue,
    OptionMeta
  >();

  const renderMethod = renderValueAs || renderLabelAs;

  return (
    <components.SingleValue {...props}>
      {renderMethod ? renderMethod(props.data) : children}
    </components.SingleValue>
  );
};

export default SingleValue;
