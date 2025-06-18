import { useOverflowObserver, useTimeout } from '@gatewatcher/bistoury/hooks';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { UseCopyToClipboardParams } from 'hooks';
import { useCopyToClipboardWithFeedback } from 'hooks';
import type { ReactNode } from 'react';
import { memo, useRef, useState } from 'react';

import { ICON_DEFAULT_SIZE } from '@/constants';
import type { TooltipProps } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import type { IconSize } from '@/types';
import { isClipboardAvailable } from '@/utils';

import { AnimatedCopyIcon } from './AnimatedCopyIcon';
import {
  DEFAULT_GROW,
  DEFAULT_LEAVE_TRANSITION_DELAY,
  DEFAULT_SUCCESS_DURATION,
  DEFAULT_TEST_ID,
  DEFAULT_TRANSITION_DURATION,
} from './constants';
import type { CopyToClipboardGrow } from './types';

import styles from './styles.module.scss';

export type CopyToClipboardProps = DataTestId &
  UseCopyToClipboardParams & {
    alwaysVisible?: boolean;
    delayLeaveTransition?: number;
    label?: ReactNode;
    grow?: CopyToClipboardGrow;
    iconSize?: IconSize;
    tooltip?: string;
    tooltipPosition?: TooltipProps['placement'];
    tooltipSuccess?: string;
    tooltipSuccessDuration?: number;
    transitionSpeed?: number;
  };

const CopyToClipboard = ({
  alwaysVisible,
  clipText,
  'data-testid': testId = DEFAULT_TEST_ID,
  delayLeaveTransition = DEFAULT_LEAVE_TRANSITION_DELAY,
  errorToastTitle,
  label,
  grow = DEFAULT_GROW,
  onError,
  onSuccess,
  iconSize = ICON_DEFAULT_SIZE,
  successDuration = DEFAULT_SUCCESS_DURATION,
  tooltip,
  tooltipSuccess,
  transitionSpeed = DEFAULT_TRANSITION_DURATION,
}: CopyToClipboardProps) => {
  const { copyToClipboard, isSuccess, setIsSuccess } =
    useCopyToClipboardWithFeedback({
      clipText,
      errorToastTitle,
      onError,
      onSuccess,
      successDuration,
    });
  const displayTextRef = useRef(null);
  const textIsTruncated = useOverflowObserver(displayTextRef);
  const animateProperty = grow === 'outside' ? 'width' : 'flexBasis';
  const [isHovered, setIsHovered] = useState(false);
  const [setLeaveTimeout, clearLeaveTimeout] = useTimeout();

  const showButton = () => {
    clearLeaveTimeout();
    setIsHovered(true);
  };

  const hideButton = () => {
    setLeaveTimeout(() => {
      setIsHovered(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, transitionSpeed);
    }, delayLeaveTransition);
  };

  return (
    <Stack
      alignItems="center"
      className={styles.copyLink}
      data-testid={testId}
      onMouseEnter={showButton}
      onMouseLeave={hideButton}
    >
      <span
        ref={displayTextRef}
        className={classNames(
          styles.label,
          isHovered && isClipboardAvailable() && styles.hover,
        )}
        data-testid={suffixTestId(testId, 'label')}
      >
        {label}
      </span>
      {isClipboardAvailable() && (
        <AnimatedCopyIcon
          alwaysVisible={alwaysVisible}
          clipTextPreview={clipText}
          data-testid={suffixTestId(testId, 'button')}
          displayClipTextPreview={textIsTruncated}
          isSuccess={isSuccess}
          onClick={copyToClipboard}
          property={animateProperty}
          show={isHovered}
          size={iconSize}
          tooltip={isSuccess ? tooltipSuccess || tooltip : tooltip}
          transitionSpeed={transitionSpeed}
        />
      )}
    </Stack>
  );
};

export default memo(CopyToClipboard);
