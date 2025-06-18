import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { Modify } from '@gatewatcher/bistoury/utils-types';

import { useThemeContext } from '@/skin/navigation/Theme';
import type { ColorsWithNeutral } from '@/types';
import { getColor } from '@/utils';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

import styles from './styles.module.scss';

export type IconContainedProps = Omit<
  Modify<IconProps, { color: ColorsWithNeutral }>,
  'currentColor'
>;

export type InternalIconContainedProps = {
  internalClassname?: string;
};

export const InternalIconContained = ({
  color,
  'data-testid': testId = 'icon-contained',
  internalClassname,
  ...props
}: IconContainedProps & InternalIconContainedProps) => {
  const { theme } = useThemeContext();

  return (
    <div
      style={{
        backgroundColor: getColor(color, {
          alpha: theme === 'dark' ? 25 : 15,
        }),
      }}
      className={classNames(styles.IconContained, internalClassname)}
      data-testid={testId}
    >
      <Icon color={color} {...props} />
    </div>
  );
};

const IconContained = (props: IconContainedProps) => (
  <InternalIconContained {...props} />
);

export default IconContained;
