import { FloatingFocusManager, useTransitionStyles } from '@floating-ui/react';
import { classNames } from '@gatewatcher/bistoury/utils-dom';

import type { ElevationProps } from '@/hocs';
import { withElevation } from '@/hocs';

import type { FloatingProps } from '../Floating';
import Floating from '../Floating';
import { DEFAULT_MAX_HEIGHT } from '../Floating/constants';
import type { FloatingWrapperType } from '../Floating/types';
import Button from './compounds/Button';
import Content from './compounds/Content';
import Group from './compounds/Group';
import Link from './compounds/Link';
import { DEFAULT_DELAY, DEFAULT_ELEVATION } from './constants';

import styles from './styles.module.scss';

export type DropdownProps = FloatingProps &
  ElevationProps & {
    className?: string;
    withBorder?: boolean;
  };

const Wrapper = ({ ctx, children, duration }: FloatingWrapperType) => {
  const transition = useTransitionStyles(ctx, { duration });

  return (
    <>
      {transition.isMounted && (
        <FloatingFocusManager
          context={ctx}
          modal={false}
          order={['floating', 'content']}
          returnFocus={true}
        >
          <>{children}</>
        </FloatingFocusManager>
      )}
    </>
  );
};

const Dropdown = ({
  children,
  className,
  content,
  elevation = DEFAULT_ELEVATION,
  withBorder = !elevation,
  maxHeight = DEFAULT_MAX_HEIGHT,
  ...rest
}: DropdownProps) => {
  return withElevation(
    <Floating
      className={classNames(
        styles.Dropdown,
        withBorder && styles.DropdownBordered,
        elevation && styles.DropdownShadowed,
        className,
      )}
      content={content}
      delay={DEFAULT_DELAY}
      maxHeight={maxHeight}
      role="tooltip"
      type="popover"
      withArrow={false}
      withSmoothAnimation={false}
      wrapper={Wrapper}
      withSizeMiddleware
      {...rest}
    >
      {children}
    </Floating>,
    elevation,
  );
};

Dropdown.Button = Button;
Dropdown.Content = Content;
Dropdown.Group = Group;
Dropdown.Link = Link;

export default Dropdown;
