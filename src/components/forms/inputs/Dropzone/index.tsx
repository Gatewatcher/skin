import { FloatingPortal } from '@floating-ui/react';
import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, DragEventHandler, ReactNode } from 'react';
import { cloneElement, memo, useEffect, useState } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

import { Illustration } from '@/skin/displays';
import type { IllustrationName } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import { buildTestIds } from '@/utils/testIds';

import type { DropzoneInnerProps } from './DropzoneInner';
import DropzoneInner, { DropzoneInstructions } from './DropzoneInner';
import {
  DEFAULT_DROP_ANIMATION_POSITION,
  SUFFIX_TEST_IDS,
  TEST_ID,
} from './constants';
import { DropzoneContext } from './contexts';
import type { DropAnimationPosition } from './types';

import styles from './styles.module.scss';

export type DropzoneProps = DataTestId &
  DropzoneOptions & {
    innerOptions?: DropzoneInnerProps;
    innerComponent?: ReactNode;
    styling?: Pick<CSSProperties, 'minHeight'>;
    maxSize?: number;
    icon?: IllustrationName;
    withFullScreenDropzone?: boolean;
    withDropAnimation?: boolean;
    withBorder?: boolean;
    dropAnimationOptions?: {
      position?: DropAnimationPosition;
    };
  };

const Dropzone = ({
  'data-testid': testId = TEST_ID,
  innerComponent,
  innerOptions,
  styling,
  maxSize,
  icon = 'CloudExport',
  withFullScreenDropzone = false,
  withDropAnimation = false,
  withBorder = true,
  dropAnimationOptions = {
    position: DEFAULT_DROP_ANIMATION_POSITION,
  },
  noDrag,
  ...dropzoneOptions
}: DropzoneProps) => {
  const { getInputProps, getRootProps, isDragActive, open } =
    useDropzone(dropzoneOptions);
  const [isDragging, setIsDragging] = useState(false);

  const { position = DEFAULT_DROP_ANIMATION_POSITION } = dropAnimationOptions;

  useEffect(() => {
    if (!isDragActive) {
      setIsDragging(false);
    }
  }, [isDragActive]);

  const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

  const handleDragEnter: DragEventHandler = event => {
    if (
      event.dataTransfer &&
      event.dataTransfer.types &&
      event.dataTransfer.types.includes('Files')
    ) {
      setIsDragging(true);
    }
  };

  return (
    <DropzoneContext.Provider
      value={{
        isDragActive,
        accept: dropzoneOptions.accept,
        maxSize,
        open,
      }}
    >
      {!noDrag && withDropAnimation && (
        <FloatingPortal>
          <div
            className={classNames(
              styles.dropAnimationContainer,
              stylesToCamelCase(styles, 'dropAnimationContainer', position),
            )}
          >
            <Stack
              className={classNames(
                styles.dropInfoContainer,
                isDragActive && styles.dropInfoContainerDragActive,
              )}
              alignItems="center"
              direction="column"
              gap={4}
              justifyContent="center"
            >
              <Illustration name={icon} size={110} />
              <Stack className={styles.dropInfo}>
                <Text>Drop your files to import them.</Text>
              </Stack>
            </Stack>
          </div>
        </FloatingPortal>
      )}

      <div className={classNames(styles.dropzoneContainer)}>
        <div
          {...getRootProps({
            className: classNames(
              styles.dropzone,
              withBorder && styles.dropzoneBorder,
              isDragActive &&
                withFullScreenDropzone &&
                styles.dropzoneFullScreen,
              isDragActive && styles.dragActive,
              isDragging && styles.dropzoneDrag,
            ),
          })}
        >
          <input data-testid={TEST_IDS.input} {...getInputProps()} />
        </div>

        <div
          className={classNames(
            styles.dropzoneWidgetContainer,
            !innerComponent && styles.WithoutInner,
            dropzoneOptions?.disabled && styles.disabled,
          )}
          data-testid={testId}
          onDragOver={!noDrag ? handleDragEnter : undefined}
          style={styling}
        >
          {innerComponent ? (
            cloneElement(<>{innerComponent}</>, {
              isDragActive,
            })
          ) : (
            <DropzoneInner {...innerOptions} />
          )}
        </div>
      </div>
    </DropzoneContext.Provider>
  );
};

Dropzone.Widget = memo(DropzoneInner);
Dropzone.Instructions = memo(DropzoneInstructions);

export default Dropzone;
