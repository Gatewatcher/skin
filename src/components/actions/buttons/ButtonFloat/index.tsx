import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';

import { type ElevationProps, withElevation } from '@/hocs';
import type { IconName, TooltipProps } from '@/skin/displays';
import { Icon, Tooltip } from '@/skin/displays';

import type { ButtonBaseProps } from '../ButtonBase';
import { DEFAULT_ELEVATION, DEFAULT_SIZE, DEFAULT_VARIANT } from './constants';
import type { ButtonSize, ButtonVariant } from './types';

import styles from './styles.module.scss';

export type ButtonFloatProps = ElevationProps & {
  icon: IconName;
  tooltipContent?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & Omit<
    ButtonBaseProps,
    'startElement' | 'endElement' | 'type' | 'behavior' | 'variant'
  > &
  Pick<TooltipProps, 'placement'>;

export type InternalButtonFloatProps = {
  className?: string;
};

export const InternalButtonFloat = ({
  className,
  'data-testid': testId = 'button-float',
  disabled,
  elevation = DEFAULT_ELEVATION,
  icon,
  placement,
  size = DEFAULT_SIZE,
  tooltipContent,
  variant = DEFAULT_VARIANT,
  ...rest
}: ButtonFloatProps & InternalButtonFloatProps) => {
  return (
    <Tooltip
      content={tooltipContent}
      data-testid={testId}
      isDisabled={disabled || !tooltipContent}
      placement={placement}
      triggerOn="hover"
      withStopPropagation={false}
    >
      <>
        {withElevation(
          <button
            {...rest}
            className={classNames(
              className,
              styles.buttonFloat,
              stylesToCamelCase(styles, 'buttonFloat', size),
              stylesToCamelCase(styles, 'buttonFloat', variant),
            )}
            disabled={disabled}
          >
            <Icon color="grey" name={icon} size={size} />
          </button>,
          variant !== 'outlined' ? elevation : undefined,
        )}
      </>
    </Tooltip>
  );
};

const ButtonFloat = (props: ButtonFloatProps) => (
  <InternalButtonFloat {...props} />
);

export default ButtonFloat;
