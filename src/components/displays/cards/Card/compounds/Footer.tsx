import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

export type CardFooterProps = StackProps;

const Footer = ({
  children,
  'data-testid': testId = 'card-footer',
  ...rest
}: CardFooterProps) => {
  return (
    <Stack as="footer" data-testid={testId} padding={{ y: 7, x: 8 }} {...rest}>
      {children}
    </Stack>
  );
};

export default Footer;
