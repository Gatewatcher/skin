import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

import type { ElevationProps } from '@/hocs';
import type { Spacings } from '@/hocs';
import { withElevation, withSpacing } from '@/hocs';
import DropdownButton from '@/skin/displays/floating/Dropdown/compounds/Button';
import DropdownContent from '@/skin/displays/floating/Dropdown/compounds/Content';
import DropdownGroup from '@/skin/displays/floating/Dropdown/compounds/Group';
import DropdownLink from '@/skin/displays/floating/Dropdown/compounds/Link';
import { Stack } from '@/skin/layout';

import Body from './compounds/Body';
import Button from './compounds/Button';
import ButtonActions from './compounds/ButtonActions';
import ButtonIcon from './compounds/ButtonIcon';
import Footer from './compounds/Footer';
import Header from './compounds/Header';
import Title from './compounds/Title';

import styles from './styles.module.scss';

export type CardProps = DataTestId &
  Pick<Spacings, 'margin'> &
  ElevationProps & {
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler;
    style?: CSSProperties;
  };

const Card = ({
  'data-testid': testId = 'card',
  children,
  className,
  elevation,
  onClick,
  style,
  ...spacings
}: CardProps) => {
  return withSpacing(
    withElevation(
      <Stack
        className={classNames(styles.Card, className)}
        data-testid={testId}
        direction="column"
        onClick={onClick}
        style={style}
      >
        {children}
      </Stack>,
      elevation,
    ),
    spacings,
  );
};

Card.Body = Body;
Card.Button = Button;
Card.ButtonActions = ButtonActions;
Card.ButtonIcon = ButtonIcon;
Card.Footer = Footer;
Card.Header = Header;
Card.Title = Title;
Card.DropdownActionsContent = DropdownContent;
Card.DropdownActionsGroup = DropdownGroup;
Card.DropdownActionsButton = DropdownButton;
Card.DropdownActionsLink = DropdownLink;

export default Card;
