import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { isString } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import type { To } from 'react-router-dom';
import { Link, NavLink, createPath } from 'react-router-dom';

import type { IconName } from '@/skin/displays';
import { TextIcon } from '@/skin/displays';

import { DEFAULT_SIZE, DEFAULT_VARIANT } from './constants';
import type {
  LinkAs,
  LinkSize,
  LinkVariantBared,
  LinkVariantBase,
} from './types';

import styles from './styles.module.scss';

export type LinkBaseVariantConditionalProps =
  | {
      variant?: LinkVariantBase;
      className?: never;
    }
  | {
      variant?: LinkVariantBared;
      className?: string;
    };

export type LinkBaseProps = DataTestId &
  LinkBaseVariantConditionalProps & {
    activeClassName?: string;
    children: ReactNode;
    className?: string;
    download?: boolean;
    endIcon?: IconName;
    inline?: boolean;
    isAlwaysUnderlined?: boolean;
    italic?: boolean;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    size?: LinkSize;
    startIcon?: IconName;
    target?: HTMLAttributeAnchorTarget;
    to: To;
  };

export type LinkBaseInternalProps = {
  as: LinkAs;
};

type LinkContentProps = Pick<
  LinkBaseProps,
  'children' | 'endIcon' | 'startIcon' | 'inline'
>;

const LinkContent = ({
  children,
  endIcon,
  inline = false,
  startIcon,
}: LinkContentProps) => {
  return endIcon || startIcon ? (
    <TextIcon
      endIcon={endIcon as IconName}
      endIconClassName={inline ? styles.alignBottom : undefined}
      startIcon={startIcon as IconName}
      startIconClassName={inline ? styles.alignBottom : undefined}
      asFragment
      currentColor
    >
      {children}
    </TextIcon>
  ) : (
    <>{children}</>
  );
};

const LinkBase = forwardRef<
  HTMLAnchorElement,
  LinkBaseProps & LinkBaseInternalProps
>(
  (
    {
      as,
      activeClassName,
      children,
      className: classNameProps,
      'data-testid': testId = 'link-base',
      isAlwaysUnderlined,
      inline = false,
      italic,
      to,
      size = DEFAULT_SIZE,
      startIcon,
      variant = DEFAULT_VARIANT,
      endIcon,
      ...rest
    },
    ref,
  ) => {
    const className = classNames(
      stylesToCamelCase(styles, 'variant', variant),
      variant === 'bared'
        ? classNameProps
        : [
            styles.LinkBase,
            italic && styles.italic,
            stylesToCamelCase(styles, 'size', size),
            isAlwaysUnderlined && styles.underlined,
          ],
      inline && styles.inline,
    );

    const linkContent = (
      <LinkContent endIcon={endIcon} inline={inline} startIcon={startIcon}>
        {children}
      </LinkContent>
    );

    if (as === 'a') {
      return (
        <a
          ref={ref}
          className={className}
          data-testid={testId}
          href={isString(to) ? to : createPath(to)}
          rel="noopener noreferrer"
          {...rest}
        >
          {linkContent}
        </a>
      );
    }
    if (as === 'navlink') {
      return (
        <NavLink
          ref={ref}
          className={({ isActive }) =>
            classNames(className, isActive && activeClassName)
          }
          data-testid={suffixTestId(testId, 'nav')}
          to={to}
          {...rest}
        >
          {linkContent}
        </NavLink>
      );
    } else {
      return (
        <Link
          ref={ref}
          className={className}
          data-testid={testId}
          to={to}
          {...rest}
        >
          {linkContent}
        </Link>
      );
    }
  },
);

export default LinkBase;
