import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { OptionProps } from 'react-select';

import { Icon } from '@/skin/displays';

import styles from './styles.module.scss';

type OptionCheckIconProps = Pick<OptionProps, 'isFocused' | 'isSelected'>;

const OptionCheckIcon = ({ isFocused, isSelected }: OptionCheckIconProps) => (
  <div
    className={classNames(
      styles.iconColorContainer,
      isSelected && styles.isSelected,
    )}
  >
    <Icon
      name={isFocused || isSelected ? 'Check' : 'Empty'}
      size="small"
      currentColor
    />
  </div>
);

export default OptionCheckIcon;
