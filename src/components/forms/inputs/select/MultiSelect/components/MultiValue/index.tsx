import type { MultiValueProps as RSMultiValueProps } from 'react-select';
import { components } from 'react-select';

import type { ChipProps } from '@/skin/displays';
import { Chip } from '@/skin/displays';

import { useSelectContext } from '../../../SelectBase/context';
import type { Option } from '../../../SelectBase/types';

export type MultiValueProps<OptionValue, OptionMeta> = RSMultiValueProps<
  Option<OptionValue, OptionMeta>,
  true
> &
  Pick<ChipProps, 'type'>;

const MultiValue = <OptionValue extends string | number, OptionMeta>(
  props: MultiValueProps<OptionValue, OptionMeta>,
) => {
  const { renderMultivalueLabelAs } = useSelectContext<
    OptionValue,
    OptionMeta
  >();
  const { data, type, removeProps } = props;
  const { onClick, onMouseDown, onTouchEnd } = removeProps;

  return (
    <components.MultiValueContainer {...props}>
      {renderMultivalueLabelAs ? (
        renderMultivalueLabelAs({ ...data, removeProps })
      ) : (
        <Chip
          onClose={onClick}
          onCloseButtonMouseDown={onMouseDown}
          onCloseButtonTouchEnd={onTouchEnd}
          size="small"
          type={type}
        >
          {data.label}
        </Chip>
      )}
    </components.MultiValueContainer>
  );
};

export default MultiValue;
