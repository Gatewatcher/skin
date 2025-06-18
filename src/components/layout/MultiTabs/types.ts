import type { IconProps } from '@/skin/displays';

export type Tab = {
  iconColor?: IconProps['color'];
  iconName?: IconProps['name'];
  id: string;
  isEditable?: boolean;
  isPinned?: boolean;
  title?: string;
};
