import { withoutKey } from '@gatewatcher/bistoury/utils-lang';

import type { InputBaseRenderProps } from '.';

export const getInputBaseRenderProps = (props: InputBaseRenderProps) =>
  withoutKey(props, [
    'fitContent',
    'withErrors',
    'readonlyMode',
    'withLabel',
    'flexGrow',
  ]);

export const getTextareaRenderProps = (props: InputBaseRenderProps) =>
  withoutKey(props, ['fitContent', 'withErrors', 'readonlyMode', 'withLabel']);
