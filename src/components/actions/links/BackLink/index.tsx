import type { LinkInternalProps } from '../LinkInternal';
import LinkInternal from '../LinkInternal';

export type BackLinkProps = Omit<LinkInternalProps, 'direction'>;

const BackLink = ({
  children,
  'data-testid': testId = 'back-link',
  startIcon = 'ChevronLeft',
  ...props
}: BackLinkProps) => {
  return (
    <LinkInternal
      data-testid={testId}
      startIcon={startIcon}
      {...(props as Omit<BackLinkProps, 'variant'>)}
    >
      {children}
    </LinkInternal>
  );
};

export default BackLink;
