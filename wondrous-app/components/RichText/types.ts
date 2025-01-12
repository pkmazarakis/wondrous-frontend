import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

import { MentionElement } from './features/mentions/types';

export type FormattedText = {
  type?: string;
  text: string;
  bold?: true;
  code?: true;
  italic?: true;
  underline?: true;
  strikethrough?: true;
  children?: undefined;
};
export type MarkType = 'bold' | 'italic' | 'code' | 'underline' | 'strikethrough';
export type CustomText = FormattedText;

export type ParagraphElement = {
  type: 'paragraph';
  children: (CustomText | CustomMentionElement)[];
  text?: undefined;
};

export type LinkElement = {
  type: 'link';
  href: string;
  children: CustomText[];
  text?: undefined;
};

export type NumberedListElement = {
  type: 'numbered-list';
  align?: string;
  children: Descendant[];
  text?: undefined;
};

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: Descendant[];
  text?: undefined;
};

export type TogglabaleBlock = LinkElement | NumberedListElement | BulletedListElement;
export type ListItemElement = { type: 'list-item'; children: Descendant[]; text?: undefined };
export type CustomMentionElement = MentionElement<CustomText[]>;

export type CustomElement =
  | ParagraphElement
  | CustomMentionElement
  | LinkElement
  | NumberedListElement
  | BulletedListElement
  | ListItemElement;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
