import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { ReactNode } from 'react';

import type { DropdownProps } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';
import DropdownButton from '@/skin/displays/floating/Dropdown/compounds/Button';
import DropdownContent from '@/skin/displays/floating/Dropdown/compounds/Content';
import DropdownGroup from '@/skin/displays/floating/Dropdown/compounds/Group';
import DropdownLink from '@/skin/displays/floating/Dropdown/compounds/Link';

import type { ButtonProps } from '../Button';
import Button from '../Button';

export type ButtonActionsProps = ButtonProps &
  Pick<DropdownProps, 'onClose' | 'onOpen'> & {
    actions: ReactNode;
  };

const ButtonActions = ({
  actions,
  children,
  endIcon = 'ChevronDown',
  'data-testid': testId = 'button-actions',
  disabled,
  onClose,
  onOpen,
  ...props
}: ButtonActionsProps) => {
  return (
    <Dropdown
      content={actions}
      data-testid={testId}
      isDisabled={disabled}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom-end"
      strategy="fixed"
      triggerOn={['click', 'focus']}
    >
      {isString(children) ? (
        <Button disabled={disabled} endIcon={endIcon} {...props}>
          {children}
        </Button>
      ) : (
        <>{children}</>
      )}
    </Dropdown>
  );
};

ButtonActions.Button = DropdownButton;
ButtonActions.Actions = DropdownContent;
ButtonActions.Group = DropdownGroup;
ButtonActions.Link = DropdownLink;

export default ButtonActions;
