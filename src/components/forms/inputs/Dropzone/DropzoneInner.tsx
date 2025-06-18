import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { formatBytes } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import type { DropzoneOptions } from 'react-dropzone';

import { Button } from '@/skin/actions';
import type { IconName } from '@/skin/displays';
import { Icon, Tooltip } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import { buildTestIds } from '@/utils/testIds';

import {
  DRAG_FILES_DEFAULT_LABEL,
  SUFFIX_TEST_IDS,
  TEST_ID,
} from './constants';
import { useDropzone } from './contexts';

import styles from './styles.module.scss';

export type DropzoneInnerProps = DataTestId & {
  buttonLabel?: string;
  endElement?: ReactNode;
  icon?: IconName;
  label?: string;
  startElement?: ReactNode;
};
const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

type SupportedFilesProps = {
  accept: DropzoneOptions['accept'];
};

type DropzoneInstructionsProps = {
  label?: string;
  triggerOnClick?: boolean;
  startElement?: ReactNode;
  endElement?: ReactNode;
};

const SupportedFiles = ({ accept }: SupportedFilesProps) => {
  if (accept) {
    let allFiles: string[] = [];
    for (const key in accept) {
      const files = accept[key];
      allFiles = allFiles.concat(files);
    }

    return (
      <Stack>
        <Text>
          File types: {allFiles.slice(0, 4).join(', ')}
          {allFiles.length <= 4 && '.'}
        </Text>
        {allFiles.length > 4 && (
          <>
            &nbsp;
            <Tooltip content={allFiles.slice(4).join(', ')}>
              <Text type="info" underline>
                and more.
              </Text>
            </Tooltip>
          </>
        )}
      </Stack>
    );
  }
};

export const DropzoneInstructions = ({
  label = DRAG_FILES_DEFAULT_LABEL,
  triggerOnClick = true,
  startElement,
  endElement,
}: DropzoneInstructionsProps) => {
  const { accept, maxSize, open } = useDropzone();

  return (
    <Stack
      alignItems="center"
      direction="column"
      gap={2}
      justifyContent="center"
      margin={{ top: 4 }}
      onClick={triggerOnClick ? open : undefined}
    >
      {startElement}
      <Text>{label}</Text>
      <Stack
        alignItems={{ sm: 'center' }}
        direction={{ sm: 'column', md: 'row' }}
        gap={{ x: 2 }}
      >
        {accept && <SupportedFiles accept={accept} />}
        {maxSize && <Text>Max size: {formatBytes(maxSize)}</Text>}
      </Stack>
      {endElement}
    </Stack>
  );
};

const DropzoneInner = ({
  buttonLabel = 'Click to upload',
  'data-testid': testId = TEST_IDS.inner,
  endElement,
  icon = 'CloudExport',
  label = DRAG_FILES_DEFAULT_LABEL,
  startElement,
}: DropzoneInnerProps) => {
  const { open } = useDropzone();

  return (
    <Stack
      alignItems="center"
      className={classNames(styles.dropzoneInnerWidget)}
      data-testid={testId}
      direction="column"
      justifyContent="center"
      onClick={open}
    >
      {startElement && (
        <Stack.Item margin={{ bottom: 4, top: 7 }}>{startElement}</Stack.Item>
      )}
      <Icon name={icon} size="xLarge" />
      <DropzoneInstructions label={label} />
      <Button variant="ghosted">{buttonLabel}</Button>
      {endElement && (
        <Stack.Item margin={{ top: 4, bottom: 7 }}>{endElement}</Stack.Item>
      )}
    </Stack>
  );
};

export default DropzoneInner;
