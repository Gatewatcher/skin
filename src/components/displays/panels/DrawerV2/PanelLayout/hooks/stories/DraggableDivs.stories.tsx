import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useDragHandle } from '..';
import { type Position, addPositions } from '../../utils';

const DEFAULT_OFFSET = { x: 0, y: 0 };
const ITEM_SIZE = 100;
const ITEM_MARGIN = 15;

type DraggableDivProps = {
  color: string;
  initialPosition: Position;
  mode: 'move' | 'clone';
};

const DraggableDiv = ({ color, initialPosition, mode }: DraggableDivProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);
  const [offset, setOffset] = useState<Position>(DEFAULT_OFFSET);
  const [clonePositions, setClonePositions] = useState<Position[]>([]);

  const dragging = useDragHandle<HTMLDivElement>({
    onDrag: ({ offset }) => {
      setIsDragging(true);
      setOffset(offset);
    },
    onDragEnd: () => {
      setIsDragging(false);
      if (mode === 'move') {
        setPosition(addPositions(position, offset));
      } else {
        setClonePositions(previous => [
          ...previous,
          addPositions(position, offset),
        ]);
      }
      setOffset(DEFAULT_OFFSET);
    },
    onDragCancel: () => {
      setIsDragging(false);
      setOffset(DEFAULT_OFFSET);
    },
    deadZoneRadius: 20,
  });

  return (
    <>
      {clonePositions.map((clonePosition, index) => (
        <DraggableDiv
          key={index}
          color={color}
          initialPosition={clonePosition}
          mode="move"
        />
      ))}
      {isDragging && mode === 'clone' && (
        <div
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            borderRadius: 10,
            background: color,
            userSelect: 'none',
            justifyContent: 'center',
            position: 'fixed',
            left: position.x,
            top: position.y,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Factory
        </div>
      )}
      <div
        style={{
          width: ITEM_SIZE,
          height: ITEM_SIZE,
          borderRadius: 10,
          background: color,
          userSelect: 'none',
          justifyContent: 'center',
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: `translate(${offset.x}px,${offset.y}px)`,
          display: 'flex',
          alignItems: 'center',
          opacity: !isDragging && mode === 'move' ? 1 : 0.5,
        }}
        {...dragging.elementProps}
      >
        {isDragging || mode === 'move' ? 'Clone' : 'Factory'}
      </div>
    </>
  );
};

const ITEMS: string[] = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'];

const meta = {
  title: 'dragging/DraggableDivs',
  component: () => <></>,
  render: () => {
    return (
      <>
        <h3>Drag from a factory to create a clone</h3>
        {ITEMS.map((item, index) => (
          <DraggableDiv
            key={index}
            initialPosition={{
              x: index * (ITEM_SIZE + ITEM_MARGIN) + ITEM_MARGIN,
              y: 120,
            }}
            color={item}
            mode="clone"
          />
        ))}
      </>
    );
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export default meta;
