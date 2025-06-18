import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { InitialConfigType } from '@lexical/react/LexicalComposer';

import linkStyles from '@/skin/actions/links/LinkBase/styles.module.scss';
import codeStyles from '@/skin/displays/Code/styles.module.scss';
import dividerStyles from '@/skin/displays/Divider/styles.module.scss';
import paragraphStyles from '@/skin/typography/Paragraph/styles.module.scss';
import textStyles from '@/skin/typography/Text/styles.module.scss';
import headingStyles from '@/skin/typography/Title/styles.module.scss';

import listStyles from '../components/commands/lists/styles.module.scss';
import codeBlockStyles from '../components/commands/nodes/BlockCodeCommand/styles.module.scss';
import quoteStyles from '../components/commands/nodes/QuoteCommand/styles.module.scss';

export const theme: InitialConfigType['theme'] = {
  paragraph: classNames(paragraphStyles.Paragraph, paragraphStyles.Wysiwyg),
  link: linkStyles.LinkBase,
  text: {
    bold: textStyles.strong,
    italic: textStyles.italic,
    underline: textStyles.underline,
    strikethrough: textStyles.strikethrough,
    underlineStrikethrough: textStyles.underlineStrikethrough,
    code: codeStyles.Code,
  },
  quote: quoteStyles.quote,
  code: codeBlockStyles.code,
  codeHighlight: {
    atrule: codeBlockStyles.tokenAttr,
    attr: codeBlockStyles.tokenAttr,
    boolean: codeBlockStyles.tokenProperty,
    builtin: codeBlockStyles.tokenSelector,
    cdata: codeBlockStyles.tokenComment,
    char: codeBlockStyles.tokenSelector,
    class: codeBlockStyles.tokenFunction,
    'class-name': codeBlockStyles.tokenFunction,
    comment: codeBlockStyles.tokenComment,
    constant: codeBlockStyles.tokenProperty,
    deleted: codeBlockStyles.tokenProperty,
    doctype: codeBlockStyles.tokenComment,
    entity: codeBlockStyles.tokenOperator,
    function: codeBlockStyles.tokenFunction,
    important: codeBlockStyles.tokenVariable,
    inserted: codeBlockStyles.tokenSelector,
    keyword: codeBlockStyles.tokenAttr,
    namespace: codeBlockStyles.tokenVariable,
    number: codeBlockStyles.tokenProperty,
    operator: codeBlockStyles.tokenOperator,
    prolog: codeBlockStyles.tokenComment,
    property: codeBlockStyles.tokenProperty,
    punctuation: codeBlockStyles.tokenPunctuation,
    regex: codeBlockStyles.tokenVariable,
    selector: codeBlockStyles.tokenSelector,
    string: codeBlockStyles.tokenSelector,
    symbol: codeBlockStyles.tokenProperty,
    tag: codeBlockStyles.tokenProperty,
    url: codeBlockStyles.tokenOperator,
    variable: codeBlockStyles.tokenVariable,
  },
  hr: dividerStyles.Wysiwyg,
  heading: {
    h1: classNames(headingStyles.Title, headingStyles.h1),
    h2: classNames(headingStyles.Title, headingStyles.h2),
    h3: classNames(headingStyles.Title, headingStyles.h3),
    h4: classNames(headingStyles.Title, headingStyles.h4),
    h5: classNames(headingStyles.Title, headingStyles.h5),
  },
  list: {
    ul: listStyles.ul,
    listitem: listStyles.listItem,
    nested: {
      listitem: listStyles.nestedListItem,
    },
    ol: listStyles.ol,
    olDepth: [
      listStyles.ol,
      listStyles.ol2,
      listStyles.ol3,
      listStyles.ol4,
      listStyles.ol5,
    ],
  },
};
