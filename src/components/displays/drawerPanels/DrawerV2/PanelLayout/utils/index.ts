import { isNumber } from '@gatewatcher/bistoury/utils-lang';

import { type Position } from './types';

export const addPositions = (a: Position, b: Position): Position => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
};

export const subtractPositions = (a: Position, b: Position): Position => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

export const multiplyPosition = (
  position: Position,
  factor: number | Position,
) => {
  const factorX = isNumber(factor) ? factor : factor.x;
  const factorY = isNumber(factor) ? factor : factor.y;

  return {
    x: position.x * factorX,
    y: position.y * factorY,
  };
};

export const dividePosition = (
  position: Position,
  divisor: number | Position,
) => {
  const divisorX = isNumber(divisor) ? divisor : divisor.x;
  const divisorY = isNumber(divisor) ? divisor : divisor.y;

  return {
    x: position.x / divisorX,
    y: position.y / divisorY,
  };
};

export const getDistance = (position: Position): number => {
  return Math.sqrt(position.x * position.x + position.y * position.y);
};

export const getElementScale = (element: HTMLElement) => {
  const realDimensions = element.getBoundingClientRect();
  return {
    x: realDimensions.width / element.offsetWidth,
    y: realDimensions.height / element.offsetHeight,
  };
};

export const convertSizePxOrPercentToPx = (
  sizePxOrPercent: string | number,
  referenceSizePx: number,
) => {
  if (typeof sizePxOrPercent === 'number') {
    return sizePxOrPercent;
  }
  const percentage = parsePercentageString(sizePxOrPercent);
  return (referenceSizePx / 100) * percentage;
};

export const parsePercentageString = (percentString: string) => {
  const regex = /^(\d+)%$/;
  const match = regex.exec(percentString);
  if (!match) {
    throw new Error(`${percentString} doesn't match ${regex.source}`);
  }
  return parseInt(match[0], 10);
};

export { type Position };
