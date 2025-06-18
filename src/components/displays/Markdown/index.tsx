import { Highlight, themes } from 'prism-react-renderer';
import type { ComponentProps } from 'react';
import type { Options } from 'react-markdown';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { CopyToClipboard, Link } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { useThemeContext } from '@/skin/navigation/Theme';
import { Paragraph, Text, Title } from '@/skin/typography';

import Divider from '../Divider';
import { Prism } from './Prism';

import styles from './styles.module.scss';

export type InternalMarkdownProps = {
  components?: Options['components'];
};

export type MarkdownProps = {
  children: string;
};

export const InternalMarkdown = ({
  children,
  components,
}: MarkdownProps & InternalMarkdownProps) => {
  const { theme } = useThemeContext();

  return (
    <ReactMarkdown
      components={{
        h1({ children }: ComponentProps<'h1'>) {
          return <Title as="h1">{children}</Title>;
        },
        h2({ children }: ComponentProps<'h2'>) {
          return <Title as="h2">{children}</Title>;
        },
        h3({ children }: ComponentProps<'h3'>) {
          return <Title as="h3">{children}</Title>;
        },
        h4({ children }: ComponentProps<'h4'>) {
          return <Title as="h4">{children}</Title>;
        },
        h5({ children }: ComponentProps<'h5'>) {
          return <Title as="h5">{children}</Title>;
        },
        a({ href, children }: ComponentProps<'a'>) {
          return (
            <Link to={href || ''} isExternal isInline>
              {children}
            </Link>
          );
        },
        p({ children }: ComponentProps<'p'>) {
          return <Paragraph>{children}</Paragraph>;
        },
        hr() {
          return <Divider direction="horizontal" />;
        },
        table({ children }: ComponentProps<'table'>) {
          return <table className={styles.table}>{children}</table>;
        },
        thead({ children }: ComponentProps<'thead'>) {
          return <thead className={styles.tableHead}>{children}</thead>;
        },
        tbody({ children }: ComponentProps<'tbody'>) {
          return <tbody className={styles.tableBody}>{children}</tbody>;
        },
        tr({ children }: ComponentProps<'tr'>) {
          return <tr className={styles.tableRow}>{children}</tr>;
        },
        th({ children }: ComponentProps<'th'>) {
          return <th className={styles.tableHeader}>{children}</th>;
        },
        td({ children }: ComponentProps<'td'>) {
          return <td className={styles.tableCell}>{children}</td>;
        },
        code({ className, children, node }) {
          const match = /language-(\w+)/.exec(className || '');
          const isMultiline =
            node?.position &&
            node.position.end.line - node.position.start.line >= 1;

          if (isMultiline) {
            return (
              <Highlight
                code={String(children).trim()}
                language={match?.[1] ?? ''}
                prism={Prism}
                theme={theme === 'light' ? themes.vsLight : themes.vsDark}
              >
                {({ style, tokens, getTokenProps, getLineProps }) => {
                  return (
                    <div className={styles.CodeBlock} style={style}>
                      <Stack
                        alignItems="center"
                        className={styles.CodeBlockHead}
                        justifyContent="space-between"
                        padding={{ bottom: 2 }}
                      >
                        <Text currentColor>{match?.[1] ?? ''}</Text>
                        <CopyToClipboard
                          clipText={String(children).trim()}
                          alwaysVisible
                        />
                      </Stack>
                      <div className={styles.CodeBlockInner}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              </Highlight>
            );
          } else {
            return <code className={styles.InlineCode}>{children}</code>;
          }
        },
        ...components,
      }}
      urlTransform={(url, key, node) => {
        if (
          key === 'src' &&
          node.tagName === 'img' &&
          url.startsWith('data:image')
        ) {
          return url;
        }

        return defaultUrlTransform(url);
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};

const Markdown = (props: MarkdownProps) => <InternalMarkdown {...props} />;

export default Markdown;
