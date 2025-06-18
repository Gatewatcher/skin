import type { ELEVATIONS } from './constants';

export type Elevation = typeof ELEVATIONS[number];

export type ElevationProps = {
  elevation?: Elevation;
};
