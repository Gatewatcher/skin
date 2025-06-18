import type {
  ELLIPSED_DATA_COUNT_POSITIONS,
  ELLIPSED_DATA_DIRECTIONS,
} from './constants';

export type EllipsedDataCountPosition =
  typeof ELLIPSED_DATA_COUNT_POSITIONS[number];
export type EllipsedDataDirection = typeof ELLIPSED_DATA_DIRECTIONS[number];
