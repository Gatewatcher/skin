import { TextIcon } from '@/skin/displays';
import { Stack } from '@/skin/layout';

export type StatusResumeProps = {
  errorCount: number;
  successCount: number;
};

const StatusResume = ({ errorCount, successCount }: StatusResumeProps) => {
  if (!errorCount && !successCount) return null;

  return (
    <Stack gap={4} padding={{ x: 4, y: 2 }}>
      {!!successCount && (
        <TextIcon
          size="extra-small"
          startIcon="CircleFilledCheck"
          type="success"
        >
          {successCount}
        </TextIcon>
      )}
      {!!errorCount && (
        <TextIcon
          size="extra-small"
          startIcon="CircleFilledWarning"
          type="error"
        >
          {errorCount}
        </TextIcon>
      )}
    </Stack>
  );
};

export default StatusResume;
