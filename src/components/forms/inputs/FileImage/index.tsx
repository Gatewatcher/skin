import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import { useState } from 'react';

import { Stack } from '@/skin/layout';

import File, { type FileChangeEventParams, type FileProps } from '../File';
import Preview from './components/Preview';
import { DEFAULT_RATIO, DEFAULT_SIZE, DEFAULT_VARIANT } from './constants';
import type { FileImageRatio, FileImageSize } from './types';

export type FileImageProps = FileProps & {
  onRemove?: () => void;
  ratio?: FileImageRatio;
  size?: FileImageSize;
  defaultName?: string;
  defaultUrl?: string;
};

const FileImage = ({
  'data-testid': testId = 'file-image-input',
  onChange,
  onRemove,
  defaultName,
  defaultUrl,
  ratio = DEFAULT_RATIO,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  ...rest
}: FileImageProps) => {
  const [file, setFile] = useState<File>();
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);

  const handleChange = (event: FileChangeEventParams) => {
    setFile(event.files[0]);
    onChange?.(event);
  };

  const handleRemove = () => {
    setFile(undefined);
    setCurrentUrl('');
    onRemove?.();
  };

  return (
    <Stack data-testid={testId} direction="column" gap={4}>
      <Preview
        data-testid={suffixTestId(testId, 'preview')}
        file={file}
        name={defaultName}
        onDelete={handleRemove}
        ratio={ratio}
        size={size}
        url={currentUrl}
      />

      <File
        accept="image/*"
        data-testid={testId}
        onChange={handleChange}
        variant={variant}
        {...rest}
      />
    </Stack>
  );
};

export default FileImage;
