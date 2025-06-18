import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import type { MarkdownProps } from '@/skin/displays';
import { Paragraph, Text } from '@/skin/typography';

import { InternalMarkdown } from '../Markdown';

import styles from './styles.module.scss';

export type CodeProps = DataTestId &
  Pick<MarkdownProps, 'children'> & {
    inline?: boolean;
    language?: string;
  };

const Code = ({
  children,
  'data-testid': testId = 'code',
  inline,
  language = '',
}: CodeProps) => {
  const markdown = inline
    ? `\`${children}\``
    : `\`\`\`${language}\n${children}\n\`\`\``;

  const Wrapper = inline ? Text : Paragraph;

  return (
    <InternalMarkdown
      components={{
        code: ({ children, className }) => (
          <code
            className={classNames(
              styles.Code,
              className,
              !inline && styles.block,
            )}
            data-testid={testId}
          >
            {children}
          </code>
        ),
        p: ({ children }) => <Wrapper>{children}</Wrapper>,
        pre: ({ children }) => <Wrapper>{children}</Wrapper>,
      }}
    >
      {markdown}
    </InternalMarkdown>
  );
};

export default Code;
