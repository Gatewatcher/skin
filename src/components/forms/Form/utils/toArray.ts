import type { ReactElement, ReactNode } from 'react';
import { Children } from 'react';

import { isFragment } from '@/utils/react';

export interface Option {
  keepEmpty?: boolean;
}

const toArray = (children: ReactNode, option: Option = {}): ReactElement[] => {
  let ret: ReactElement[] = [];
  Children.forEach(children, (child: unknown | unknown[]) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray((child as ReactElement).props.children, option));
    } else {
      ret.push(child as ReactElement);
    }
  });

  return ret;
};

export default toArray;
