import type { Modify } from '@gatewatcher/bistoury/utils-types';

import type { SliderBaseProps } from '../SliderBase';
import SliderBase from '../SliderBase';

export type RangeProps = Modify<SliderBaseProps, { value?: number[] }> & {};

const Range = ({ 'data-testid': testId = 'range', ...rest }: RangeProps) => {
  return <SliderBase data-testid={testId} range {...rest} />;
};

export default Range;
