import { FloatingFocusManager, useTransitionStyles } from '@floating-ui/react';
import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { ReactElement, Ref } from 'react';
import { Fragment, forwardRef, useState } from 'react';

import Backdrop from '../Backdrop';
import type { FloatingProps } from '../Floating';
import Floating from '../Floating';
import type { FloatingWrapperType } from '../Floating/types';
import BasicActions from './compounds/BasicActions';
import Body from './compounds/Body';
import Close from './compounds/Close';
import { Content } from './compounds/Content';
import Footer from './compounds/Footer';
import Header from './compounds/Header';
import Title from './compounds/Title';
import {
  DEFAULT_SCROLL_ON,
  DEFAULT_SIZE,
  DEFAULT_WITH_BACKDROP,
} from './constants';
import type { ModalContextType } from './context';
import { ModalContext, useModalContext } from './context';
import type { ModalScrollOn, ModalSize } from './types';

import styles from './styles.module.scss';

export type ModalProps = Pick<
  FloatingProps,
  | 'content'
  | 'data-testid'
  | 'duration'
  | 'onClose'
  | 'onOpen'
  | 'initialIsOpened'
  | 'setIsOpened'
  | 'triggerClassName'
  | 'withStopPropagation'
> & {
  children?: ReactElement;
  size?: ModalSize;
  scrollOn?: ModalScrollOn;
  withBackdrop?: boolean;
  withCloseOnOutsidePress?: boolean;
  isOpened?: boolean;
};

const Modal = (props: ModalProps) => {
  const [withCloseOnOutsidePress, setWithCloseOnOutsidePress] = useState(
    props.withCloseOnOutsidePress ?? true,
  );

  const contextValue: ModalContextType = {
    withCloseOnOutsidePress,
    setWithCloseOnOutsidePress,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalContent {...props} />
    </ModalContext.Provider>
  );
};

type WrapperComponentType = FloatingWrapperType &
  Required<Pick<ModalProps, 'size' | 'scrollOn' | 'withBackdrop'>>;

const WrapperComponent = forwardRef(
  (
    {
      ctx,
      children,
      duration,
      'data-testid': testId,
      scrollOn,
      size,
      withBackdrop,
    }: WrapperComponentType,
    ref,
  ) => {
    const transition = useTransitionStyles(ctx, {
      duration,
    });

    const slideTransition = useTransitionStyles(ctx, {
      duration,
      initial: {
        transform: 'translateY(-26px)',
      },
    });

    return (
      <>
        <Backdrop
          isMounted={transition.isMounted}
          isScrollable={scrollOn === 'body'}
          isTransparent={!withBackdrop}
          slideTransition={slideTransition.styles}
          style={transition.styles}
        >
          <FloatingFocusManager
            context={ctx}
            modal={true}
            order={['floating', 'content']}
            returnFocus={false}
          >
            <div
              ref={ref as Ref<HTMLDivElement>}
              className={classNames(
                styles.Modal,
                styles.size,
                stylesToCamelCase(styles, 'size', size),
                stylesToCamelCase(styles, 'scroll', 'on', scrollOn),
              )}
              data-testid={testId}
              role="dialog"
            >
              {children}
            </div>
          </FloatingFocusManager>
        </Backdrop>
      </>
    );
  },
);

const ModalContent = ({
  content,
  children = <Fragment />,
  onClose,
  scrollOn = DEFAULT_SCROLL_ON,
  setIsOpened,
  size = DEFAULT_SIZE,
  withBackdrop = DEFAULT_WITH_BACKDROP,
  ...rest
}: ModalProps) => {
  const { withCloseOnOutsidePress } = useModalContext();

  const handleClose = () => {
    setIsOpened?.(false);
    onClose?.();
  };

  return (
    <Floating
      wrapper={data => (
        <WrapperComponent
          {...data}
          scrollOn={scrollOn}
          size={size}
          withBackdrop={withBackdrop}
        />
      )}
      content={content}
      delay={0}
      offset={0}
      onClose={handleClose}
      role="dialog"
      setIsOpened={setIsOpened}
      triggerOn="click"
      type="modal"
      withArrow={false}
      withCloseOnOutsidePress={withCloseOnOutsidePress}
      withSmoothAnimation={false}
      wrapperContent={content}
      {...rest}
    >
      {children}
    </Floating>
  );
};

Modal.BasicActions = BasicActions;
Modal.Body = Body;
Modal.Close = Close;
Modal.Content = Content;
Modal.Footer = Footer;
Modal.Header = Header;
Modal.Title = Title;

export default Modal;
