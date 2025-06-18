import type { StatusIndicatorProps } from '@/skin/displays/StatusIndicator';
import StatusIndicator from '@/skin/displays/StatusIndicator';

import Accordion, { type AccordionProps } from './Accordion';
import Avatar, { type AvatarProps } from './Avatar';
import AvatarUsername, { type AvatarUsernameProps } from './AvatarUsername';
import Badge, { type BadgeProps } from './Badge';
import Carousel, { type CarouselProps } from './Carousel';
import Changelog, { type ChangelogProps } from './Changelog';
import Code, { type CodeProps } from './Code';
import ColorIndicator, { type ColorIndicatorProps } from './ColorIndicator';
import Comments, { type CommentsProps } from './Comments';
import Divider, { type DividerProps } from './Divider';
import Drawer, { type DrawerProps } from './Drawer';
import FileContent, { type FileContentProps } from './FileContent';
import Finder, { type FinderProps } from './Finder';
import Helper, { type HelperProps } from './Helper';
import Hint, { type HintProps } from './Hint';
import Illustration, { type IllustrationProps } from './Illustration';
import InfoTooltip, { type InfoTooltipProps } from './InfoTooltip';
import KeyValue, { type KeyValueProps } from './KeyValue';
import KeyValueDisplay, { type KeyValueDisplayProps } from './KeyValueDisplay';
import Label, { type LabelProps } from './Label';
import Markdown, { type MarkdownProps } from './Markdown';
import ObfuscatedText, { type ObfuscatedTextProps } from './ObfuscatedText';
import ObjectGrid, { type ObjectGridProps } from './ObjectGrid';
import Pill, { type PillProps } from './Pill';
import PoweredByGatewatcher, {
  type PoweredByGatewatcherProps,
} from './PoweredByGatewatcher';
import ProfileCard, { type ProfileCardProps } from './ProfileCard';
import ScoreIndicator, { type ScoreIndicatorProps } from './ScoreIndicator';
import Section, { type SectionProps } from './Section';
import ShimmerEffect, { type ShimmerEffectProps } from './ShimmerEffect';
import Stepper, { type StepperProps } from './Stepper';
import StorageRepartition, {
  type StorageRepartitionProps,
} from './StorageRepartition';
import Tabs, { type TabsProps } from './Tabs';
import TextIcon, {
  type TextIconBaseProps,
  type TextIconProps,
} from './TextIcon';
import Card, { type CardProps } from './cards/Card';
import CardSelectable, {
  type CardSelectableProps,
} from './cards/CardSelectable';
import Chip, { type ChipProps } from './chips/Chip';
import ChipCustom, { type ChipCustomProps } from './chips/ChipCustom';
import DateTime, { type DateTimeProps } from './date/DateTime';
import DateTimeAbsolute, {
  type DateTimeAbsoluteProps,
} from './date/DateTimeAbsolute';
import DateTimeRelative, {
  type DateTimeRelativeProps,
} from './date/DateTimeRelative';
import EllipsedData, { type EllipsedDataProps } from './ellipsis/EllipsedData';
import EllipsisDataModal, {
  type EllipsisDataModalProps,
} from './ellipsis/EllipsisDataModal';
import EllipsisDataPopover, {
  type EllipsisDataPopoverProps,
} from './ellipsis/EllipsisDataPopover';
import Dropdown, { type DropdownProps } from './floating/Dropdown';
import Modal, { type ModalProps } from './floating/Modal';
import Popover, { type PopoverProps } from './floating/Popover';
import Tooltip, { type TooltipProps } from './floating/Tooltip';
import Icon, { type IconProps } from './icons/Icon';
import IconAttachment, {
  type IconAttachmentProps,
} from './icons/IconAttachment';
import IconContained, { type IconContainedProps } from './icons/IconContained';
import Panels, { type PanelsProps } from './panels';
import DrawerV2 from './panels/DrawerV2';
import {
  DRAWER_CLOSE_EVERYWHERE,
  DRAWER_KEEP_EVERYWHERE,
} from './panels/DrawerV2/constants';
import SidePanel, { type SidePanelProps } from './panels/SidePanel';
import SelectableTree, {
  type SelectableTreeProps,
} from './tree/SelectableTree';
import Tree, { type TreeProps } from './tree/Tree';

export {
  useDrawerV2,
  useCurrentDrawer,
  useDrawerPersistence,
  type DrawerMatches,
  type UseDrawerV2Options,
  type UseDrawerV2Return,
} from './panels/DrawerV2';

export { useSidePanel } from './panels/SidePanel/Provider';
export type { IconName } from './icons/types';
export type { IllustrationName } from './Illustration/types';
export type { TreeNodeId } from './tree/SelectableTree/types';
export { type TabId } from './Tabs/types';
export { getAvatarColor } from './Avatar/utils';
export { useDrawer } from './Drawer/hooks/useDrawer';
export { useDrawerContainer } from './Drawer/hooks/useDrawerContainer';
export { useStepper } from './Stepper/hook';

export {
  Accordion,
  Avatar,
  AvatarUsername,
  Badge,
  Card,
  CardSelectable,
  Carousel,
  Changelog,
  Chip,
  ChipCustom,
  Code,
  ColorIndicator,
  Comments,
  DateTime,
  DateTimeAbsolute,
  DateTimeRelative,
  Divider,
  Drawer,
  DrawerV2,
  Dropdown,
  EllipsedData,
  EllipsisDataModal,
  EllipsisDataPopover,
  FileContent,
  Finder,
  Helper,
  Hint,
  Icon,
  IconAttachment,
  IconContained,
  Illustration,
  InfoTooltip,
  KeyValue,
  KeyValueDisplay,
  Label,
  Markdown,
  Modal,
  ObfuscatedText,
  ObjectGrid,
  Panels,
  Pill,
  Popover,
  PoweredByGatewatcher,
  ProfileCard,
  ScoreIndicator,
  Section,
  SelectableTree,
  ShimmerEffect,
  SidePanel,
  StatusIndicator,
  Stepper,
  StorageRepartition,
  Tabs,
  TextIcon,
  Tooltip,
  Tree,
};

export const drawerPersistence = {
  closeEverywhere: DRAWER_CLOSE_EVERYWHERE,
  keepEverywhere: DRAWER_KEEP_EVERYWHERE,
};

export type {
  AccordionProps,
  AvatarProps,
  AvatarUsernameProps,
  BadgeProps,
  CardProps,
  CardSelectableProps,
  CarouselProps,
  ChangelogProps,
  ChipCustomProps,
  ChipProps,
  CodeProps,
  ColorIndicatorProps,
  CommentsProps,
  DateTimeAbsoluteProps,
  DateTimeProps,
  DateTimeRelativeProps,
  DividerProps,
  DrawerProps,
  DropdownProps,
  EllipsedDataProps,
  EllipsisDataModalProps,
  EllipsisDataPopoverProps,
  FileContentProps,
  FinderProps,
  HelperProps,
  HintProps,
  IconAttachmentProps,
  IconContainedProps,
  IconProps,
  IllustrationProps,
  InfoTooltipProps,
  KeyValueDisplayProps,
  KeyValueProps,
  LabelProps,
  MarkdownProps,
  ModalProps,
  ObfuscatedTextProps,
  ObjectGridProps,
  PanelsProps,
  PillProps,
  PopoverProps,
  PoweredByGatewatcherProps,
  ProfileCardProps,
  ScoreIndicatorProps,
  SectionProps,
  SelectableTreeProps,
  ShimmerEffectProps,
  SidePanelProps,
  StatusIndicatorProps,
  StepperProps,
  StorageRepartitionProps,
  TabsProps,
  TextIconBaseProps,
  TextIconProps,
  TooltipProps,
  TreeProps,
};
