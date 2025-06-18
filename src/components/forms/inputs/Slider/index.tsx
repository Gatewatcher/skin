import type { Modify } from '@gatewatcher/bistoury/utils-types';

import InputBaseLabel from '@/skin/forms/inputs/InputBaseLabel';

import type { SliderBaseProps } from '../SliderBase';
import SliderBase from '../SliderBase';

export type SliderProps = Modify<SliderBaseProps, { value?: number }>;

const Slider = ({
  'data-testid': testId = 'slider',
  meta,
  ...rest
}: SliderProps) => {
  return (
    <InputBaseLabel meta={meta} withLabel={false}>
      {() => <SliderBase data-testid={testId} {...rest} />}
    </InputBaseLabel>
  );
};

export default Slider;
