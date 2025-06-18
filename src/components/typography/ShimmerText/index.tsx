import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { TextProps } from '../Text';
import Text from '../Text';

export type ShimmerTextProps = DataTestId & TextProps;

const ShimmerText = ({ children, ...rest }: ShimmerTextProps) => {
  return (
    <Text {...rest} color="transparent" currentColor>
      {children}
    </Text>
  );
};

export default ShimmerText;
