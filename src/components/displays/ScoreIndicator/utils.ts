import { isString } from '@gatewatcher/bistoury/utils-lang';

import type { Type } from '@/types';

import { SUPPORTED_SECTOR_SIZE } from './constants';
import type { ScoreIndicatorSector } from './types';

export const checkSectorsErrors = (sectors: ScoreIndicatorSector[]) => {
  if (!SUPPORTED_SECTOR_SIZE.find(e => e === sectors.length)) {
    return (
      '[Error] ScoreIndicator: the number of sector must be one of the following ' +
      SUPPORTED_SECTOR_SIZE
    );
  }
  if (sectors[0].start !== 0 || sectors[sectors.length - 1].end !== 100) {
    return '[Error] ScoreIndicator: the 1st sector must start with 0 and the last sector must end with 100';
  }
  for (let i = 0; i < sectors.length - 1; i++) {
    if (sectors[i].end + 1 !== sectors[i + 1].start) {
      return `[Error] ScoreIndicator: sector ${i} and sector ${
        i + 1
      } are not correctly followed, be sure that sector[${
        i + 1
      }].start is equal to sector[${i}].end + 1`;
    }
  }
};

export const getFormattedSectors = (
  sectors: (ScoreIndicatorSector | Type)[],
) => {
  const sectorPortion = (1 / sectors.length) * 100;

  return sectors.map((sector, index): ScoreIndicatorSector => {
    if (isString(sector)) {
      return {
        type: sector,
        start: index === 0 ? 0 : Math.floor(sectorPortion * index) + 1,
        end:
          index === sectors.length - 1
            ? 100
            : Math.floor(sectorPortion * (index + 1)),
      };
    }
    return sector;
  });
};

export const getActiveSector = (
  sectors: ScoreIndicatorSector[],
  value: number,
) => {
  return sectors.find(sector => value >= sector.start && value <= sector.end);
};
