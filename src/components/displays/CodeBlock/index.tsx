import { Highlight, themes } from 'prism-react-renderer';

import { CopyToClipboard } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { useThemeContext } from '@/skin/navigation';
import { Text } from '@/skin/typography';

import { Prism } from './Prism';

import styles from './styles.module.scss';

export type CodeBlockProps = {
  code: string;
  language: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const { theme } = useThemeContext();
  return (
    <Highlight
      code={code}
      language={language}
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
              <Text currentColor>{language}</Text>
              <CopyToClipboard clipText={code} alwaysVisible />
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
};

export default CodeBlock;
