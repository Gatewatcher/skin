import type { MDEditorProps } from '@uiw/react-md-editor';
import MDEditor from '@uiw/react-md-editor';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Markdown as MarkdownViewer } from '@/skin/displays';

import InputBaseLabel from '../InputBaseLabel';
import type { TextAreaProps } from '../TextArea';

import styles from './styles.module.scss';
import './styles.scss';

export type MarkdownProps = Omit<TextAreaProps, 'defaultValue' | 'value'> & {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  value?: string;
} & Pick<MDEditorProps, 'height' | 'maxHeight' | 'minHeight'>;

const Markdown = ({
  'data-testid': testId = 'input-markdown',
  defaultValue,
  onChange,
  onValueChange,
  ...rest
}: MarkdownProps) => {
  const [markdown, setMarkdown] = useState<string | undefined>(defaultValue);

  const handleChange = (
    value?: string,
    event?: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMarkdown(value);
    onChange?.(event as ChangeEvent<HTMLTextAreaElement>);
    onValueChange?.(value || '');
  };

  return (
    <InputBaseLabel
      data-testid={testId}
      defaultValue={defaultValue}
      onChange={onChange}
      value={markdown}
      {...rest}
    >
      {inputProps => (
        <MDEditor
          components={{
            preview: source => <MarkdownViewer>{source}</MarkdownViewer>,
          }}
          className={styles.Markdown}
          commands={[]}
          highlightEnable={false}
          onChange={handleChange}
          preview="edit"
          value={inputProps.value as string}
          hideToolbar
        />
      )}
    </InputBaseLabel>
  );
};

export default Markdown;
