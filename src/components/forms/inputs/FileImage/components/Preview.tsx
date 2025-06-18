import { formatBytes } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import { type DataTestId } from '@gatewatcher/bistoury/utils-types';

import { InternalButtonFloat } from '@/skin/actions/buttons/ButtonFloat';
import { Icon, Popover } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { RATIO_SIZES } from '../constants';
import type { FileImageRatio, FileImageSize } from '../types';
import { getBorderRadius } from '../utils';

import styles from '../styles.module.scss';

export type PreviewProps = DataTestId & {
  file?: File;
  name?: string;
  onDelete: () => void;
  ratio: FileImageRatio;
  size: FileImageSize;
  url?: string;
};

const Preview = ({
  'data-testid': testId = 'input-file-image-preview',
  file,
  name,
  onDelete,
  ratio,
  size,
  url,
}: PreviewProps) => {
  const { width, height } = RATIO_SIZES[ratio][size];
  const hasFile = !!file || !!url;

  const fileName = file?.name || name;
  const fileUrl = file ? URL.createObjectURL(file) : url;

  return (
    <div className={styles.PreviewWrapper} style={{ width, height }}>
      <Stack
        alignItems="center"
        className={styles.PreviewContainer}
        data-testid={testId}
        justifyContent="center"
        style={{ width, height, borderRadius: getBorderRadius(size) }}
      >
        {!hasFile ? (
          <Icon color="grey" name="Image" size="xLarge" />
        ) : (
          <Popover
            content={
              <Stack direction="column">
                <Text>{fileName}</Text>
                {file && <Text color="grey">{formatBytes(file.size)}</Text>}
              </Stack>
            }
            data-testid={suffixTestId(testId, 'image')}
            isDisabled={!fileName}
            padding={4}
            placement="right-end"
            triggerClassName={styles.trigger}
          >
            <img src={fileUrl} />
          </Popover>
        )}
      </Stack>

      {hasFile && (
        <InternalButtonFloat
          className={styles.removeButton}
          icon="Close"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default Preview;
