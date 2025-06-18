import { Fragment, useId } from 'react';

import { FloatingActions, LinkExternal, isExternalLink } from '@/skin/actions';
import { InternalTreeNode } from '@/skin/displays/tree/Tree/compounds/TreeNode';
import { Stack } from '@/skin/layout';
import { NeutralText, Text } from '@/skin/typography';
import { InternalText } from '@/skin/typography/Text';

import { calcOffset } from '../utils';
import Draggable from './Draggable';
import FoldIndicator from './FoldIndicator';

import styles from '../styles.module.scss';

type JsonViewerLeafProps = {
  arrayLength?: number;
  depth: number;
  label: string;
  path: string;
  value: string | number | boolean | null;
  withJmesPathDragging?: boolean;
};

const Leaf = ({
  arrayLength,
  depth,
  label,
  path,
  value,
  withJmesPathDragging,
}: JsonViewerLeafProps) => {
  const id = useId();
  const isLink = value && isExternalLink(value.toString());

  return (
    <InternalTreeNode
      render={props => (
        <Stack
          alignItems="flex-start"
          className={styles.leaf}
          data-testid="json-viewer-leaf"
          gap={3}
          margin={{ bottom: 3 }}
          style={{ marginLeft: calcOffset(depth) }}
        >
          <FoldIndicator {...props} />
          <Draggable data={`{{ ${path} }}`} disabled={!withJmesPathDragging}>
            <InternalText
              style={{
                ...(arrayLength && {
                  width: `${
                    Math.floor(arrayLength.toString().split('').length) + 1
                  }ch`,
                }),
              }}
              weight="medium"
            >
              {`${label}:`}
            </InternalText>
          </Draggable>
          <FloatingActions
            content={
              <FloatingActions.Content>
                <FloatingActions.Actions>
                  <FloatingActions.CopyToClipboard
                    clipText={(value ?? '').toString()}
                  />
                </FloatingActions.Actions>
              </FloatingActions.Content>
            }
            isDisabled={value === null}
            placement="top-start"
          >
            <>
              {isLink ? (
                <LinkExternal to={value.toString()} withIcon>
                  <Text wordBreak="break-word" currentColor>
                    {value}
                  </Text>
                </LinkExternal>
              ) : value === null ? (
                <NeutralText variant={400}>null</NeutralText>
              ) : (
                <Text wordBreak="break-word" currentColor>
                  {(value ?? '').toString()}
                </Text>
              )}
            </>
          </FloatingActions>
        </Stack>
      )}
      element={<Fragment />}
      id={id}
    />
  );
};

export default Leaf;
