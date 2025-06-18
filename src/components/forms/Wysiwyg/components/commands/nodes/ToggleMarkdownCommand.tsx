import { $createCodeNode, $isCodeNode } from '@lexical/code';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot } from 'lexical';

import { CommandButton } from '../../CommandButton';
import { MARKDOWN_TRANSFORMERS } from './BlockCodeCommand/MarkdownTransformers';

export const ToggleMarkdownCommand = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();

      if ($isCodeNode(firstChild) && firstChild.getLanguage() == 'markdown') {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          MARKDOWN_TRANSFORMERS,
          undefined,
          true,
        );
      } else {
        const markdown = $convertToMarkdownString(
          MARKDOWN_TRANSFORMERS,
          undefined,
          true,
        );
        root
          .clear()
          .append(
            $createCodeNode('markdown').append($createTextNode(markdown)),
          );
      }
    });
  };

  return <CommandButton name="Switch" onClick={handleClick} />;
};
