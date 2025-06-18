import { $isCodeNode, CODE_LANGUAGE_MAP } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent } from '@lexical/utils';
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot } from 'lexical';
import { useEffect, useState } from 'react';

export const useCodeBlock = () => {
  const [editor] = useLexicalComposerContext();

  const [isCodeBlock, setIsCodeBlock] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');

  useEffect(() => {
    const listener = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          let element =
            anchorNode.getKey() === 'root'
              ? anchorNode
              : $findMatchingParent(anchorNode, e => {
                  const parent = e.getParent();
                  return parent !== null && $isRootOrShadowRoot(parent);
                });

          if (element === null) {
            element = anchorNode.getTopLevelElementOrThrow();
          }

          const type = element.getType();
          setIsCodeBlock(type === 'code');

          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : '',
            );
          }
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(listener);
    });
  }, [editor]);

  return { codeLanguage, isCodeBlock };
};
