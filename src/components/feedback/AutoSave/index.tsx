import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';
import { Paragraph, Text } from '@/skin/typography';
import type { MessageType } from '@/types';

import { AutoSaveProvider } from './compounds';
import { DEFAULT_LABELS, ICONS, TEST_ID } from './constants';
import type { Labels, Status } from './types';

export type AutoSaveProps = DataTestId & {
  errorDetail?: string;
  labels?: Partial<Labels>;
  status: Status;
};

const AutoSave = ({
  'data-testid': testId = TEST_ID,
  errorDetail,
  labels: labelsProp,
  status,
}: AutoSaveProps) => {
  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const isError = status === 'error';
  const errorText = errorDetail || labels.error;
  const label = isError ? errorText : labels[status];
  const type: MessageType = isError ? 'danger' : 'info';

  if (status === 'idle') {
    return (
      <Text data-testid={testId} italic>
        {labels.idle}
      </Text>
    );
  }

  const getIcon = ICONS[status];

  return (
    <Stack data-testid={testId} direction="column" gap={8}>
      <Stack alignItems="center" as="span" gap={3}>
        {getIcon()}
        <Paragraph type={type} weight="medium">
          {label}
        </Paragraph>
      </Stack>
    </Stack>
  );
};

AutoSave.Provider = AutoSaveProvider;

export default AutoSave;
export { useAutoSave } from './compounds';
