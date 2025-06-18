import type { IconProps } from '@/skin/displays/icons/Icon';

export type ChatBoxAttachment = {
  id: string;
  name: string;
  size: number;
  isLoading?: boolean;
  loadingProgress?: number;
};

export type AttachmentError<T extends ChatBoxAttachment> = (
  attachment: T,
) => string | undefined;

export type AttachmentOptions = {
  previewIconName?: IconProps['name'];
  limit: number;
};

export type AutoCompletionOption = {
  label: string;
  value: string;
  onClick?: (option: AutoCompletionOption) => void;
} & Record<string, unknown>;

export type AutoCompletionSettings<T> = {
  options: T[];
  onSelect?: (option: T) => void;
  filterOptions?: (
    options: T[],
    input: { value: string; lastWord: string },
  ) => T[];
};
