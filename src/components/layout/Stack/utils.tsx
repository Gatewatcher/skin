import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { buildCssBreakpointVariables, buildGapStyles } from 'utils/css';

import type { CssVariables } from './types';

export const buildCssVariables = ({
  alignContent,
  alignItems,
  alignSelf,
  direction,
  flex,
  flexBasis,
  flexGrow,
  flexShrink,
  gap,
  justifyContent,
  order,
  wrap,
}: CssVariables) => {
  return {
    ...(alignSelf &&
      buildCssBreakpointVariables('stack-align-self', alignSelf)),
    ...(alignContent &&
      buildCssBreakpointVariables('stack-align-content', alignContent)),
    ...(alignItems &&
      buildCssBreakpointVariables('stack-align-items', alignItems)),
    ...(direction &&
      buildCssBreakpointVariables('stack-flex-direction', direction)),
    ...(flex && buildCssBreakpointVariables('stack-flex', flex)),
    ...(flexBasis &&
      buildCssBreakpointVariables('stack-flex-basis', flexBasis)),
    ...(isDefined(flexGrow) &&
      buildCssBreakpointVariables('stack-flex-grow', flexGrow)),
    ...(isDefined(flexShrink) &&
      buildCssBreakpointVariables('stack-flex-shrink', flexShrink)),
    ...(isDefined(gap) && buildGapStyles('stack-gap', gap)),
    ...(justifyContent &&
      buildCssBreakpointVariables('stack-justify-content', justifyContent)),
    ...(order && buildCssBreakpointVariables('stack-order', order)),
    ...(wrap && buildCssBreakpointVariables('stack-flex-wrap', wrap)),
  };
};
