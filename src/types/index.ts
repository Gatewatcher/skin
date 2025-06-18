import type {
  BREAKPOINTS,
  COLORS_SCAlE,
  ICON_SIZES,
  ILLUSTRATION_SIZES,
  MESSAGE_TYPES,
  NEUTRAL_TYPES,
  RISK_TYPES,
  THEME_COLORS,
} from '@/constants';

export type RiskType = typeof RISK_TYPES[number];
export type MessageType = typeof MESSAGE_TYPES[number];
export type NeutralType = typeof NEUTRAL_TYPES[number];
export type Type = MessageType | RiskType;

export type ThemeColor = typeof THEME_COLORS[number];
export type Colors = ThemeColor | Type;
export type ColorsScale = typeof COLORS_SCAlE[number];
export type ColorsWithNeutral = Colors | NeutralType;

export type Breakpoint = typeof BREAKPOINTS[number];
export type BreakpointMap<T> = Partial<Record<Breakpoint, T>>;
export type BreakpointProp<T = number> = BreakpointMap<T> | T;

export type HTMLTagName = keyof Omit<HTMLElementTagNameMap, 'search'>;

export type IconSize = typeof ICON_SIZES[number];
export type IllustrationSize = typeof ILLUSTRATION_SIZES[number];
