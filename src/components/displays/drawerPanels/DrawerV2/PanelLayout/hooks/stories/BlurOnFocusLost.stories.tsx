import { mergeRefs } from '@gatewatcher/bistoury/utils-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { useDragHandle } from '..';
import {
  type Position,
  addPositions,
  dividePosition,
  getDistance,
  getElementScale,
} from '../../utils';

import styles from './styles.module.scss';

const SCALE_IDENTITY = { x: 1, y: 1 };
const INITIAL_POSITION = { x: 15, y: 75 };
const DEFAULT_OFFSET = { x: 0, y: 0 };

const meta = {
  title: 'dragging/BlurOnFocusLost',
  component: () => <></>,
  render: () => {
    const [position, setPosition] = useState<Position>(INITIAL_POSITION);
    const [offset, setOffset] = useState<Position>(DEFAULT_OFFSET);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [container, setContainer] = useState<HTMLElement | null>(null);
    const inverseScale =
      container && dividePosition(SCALE_IDENTITY, getElementScale(container));

    const dragging = useDragHandle({
      onWillDrag: () => {
        console.log('willDrag');
      },
      onDragStart: () => {
        timeoutId.current = setTimeout(() => {
          // Uncomment to make the element unintentionally lose the focus after the timeout.
          // alert('alert');
        }, 1000);
        console.log('dragStart');
      },
      onDrag: dragging => {
        setOffset(dragging.offset);
        // For example, we can limit the dragging distance.
        if (getDistance(dragging.offset) > 800) {
          // dragging.cancel();
        }
      },
      onDragEnd: dragging => {
        console.log('dragEnd');
        setPosition(addPositions(position, offset));
        setOffset(DEFAULT_OFFSET);
        dragging.settle();
      },
      onDragCancel: dragging => {
        console.log('dragCancel');
        setOffset(DEFAULT_OFFSET);
        // Keeping the position leaves the element where the dragging was canceled.
        setPosition(addPositions(position, offset));
        // Immediately settle the dragging and call onDragSettled(),
        // and keep/lose the focus according to the `keepFocusAfterSettled` option.
        // It can take an argument to override the `keepFocusAfterSettled` option.
        dragging.settle(false);
      },
      onDragSettled: () => {
        console.log('dragSettled');
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = null;
        }
      },
      cancelOnContextMenu: false,
      cancelOnEscape: true,
      cancelOnFocusLost: true,
      deadZoneRadius: 15,
      keepFocusAfterSettled: true,
      speed: inverseScale ?? 1,
    });

    return (
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          background: 'lightgray',
          padding: 50,
          userSelect: 'none',
          justifyContent: 'center',
          position: 'absolute',
          left: position.x,
          top: position.y,
          transform: `translate(${offset.x}px,${offset.y}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'black',
          textAlign: 'center',
        }}
        className={styles.focus}
        {...dragging.elementProps}
        ref={
          dragging.elementProps.ref
            ? mergeRefs([dragging.elementProps.ref, setContainer])
            : mergeRefs([setContainer])
        }
      >
        Drag me
      </div>
    );
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export default meta;
