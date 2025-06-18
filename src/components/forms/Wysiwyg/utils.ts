import { isEmpty } from '@gatewatcher/bistoury/utils-lang';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $setBlocksType } from '@lexical/selection';
import type { LexicalEditor } from 'lexical';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  createEditor,
} from 'lexical';

import { nodes, theme } from './constants/constants';

export const docToHtml = (doc?: object) => {
  if (!doc || isEmpty(doc)) return '';

  const editor = createEditor({ nodes, theme });

  const state = editor.parseEditorState(JSON.stringify(doc));

  let html = '';
  state.read(() => {
    html = $generateHtmlFromNodes(editor);
  });

  return html;
};

export const formatToParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, () => $createParagraphNode());
    }
  });
};
