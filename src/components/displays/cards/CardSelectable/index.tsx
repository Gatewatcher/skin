import { classNames } from '@gatewatcher/bistoury/utils-dom';

import Card, { type CardProps } from '../Card';
import { InputCheckbox } from './compounds/InputCheckbox';
import { InputRadio } from './compounds/InputRadio';

import styles from './styles.module.scss';

export type CardSelectableProps = CardProps & {
  disabled?: boolean;
  selected?: boolean;
};

const CardSelectable = ({
  className,
  disabled,
  selected,
  ...rest
}: CardSelectableProps) => {
  return (
    <label>
      <Card
        className={classNames(
          className,
          styles.Card,
          selected && styles.selected,
          disabled && styles.disabled,
        )}
        {...rest}
      />
    </label>
  );
};

CardSelectable.Body = Card.Body;
CardSelectable.Button = Card.Button;
CardSelectable.ButtonActions = Card.ButtonActions;
CardSelectable.ButtonIcon = Card.ButtonIcon;
CardSelectable.Footer = Card.Footer;
CardSelectable.Header = Card.Header;
CardSelectable.Title = Card.Title;
CardSelectable.DropdownActionsContent = Card.DropdownActionsContent;
CardSelectable.DropdownActionsGroup = Card.DropdownActionsGroup;
CardSelectable.DropdownActionsButton = Card.DropdownActionsButton;
CardSelectable.DropdownActionsLink = Card.DropdownActionsLink;
CardSelectable.InputRadio = InputRadio;
CardSelectable.InputCheckbox = InputCheckbox;

export default CardSelectable;
