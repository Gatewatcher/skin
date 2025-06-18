import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { useCallback, useRef, useState } from 'react';

import type { ExpandValue, SetExpanded } from '../types';

const useDefaultNodeData = (): [ExpandValue, SetExpanded] => {
  const [expandValue, setExpandValue] = useState<ExpandValue>(() => ({
    expandedIds: new Map<string | number, boolean>(),
  }));

  const expandedIdsRef = useRef(expandValue.expandedIds);

  const setExpanded: SetExpanded = useCallback(
    (
      id: string | number,
      expanded: boolean | ((previous: boolean) => boolean),
    ) => {
      const current = expandedIdsRef.current.get(id) ?? false;
      const newExpanded = isFunction(expanded) ? expanded(current) : expanded;
      if (newExpanded !== current) {
        expandedIdsRef.current.set(id, newExpanded);
        setExpandValue(value => ({ ...value }));
      }
    },
    [],
  );

  return [expandValue, setExpanded];
};

export default useDefaultNodeData;
