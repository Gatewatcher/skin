import type {
  FileStatus,
  UploadFile,
  UploadFileProps,
  UploadInformation,
} from '../forms/inputs/uploads/types';
import AutoSave, { type AutoSaveProps } from './AutoSave';
import Breadcrumb, { type BreadcrumbProps } from './Breadcrumb';
import FilesList, { type FilesListProps } from './FilesList';
import JsonViewer, { type JsonViewerProps } from './JsonViewer';
import Notification, { type NotificationProps } from './Notification';
import Placeholder, { type PlaceholderProps } from './Placeholder';
import Skeleton, { type SkeletonProps } from './Skeleton';
import Timeline, { type TimelineProps } from './Timeline';
import Toastr, { type ToastrProps } from './Toastr';
import type { Toast } from './Toastr/types';
import UploadIndicator, { type UploadIndicatorProps } from './UploadIndicator';
import WithStatus, { type WithStatusProps } from './WithStatus';
import CircularLoader, {
  type CircularLoaderProps,
} from './loaders/CircularLoader';
import LinearLoader, { type LinearLoaderProps } from './loaders/LinearLoader';
import CircularProgress, {
  type CircularProgressProps,
} from './progress/CircularProgress';
import LinearProgress, {
  type LinearProgressProps,
} from './progress/LinearProgress';
import StorageLimitProgress, {
  type StorageLimitProgressProps,
} from './progress/StorageLimitProgress';
import type { ProgressBaseProps, ProgressStatus } from './progress/types';
import ComponentBoundaries, {
  type ComponentBoundariesProps,
} from './states/ComponentBoundaries';
import ErrorState, { type ErrorStateProps } from './states/ErrorState';
import LoaderState, { type LoaderStateProps } from './states/LoaderState';

export { useToasts } from './Toastr/hook';
export { useAutoSave } from './AutoSave';
export { useUploadIndicator } from './UploadIndicator/hook';

export {
  ComponentBoundaries,
  AutoSave,
  Breadcrumb,
  CircularLoader,
  CircularProgress,
  ErrorState,
  FilesList,
  JsonViewer,
  LinearLoader,
  LinearProgress,
  LoaderState,
  Notification,
  Placeholder,
  Skeleton,
  StorageLimitProgress,
  Timeline,
  Toastr,
  Toast,
  UploadIndicator,
  WithStatus,
};
export type {
  AutoSaveProps,
  BreadcrumbProps,
  CircularLoaderProps,
  CircularProgressProps,
  ComponentBoundariesProps,
  ErrorStateProps,
  FileStatus,
  FilesListProps,
  JsonViewerProps,
  LinearLoaderProps,
  LinearProgressProps,
  LoaderStateProps,
  NotificationProps,
  PlaceholderProps,
  SkeletonProps,
  StorageLimitProgressProps,
  TimelineProps,
  ToastrProps,
  UploadFile,
  UploadFileProps,
  UploadIndicatorProps,
  UploadInformation,
  ProgressBaseProps,
  ProgressStatus,
  WithStatusProps,
};
