import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { memo, useRef } from 'react';

import type { PopoverProps } from '../../displays/floating/Popover';
import Popover from '../../displays/floating/Popover';
import Actions from './compounds/Actions';
import Button from './compounds/Button';
import Content from './compounds/Content';
import Header from './compounds/Header';
import Link from './compounds/Link';
import FloatingActionsCopyToClipboard from './compounds/actions/CopyToClipboard';
import type { FloatingActionsContextType } from './context';
import { FloatingActionsContext } from './context';

import styles from './styles.module.scss';

export type FloatingActionsProps = DataTestId &
  Pick<
    PopoverProps,
    | 'content'
    | 'placement'
    | 'triggerClassName'
    | 'triggerOn'
    | 'withStopPropagation'
    | 'withMinWidthTrigger'
    | 'isDisabled'
  > & {
    children: ReactNode;
    fitParent?: boolean;
    inheritWidth?: boolean;
  };

const FloatingActions = ({
  children,
  content,
  'data-testid': testId = 'floating-actions',
  fitParent = false,
  inheritWidth = true,
  triggerClassName,
  ...rest
}: FloatingActionsProps) => {
  const onlyOneAction = useRef(false);

  const contextValue: FloatingActionsContextType = {
    onlyOneAction,
  };

  return (
    <FloatingActionsContext.Provider value={contextValue}>
      <Popover
        triggerClassName={classNames(
          styles.FloatingActions,
          fitParent && styles.FitParent,
          inheritWidth && styles.Inherit,
          triggerClassName,
        )}
        content={content}
        data-testid={testId}
        elevation={2}
        offset={6}
        padding={4}
        placement="top"
        withArrow={false}
        {...rest}
      >
        <>{children}</>
      </Popover>
    </FloatingActionsContext.Provider>
  );
};

FloatingActions.Button = memo(Button);
FloatingActions.Content = memo(Content);
FloatingActions.CopyToClipboard = memo(FloatingActionsCopyToClipboard);
FloatingActions.Actions = memo(Actions);
FloatingActions.Link = memo(Link);
FloatingActions.Header = memo(Header);

export default FloatingActions;
