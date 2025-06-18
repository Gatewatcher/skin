import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey } from 'lexical';

import { Dropdown } from '@/skin/displays';

import { useCodeBlock } from '../../../hooks/useCodeBlock';
import { useElement } from '../../../hooks/useElement';
import { DropdownCommandButton } from '../../DropdownCommandButton';

const getCodeLanguageOptions = () => {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
};

export const SelectLanguageCommand = () => {
  const { codeLanguage } = useCodeBlock();
  const [editor] = useLexicalComposerContext();

  const LANG_OPTIONS = getCodeLanguageOptions();
  const { element } = useElement();

  const handleClick = (lang: string) => {
    editor.update(() => {
      if (element) {
        const node = $getNodeByKey(element.getKey());
        if ($isCodeNode(node)) {
          node.setLanguage(lang);
        }
      }
    });
  };

  return (
    <Dropdown
      content={
        <Dropdown.Content>
          {LANG_OPTIONS.map(([lang, name]) => (
            <Dropdown.Button key={lang} onClick={() => handleClick(lang)}>
              {name}
            </Dropdown.Button>
          ))}
        </Dropdown.Content>
      }
    >
      <DropdownCommandButton>
        {getLanguageFriendlyName(codeLanguage || 'js')}
      </DropdownCommandButton>
    </Dropdown>
  );
};
