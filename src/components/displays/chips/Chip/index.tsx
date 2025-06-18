import { stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';

import type { ChipBaseProps } from '../ChipBase';
import ChipBase from '../ChipBase';
import { useChipStyle } from './hooks';
import type { ChipType } from './types';

import styles from './styles.module.scss';

export type ChipProps = ChipBaseProps & {
  type?: ChipType;
};

const Chip = ({ type = 'info', ...rest }: ChipProps) => {
  const style = useChipStyle({ type });

  return (
    <ChipBase
      {...rest}
      className={stylesToCamelCase(styles, 'type', type)}
      style={style}
    />
  );
};

export default Chip;
