import { mergeRefs } from '@gatewatcher/bistoury/utils-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { useDragHandle } from '..';
import { type Position } from '../../utils';

const SAFE_ZONE_RADIUS = 25;

const meta = {
  title: 'dragging/DragZone',
  component: () => <></>,
  render: () => {
    const [status, setStatus] = useState<
      'ready' | 'dragging' | 'stale' | 'idle'
    >('idle');
    const [endPositions, setEndPositions] = useState<Position[]>([]);
    const [cancelPositions, setCancelPositions] = useState<Position[]>([]);
    const [draggingPosition, setDraggingPosition] = useState<Position | null>();
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = () => {
      if (status === 'ready') {
        alert('clicked');
      }
    };

    const [element, setElement] = useState<HTMLElement | null>();

    const isDraggingOverElement =
      status === 'dragging' &&
      !!element &&
      !!draggingPosition &&
      draggingPosition.x >= element.getBoundingClientRect().left &&
      draggingPosition.x <= element.getBoundingClientRect().right &&
      draggingPosition.y >= element.getBoundingClientRect().top &&
      draggingPosition.y <= element.getBoundingClientRect().bottom;

    const resetDraggingWithStatus = (
      status: 'ready' | 'dragging' | 'stale' | 'idle',
    ) => {
      setStatus(status);
      setDraggingPosition(null);
      document.documentElement.style.cursor = 'default';
    };

    const dragging = useDragHandle({
      onWillDrag: ({ position }) => {
        console.log('willDrag');
        setStatus('ready');
        setDraggingPosition(position);
        document.documentElement.style.cursor = 'grabbing';
      },
      onDragStart: ({ position }) => {
        timeoutId.current = setTimeout(() => {
          // alert() makes the element lose the focus, and then it should stop dragging.
          // alert('alert');
        }, 1000);
        console.log('dragStart');
        setStatus('dragging');
        setDraggingPosition(position);
        document.documentElement.style.cursor = 'all-scroll';
      },
      onDrag: ({ position }) => {
        setDraggingPosition(position);
      },
      onDragEnd: ({ position }) => {
        console.log('dragEnd');
        if (!isDraggingOverElement) {
          setEndPositions(previous => [...previous, position]);
        }
      },
      onDragCancel: ({ position }) => {
        console.log('dragCancel');
        resetDraggingWithStatus('stale');
        if (!isDraggingOverElement) {
          setCancelPositions([position]);
        }
      },
      onDragSettled: () => {
        console.log('dragSettled');
        resetDraggingWithStatus('idle');
      },
      cancelOnContextMenu: false,
      cancelOnEscape: true,
      cancelOnFocusLost: false,
      deadZoneRadius: SAFE_ZONE_RADIUS,
    });

    return (
      <>
        {status === 'ready' && draggingPosition && (
          <div
            style={{
              width: SAFE_ZONE_RADIUS * 2,
              height: SAFE_ZONE_RADIUS * 2,
              borderRadius: SAFE_ZONE_RADIUS,
              border: '2px solid slategray',
              background: 'silver',
              borderStyle: 'dashed',
              position: 'fixed',
              left: draggingPosition.x,
              top: draggingPosition.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              // Important to get the events on the container!
              pointerEvents: 'none',
            }}
          ></div>
        )}
        {status === 'dragging' && draggingPosition && (
          <div
            style={{
              width: SAFE_ZONE_RADIUS * 2,
              height: SAFE_ZONE_RADIUS * 2,
              borderRadius: SAFE_ZONE_RADIUS,
              background: isDraggingOverElement ? 'orangered' : 'seagreen',
              position: 'fixed',
              left: draggingPosition.x,
              top: draggingPosition.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              // Important to get the events on the container!
              pointerEvents: 'none',
            }}
          />
        )}
        {endPositions.map((position, index) => (
          <div
            key={index}
            style={{
              width: SAFE_ZONE_RADIUS * 2,
              height: SAFE_ZONE_RADIUS * 2,
              borderRadius: SAFE_ZONE_RADIUS,
              background: 'lightgray',
              position: 'fixed',
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              // Important to get the events on the container!
              pointerEvents: 'none',
            }}
          />
        ))}
        {cancelPositions.map((position, index) => (
          <div
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: 'darkorange',
              position: 'fixed',
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              // Important to get the events on the container!
              pointerEvents: 'none',
            }}
          />
        ))}
        <div
          style={{
            color: isDraggingOverElement ? 'red' : 'black',
            fontSize: 24,
            border: `2px dashed ${isDraggingOverElement ? 'red' : 'black'}`,
            borderRadius: 10,
            padding: 50,
            userSelect: 'none',
            backgroundColor:
              status === 'dragging'
                ? isDraggingOverElement
                  ? 'lightsalmon'
                  : 'lightgray'
                : status === 'ready'
                ? 'wheat'
                : 'cornsilk',
            display: 'flex',
            justifyContent: 'center',
            cursor:
              status === 'ready'
                ? 'grabbing'
                : status === 'dragging'
                ? isDraggingOverElement
                  ? 'not-allowed'
                  : 'all-scroll'
                : 'grab',
            opacity: status === 'dragging' ? 0.5 : 1,
          }}
          {...dragging.elementProps}
          ref={
            dragging.elementProps.ref
              ? mergeRefs([setElement, dragging.elementProps.ref])
              : mergeRefs([setElement])
          }
          onClick={handleClick}
        >
          {status === 'idle' && 'Drag from here'}
          {status === 'ready' &&
            'Ready to drag, will start after you leave the dead zone'}
          {status === 'dragging' &&
            !isDraggingOverElement &&
            'Dragging, you can drop'}
          {isDraggingOverElement && 'Dragging, please drop on an empty zone'}
          {status === 'stale' && 'Cancelled, you can release the button'}
        </div>
      </>
    );
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export default meta;
