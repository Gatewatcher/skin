import type { StackProps } from '@/skin/layout';
import { Stack } from '@/skin/layout';

export type ModalFooterProps = Omit<StackProps, 'as' | 'margin' | 'padding'>;

const Footer = ({
  children,
  'data-testid': testId = 'modal-footer',
  ...rest
}: ModalFooterProps) => {
  return (
    <Stack as="footer" data-testid={testId} margin={{ top: 9 }} {...rest}>
      {children}
    </Stack>
  );
};

export default Footer;
