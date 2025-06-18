import { Children, type ReactNode } from 'react';

import type { Gap } from '@/skin/layout/Grid/types';
import {
  interleaveArrayElements,
  isReactNodeDisplayable,
} from '@/skin/layout/MultiTabs/utils';

import { VerticalDivider } from '../components/VerticalDivider';
import { ToolbarGroup } from './ToolbarGroup';

type ToolbarProps = {
  children?: ReactNode;
  gap?: Gap;
};

export const Toolbar = ({ children }: ToolbarProps) => {
  return interleaveArrayElements(
    Children.toArray(children).filter(isReactNodeDisplayable),
    index => <VerticalDivider key={index} />,
  );
};

Toolbar.Group = ToolbarGroup;
