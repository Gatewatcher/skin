import type { FlipOptions, Placement, Strategy } from '@floating-ui/react';
import {
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import {
  insertIf,
  isFunction,
  isNumber,
  isString,
} from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';

import type { Spacings } from '@/hocs';
import { getThemeSpacing } from '@/utils';
import { isEmptyFragment } from '@/utils/react';

import FloatingElement from './FloatingElement';
import TriggerElement from './TriggerElement';
import {
  ARROW_SIZE,
  DEFAULT_DELAY,
  DEFAULT_DURATION,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_PLACEMENT,
  DEFAULT_SHIFT_PADDING,
  DEFAULT_STRATEGY,
  DEFAULT_TRIGGER_ON,
  DEFAULT_WITH_ARROW,
  DEFAULT_WITH_FLOATING_TREE,
  DEFAULT_WITH_MIN_WIDTH_TRIGGER,
  DEFAULT_WITH_SMOOTH_ANIMATION,
  DEFAULT_WITH_STOP_PROPAGATION,
  DURATIONS_MS,
} from './constants';
import type { FloatingContextType } from './context';
import { FloatingContext } from './context';
import type {
  FloatingContent,
  FloatingDuration,
  FloatingRole,
  FloatingTriggerOn,
  FloatingType,
  FloatingWrapperType,
} from './types';

export type FloatingSharedProps = DataTestId &
  Pick<Spacings, 'padding'> & {
    content: FloatingContent;
    duration?: FloatingDuration;
    isDisabled?: boolean;
    maxHeight?: number | 'fit';
    minWidth?: 'fit';
    placement?: Placement;
    strategy?: Strategy;
    triggerClassName?: string;
  };

export type FloatingInternalSharedProps = {
  arrowClassName?: string | ((placement: Placement) => string);
  className?: string;
  withArrow?: boolean;
  withSizeMiddleware?: boolean;
  withSmoothAnimation?: boolean;
};

export type FloatingInternalProps = {
  role: FloatingRole;
  type: FloatingType;
  wrapper?: (wrapperData: FloatingWrapperType) => ReactNode;
  wrapperContent?: FloatingContent;
  withFloatingTree?: boolean;
  withCloseOnOutsidePress?: boolean;
};

type FloatingFlipOptions = {
  padding: FlipOptions['padding'];
};

export type FloatingProps = FloatingSharedProps & {
  children: ReactElement;
  delay?: number;
  initialIsOpened?: boolean;
  isOpened?: boolean;
  offset?: number;
  onClose?: () => void;
  onOpen?: () => void;
  safePolygon?: boolean;
  setIsOpened?: (opened: boolean) => void;
  shiftPadding?: number;
  triggerOn?: FloatingTriggerOn | FloatingTriggerOn[];
  withMinWidthTrigger?: boolean;
  withStopPropagation?: boolean;
  flipOptions?: FloatingFlipOptions;
};

export type FloatingNodeContainerProps = {
  children: ReactElement;
  nodeId: string;
  withFloatingTree?: boolean;
};

const DEFAULT_TRIGGER = [...DEFAULT_TRIGGER_ON];

const FloatingNodeContainer = ({
  children,
  nodeId,
  withFloatingTree,
}: FloatingNodeContainerProps) => {
  return withFloatingTree ? (
    <FloatingNode id={nodeId}>{children}</FloatingNode>
  ) : (
    children
  );
};

const FloatingComponent = ({
  arrowClassName,
  children,
  className,
  content,
  'data-testid': testId = 'floating',
  delay = DEFAULT_DELAY,
  duration: durationProps = DEFAULT_DURATION,
  isDisabled,
  initialIsOpened = false,
  isOpened: controlledIsOpened,
  minWidth,
  maxHeight = DEFAULT_MAX_HEIGHT,
  offset: offsetProps = DEFAULT_OFFSET,
  onClose = () => {},
  onOpen = () => {},
  withCloseOnOutsidePress = true,
  padding,
  placement: placementProps = DEFAULT_PLACEMENT,
  role,
  safePolygon: safePolygonProps = true,
  setIsOpened: controlledSetIsOpened,
  shiftPadding = DEFAULT_SHIFT_PADDING,
  strategy: strategyProps = DEFAULT_STRATEGY,
  triggerClassName,
  triggerOn = DEFAULT_TRIGGER,
  type,
  withArrow = DEFAULT_WITH_ARROW,
  withFloatingTree,
  withMinWidthTrigger = DEFAULT_WITH_MIN_WIDTH_TRIGGER,
  withSizeMiddleware,
  withStopPropagation = DEFAULT_WITH_STOP_PROPAGATION,
  withSmoothAnimation = DEFAULT_WITH_SMOOTH_ANIMATION,
  wrapper,
  wrapperContent,
  flipOptions,
}: FloatingProps & FloatingInternalProps & FloatingInternalSharedProps) => {
  const [uncontrolledIsOpened, uncontrolledSetIsOpened] =
    useState(initialIsOpened);
  const opened = controlledIsOpened ?? uncontrolledIsOpened;
  const setOpened = controlledSetIsOpened ?? uncontrolledSetIsOpened;
  const duration = DURATIONS_MS[durationProps];

  const arrowRef = useRef(null);

  const nodeId = useFloatingNodeId();

  const middlewares = [
    flip(flipOptions),
    shift({ padding: shiftPadding }),
    offset(offsetProps + (withArrow ? ARROW_SIZE : 0)),
    ...insertIf(
      !!withSizeMiddleware,
      size({
        padding: Number(getThemeSpacing(7, 'px')),
        apply({ availableHeight, rects, elements }) {
          Object.assign(elements.floating.style, {
            overflowY: 'auto',
            maxHeight:
              maxHeight === 'fit'
                ? `${availableHeight}px`
                : `${Math.min(availableHeight, maxHeight)}px`,
            ...(minWidth === 'fit' && {
              minWidth: `${rects.reference.width}px`,
            }),
          });
        },
      }),
    ),
    ...insertIf(withArrow, arrow({ element: arrowRef })),
  ];

  const { context, refs, middlewareData, placement, strategy, x, y } =
    useFloating({
      middleware: middlewares,
      onOpenChange: setOpened,
      open: opened,
      placement: placementProps,
      strategy: strategyProps,
      whileElementsMounted: autoUpdate,
      ...(withFloatingTree && { nodeId }),
    });

  const triggerEvents = Array.isArray(triggerOn) ? triggerOn : [triggerOn];

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role }),
    useHover(context, {
      enabled: triggerEvents.includes('hover') && !isDisabled,
      delay: { open: delay, close: 0 },
      ...(safePolygonProps && { handleClose: safePolygon() }),
    }),
    useFocus(context, {
      enabled: triggerEvents.includes('focus') && !isDisabled,
    }),
    useDismiss(context, {
      enabled: (type === 'popover' || type === 'modal') && !isDisabled,
      bubbles: false,
      outsidePress: withCloseOnOutsidePress,
    }),
    useClick(context, {
      enabled:
        (type === 'popover' || type === 'modal') &&
        !isDisabled &&
        triggerEvents.includes('click'),
    }),
  ]);

  const contextValue: FloatingContextType = useMemo(
    () => ({
      close: () => {
        setOpened(false);
      },
      opened,
    }),
    [opened, setOpened],
  );

  const CommonFloatingElement = (
    <FloatingElement
      ref={refs.setFloating}
      maxHeight={
        !withSizeMiddleware && isNumber(maxHeight) ? maxHeight : undefined
      }
      arrowClassName={arrowClassName}
      arrowRef={arrowRef}
      className={className}
      content={content}
      context={context}
      data-testid={testId}
      duration={durationProps}
      isDisabled={isDisabled}
      middlewareData={middlewareData}
      padding={padding}
      placement={placement}
      strategy={strategy}
      withArrow={withArrow}
      withSmoothAnimation={withSmoothAnimation}
      x={x}
      y={y}
      {...getFloatingProps()}
    />
  );

  useDidMountEffect(() => {
    if (opened) {
      onOpen();
    } else {
      setTimeout(onClose, duration);
    }
  }, [opened]);

  let wrapperChildren: ReactNode = CommonFloatingElement;
  if (wrapperContent) {
    wrapperChildren = isFunction(wrapperContent)
      ? wrapperContent(contextValue)
      : wrapperContent;
  }

  const referenceProps = getReferenceProps();

  const getComputedWithStopPropagation = (
    withStopPropagation: boolean,
    triggerOn: FloatingTriggerOn | FloatingTriggerOn[],
  ) => {
    const typedTriggerOn = isString(triggerOn) ? [triggerOn] : triggerOn;

    return typedTriggerOn.includes('click') || withStopPropagation;
  };

  return (
    <FloatingContext.Provider value={contextValue}>
      <FloatingNodeContainer
        nodeId={nodeId}
        withFloatingTree={withFloatingTree}
      >
        <FloatingPortal>
          {isFunction(wrapper)
            ? wrapper({
                ctx: context,
                children: wrapperChildren,
                'data-testid': suffixTestId(testId, 'content'),
                duration,
                opened,
                ref: refs.setFloating,
              })
            : CommonFloatingElement}
        </FloatingPortal>
      </FloatingNodeContainer>

      {!isEmptyFragment(children) && (
        <TriggerElement
          ref={refs.setReference}
          withStopPropagation={getComputedWithStopPropagation(
            withStopPropagation,
            triggerOn,
          )}
          className={triggerClassName}
          data-testid={testId}
          withMinWidthTrigger={withMinWidthTrigger}
          {...referenceProps}
        >
          {children}
        </TriggerElement>
      )}
    </FloatingContext.Provider>
  );
};

const Floating = ({
  withFloatingTree = DEFAULT_WITH_FLOATING_TREE,
  ...props
}: FloatingProps & FloatingInternalProps & FloatingInternalSharedProps) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null && withFloatingTree) {
    return (
      <FloatingTree>
        <FloatingComponent withFloatingTree={withFloatingTree} {...props} />
      </FloatingTree>
    );
  }

  return <FloatingComponent withFloatingTree={withFloatingTree} {...props} />;
};

export default Floating;
