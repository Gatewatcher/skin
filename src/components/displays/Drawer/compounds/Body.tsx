import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

export type DrawerBodyProps = StackProps;

const Body = ({
  children,
  'data-testid': testId = 'drawer-body',
  direction = 'column',
  ...rest
}: DrawerBodyProps) => {
  return (
    <Stack
      data-testid={testId}
      direction={direction}
      flexGrow={1}
      padding={{ bottom: 9 }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Body;
