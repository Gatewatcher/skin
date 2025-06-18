import { FloatingFocusManager, useTransitionStyles } from '@floating-ui/react';
import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { ElevationProps } from 'hocs/withElevation';
import { withElevation } from 'hocs/withElevation';

import type { FloatingInternalSharedProps, FloatingProps } from '../Floating';
import Floating from '../Floating';
import { DEFAULT_SIZE } from '../Floating/constants';
import type { FloatingSize, FloatingWrapperType } from '../Floating/types';
import { getSizeClassName } from '../Floating/utils';
import Body from './compounds/Body';
import Header from './compounds/Header';
import Title from './compounds/Title';
import { DEFAULT_ELEVATION } from './constants';

import styles from './styles.module.scss';

export type PopoverProps = FloatingProps &
  ElevationProps &
  Pick<FloatingInternalSharedProps, 'withArrow'> & {
    size?: FloatingSize;
  };

const Wrapper = ({ ctx, children, duration }: FloatingWrapperType) => {
  const transition = useTransitionStyles(ctx, { duration });

  return (
    <>
      {transition.isMounted && (
        <FloatingFocusManager
          context={ctx}
          modal={false}
          order={['reference', 'content']}
          returnFocus={false}
        >
          <div>{children}</div>
        </FloatingFocusManager>
      )}
    </>
  );
};

const Popover = ({
  children,
  elevation = DEFAULT_ELEVATION,
  size = DEFAULT_SIZE,
  ...rest
}: PopoverProps) => {
  return withElevation(
    <Floating
      arrowClassName={placement =>
        classNames(
          styles.arrow,
          stylesToCamelCase(styles, 'arrow', placement.split('-')[0]),
        )
      }
      className={classNames(styles.Popover, getSizeClassName(size))}
      padding={8}
      role="tooltip"
      type="popover"
      wrapper={Wrapper}
      {...rest}
    >
      {children}
    </Floating>,
    elevation,
  );
};

Popover.Body = Body;
Popover.Header = Header;
Popover.Title = Title;

export default Popover;
