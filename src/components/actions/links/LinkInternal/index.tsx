import { forwardRef } from 'react';

import type { LinkBaseProps } from '../LinkBase';
import LinkBase from '../LinkBase';
import type { LinkAs } from '../LinkBase/types';
import { DEFAULT_TARGET } from './constants';

export type LinkInternalProps = LinkBaseProps & {
  as?: Exclude<LinkAs, 'a'>;
  relative?: string;
  preventScrollReset?: boolean;
};

const LinkInternal = forwardRef<HTMLAnchorElement, LinkInternalProps>(
  (
    {
      as = 'link',
      children,
      'data-testid': testId = 'link-internal',
      target = DEFAULT_TARGET,
      ...rest
    },
    ref,
  ) => {
    return (
      <LinkBase
        ref={ref}
        data-testid={testId}
        target={target}
        {...rest}
        as={as}
      >
        {children}
      </LinkBase>
    );
  },
);

export default LinkInternal;
