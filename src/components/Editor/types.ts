import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type CustomElement = {
  type: 'paragraph' | 'heading-one' | 'heading-two' | 'block-quote' | 'audio' | 'video' | 'math' | 'image' | 'numbered-list' | 'bulleted-list' | 'list-item';
  children: CustomText[];
  url?: string;
  mathText?: string;
  align?: 'left' | 'center' | 'right';
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
};

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}