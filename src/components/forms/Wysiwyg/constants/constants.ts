import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import type { LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin';
import type { InitialConfigType } from '@lexical/react/LexicalComposer';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LineBreakNode, ParagraphNode, TabNode } from 'lexical';

import { ImageNode } from '../components/nodes/ImageNode';

export { theme } from './theme';

export const AUTO_LINK_MATCHER: LinkMatcher = (text: string) => {
  const URL_MATCHER =
    /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const match = URL_MATCHER.exec(text);
  if (match === null) {
    return null;
  }
  const fullMatch = match[0];
  return {
    index: match.index,
    length: fullMatch.length,
    text: fullMatch,
    url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`,
    rel: 'noreferrer',
    target: '_blank',
  };
};

export const nodes: InitialConfigType['nodes'] = [
  AutoLinkNode,
  CodeNode,
  CodeHighlightNode,
  HeadingNode,
  HorizontalRuleNode,
  ImageNode,
  LineBreakNode,
  LinkNode,
  ListItemNode,
  ListNode,
  MarkNode,
  ParagraphNode,
  QuoteNode,
  TabNode,
];
