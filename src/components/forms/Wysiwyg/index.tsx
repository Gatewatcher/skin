import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import '@lexical/react/LexicalCheckListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import type { InitialConfigType } from '@lexical/react/LexicalComposer';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import type { EditorState, LexicalEditor } from 'lexical';

import CodeHighlightPlugin from './components/plugins/CodeHighlightPlugin';
import DragDropPasteImagePlugin from './components/plugins/DragDropPasteImagePlugin';
import ImagePlugin from './components/plugins/ImagePlugin';
import ListMaxIndentLevelPlugin from './components/plugins/ListMaxIndentLevelPlugin';
import { ToolbarPlugin } from './components/toolbars/ToolbarPlugin';
import { Render } from './compounds/Render';
import { AUTO_LINK_MATCHER, nodes, theme } from './constants/constants';
import { validateUrl } from './utils/url';

import style from './styles.module.scss';

export type WysiwygProps = DataTestId & {
  defaultValue?: string;
  onChange?: (doc: object) => void;
  spellcheckLang?: string;
};

const Wysiwyg = ({
  'data-testid': testId = 'wysiwyg',
  defaultValue,
  onChange,
  spellcheckLang,
}: WysiwygProps) => {
  let editorState = undefined;

  const handleMarkdown = () => {
    if (!defaultValue) return;

    try {
      return (editor: LexicalEditor) => {
        editor.update(() => {
          $convertFromMarkdownString(defaultValue, TRANSFORMERS);
        });
      };
    } catch {
      console.warn('Unable to parse default value');
    }
  };

  try {
    if (defaultValue) {
      const content = JSON.parse(defaultValue);
      if (content.root) {
        editorState = defaultValue;
      } else {
        console.warn('Unable to parse default value');
      }
    }
  } catch {
    editorState = handleMarkdown();
  }

  const initialConfig: InitialConfigType = {
    editorState,
    namespace: 'wysiwyg',
    onError: console.error,
    theme,
    nodes,
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      onChange?.(json);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={style.container} data-testid={testId}>
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={style.input}
              lang={spellcheckLang}
              spellCheck={!spellcheckLang}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <OnChangePlugin onChange={handleChange} />
        <AutoFocusPlugin />
        <HistoryPlugin />
        <LinkPlugin validateUrl={validateUrl} />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={6} />
        <AutoLinkPlugin matchers={[AUTO_LINK_MATCHER]} />
        <TabIndentationPlugin />
        <ClickableLinkPlugin />
        <HorizontalRulePlugin />
        <ImagePlugin />
        <CodeHighlightPlugin />
        <DragDropPasteImagePlugin />
      </div>
    </LexicalComposer>
  );
};

Wysiwyg.Render = Render;

export default Wysiwyg;
