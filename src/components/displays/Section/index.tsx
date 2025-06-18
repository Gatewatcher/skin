import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, ReactNode } from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';

import Body from './compounds/Body';
import Button from './compounds/Button';
import ButtonIcon from './compounds/ButtonIcon';
import Header from './compounds/Header';
import Title from './compounds/Title';
import { DEFAULT_PADDING, DEFAULT_VARIANT } from './constants';
import type { SectionVariant } from './types';

import styles from './styles.module.scss';

export type SectionProps = DataTestId & {
  children: ReactNode;
  variant?: SectionVariant;
  padding?: Spacings['padding'];
};

type InternalSectionProps = Spacings & {
  className?: string;
  style?: CSSProperties;
};

const InternalSection = ({
  'data-testid': testId = 'section',
  children,
  className,
  margin,
  padding = DEFAULT_PADDING,
  style,
  variant = DEFAULT_VARIANT,
}: SectionProps & InternalSectionProps) => {
  return withSpacing(
    <section
      className={classNames(
        styles.Section,
        stylesToCamelCase(styles, 'variant', variant),
        className,
      )}
      data-testid={testId}
      style={style}
    >
      {children}
    </section>,
    { margin, padding },
  );
};

const Section = (props: SectionProps) => <InternalSection {...props} />;

Section.Body = Body;
Section.Button = Button;
Section.ButtonIcon = ButtonIcon;
Section.Header = Header;
Section.Title = Title;

export default Section;
