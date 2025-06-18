import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { withSpacing } from 'hocs/withSpacing';

import type { StackProps } from '..';
import { DEFAULT_AS } from '../constants';
import type { StackContainerProperties, StackItemProperties } from '../types';
import { buildCssVariables } from '../utils';

import styles from '../styles.module.scss';

export type StackItemProps = Omit<StackProps, keyof StackContainerProperties> &
  StackItemProperties;

const StackItem = ({
  alignSelf,
  as: Component = DEFAULT_AS,
  children,
  className,
  'data-testid': testId = 'stack-item',
  flex,
  flexBasis,
  flexGrow,
  flexShrink,
  margin,
  order,
  padding,
  style,
  ...rest
}: StackItemProps) => {
  const stylesVariables = buildCssVariables({
    alignSelf,
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
    order,
  });

  return withSpacing(
    <Component
      className={classNames(
        className,
        alignSelf && styles.alignSelf,
        flex && styles.flex,
        flexBasis && styles.flexBasis,
        isDefined(flexGrow) && styles.flexGrow,
        isDefined(flexShrink) && styles.flexShrink,
        isDefined(order) && styles.order,
      )}
      data-testid={testId}
      style={{ ...style, ...stylesVariables }}
      {...rest}
    >
      {children}
    </Component>,
    { margin, padding },
  );
};

export default StackItem;
