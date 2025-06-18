import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

export type BodyProps = StackProps;

const Body = ({
  children,
  'data-testid': testId = 'timeline-body',
  ...rest
}: BodyProps) => {
  return (
    <Stack data-testid={testId} {...rest}>
      {children}
    </Stack>
  );
};

export default Body;
